const express = require('express');
const path = require('path');
const axios = require('axios');
const favicon = require('express-favicon');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const config = require('./config/config');

const app = express();

if (process.env.NODE_ENV === 'production') {
  app.use(morgan('combined'));
} else {
  app.use(morgan('dev'));
}

// EJS 템플릿 엔진 설정
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// 정적 파일 서빙 설정
app.use(express.static(path.join(__dirname, 'public')));
app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')))

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// http://myapp:3000/hostname
// {
//   "hostname": "e6f177d3477b",
//   "message": "Hello World!"
// }
app.get('/', (req, res) => {
  axios.get(`http://${config.myapp.host}:${config.myapp.port}/hostname`)
    .then(response => {
      const data = response.data;
      res.render('hostname', { 
        title: 'Basic Information',
        hostname: data,
      });
    })
    .catch(error => {
      console.error(error);
    });
});

// http://myapp:3001/poddetails
// return
// {
//   "Node": { 
//     "nodeName": "minikube", 
//     "nodeIP": "192.168.49.2" 
//   },
//   "Pod": {
//     "podNamespace": "default",
//     "podName": "node-myapp-deploy-55fd8bc956-b629r",
//     "podUid": "e0f530a2-a680-42ad-9da3-642d56b41eb6",
//     "podIP": "10.244.0.93",
//     "podServiceAccount": "read-pod-sa"
//   },
//   "Resource": {
//     "cpuRequest": "1",
//     "cpuLimit": "1",
//     "memoryRequest": "64000000",
//     "memoryLimit": "128000000"
//   }
// }
app.get('/poddetails', (req, res) => {
  axios.get(`http://${config.myapp.host}:${config.myapp.port}/poddetails`)
    .then(response => {
      const data = response.data;
      res.render('poddetails', { 
        title: 'Pod Detail Information', 
        podDetails: data,
      });
    })
    .catch(error => {
      console.error(error);
    });
});

// http://mydiary:3000/diary
app.get('/diary', (req, res) => {
  axios.get(`http://${config.mydiary.host}:${config.mydiary.port}/diary`)
    .then(response => {
      const data = response.data;
      res.render('diary', { 
        title: 'Diary', 
        entries: data 
      });
    })
    .catch(error => {
      console.error(error);
    });
});

// http://mydiary:3000/diary/:id
app.get('/diary/:id', (req, res) => {
  axios.get(`http://${config.mydiary.host}:${config.mydiary.port}/diary/${req.params.id}`)
    .then(response => {
      const data = response.data;
      res.render('diary_entry', { title: 'Diary Entry', entry: data });
    })
    .catch(error => {
      console.error(error);
    });
});

// http://mydiary:3000/diary/ (POST) headers: Content-Type: application/json, body: {title: '...', content: '...', weather: '...'}
app.post('/diary', (req, res) => {
  let data = {
    title: req.body.title,
    content: req.body.content,
    weather: req.body.weather
  };  

  axios.post(`http://${config.mydiary.host}:${config.mydiary.port}/diary`, data, {
    headers: { 'Content-Type': 'application/json' }
  })
  .then(function (response) {
    res.redirect('/diary');
  })
  .catch(function (error) {
    console.log(error);
    res.status(500).send(error);
  });
});

// http://mydiary:3000/diary/:id (DELETE)
app.delete('/diary/:id', (req, res) => {
  axios.delete(`http://${config.mydiary.host}:${config.mydiary.port}/diary/${req.params.id}`)
    .then(response => {
      res.send(response.data);
    })
    .catch(error => {
      console.error(error);
    });
});

// http://mydiary:3000/diary/:id (PUT) headers: Content-Type: application/json, body: {title: '...', content: '...', weather: '...'}
app.put('/diary/:id', (req, res) => {
  let data = {
    title: req.body.title,
    content: req.body.content,
    weather: req.body.weather
  };

  axios.put(`http://${config.mydiary.host}:${config.mydiary.port}/diary/${req.params.id}`, data, {
    headers: { 'Content-Type': 'application/json' }
  })
  .then(function (response) {
    res.send(response.data);
  })
  .catch(function (error) {
    console.log(error);
    res.status(500).send(error);
  });
});

// curl http://localhost:3001/healthcheck
// curl http://localhost:3001/healthcheck/maintenance
// curl http://localhost:3001/healthcheck/uptime
app.get('/healthcheck', (req, res) => {
  function formatTime(seconds) {
    const hours = Math.floor(seconds / 3600);
    seconds %= 3600;
    const minutes = Math.floor(seconds / 60);
    seconds = Math.floor(seconds % 60);
  
    return { hours, minutes, seconds };
  }

  axios.all([
    axios.get(`http://${config.myapp.host}:${config.myapp.port}/healthcheck`),
    axios.get(`http://${config.myapp.host}:${config.myapp.port}/healthcheck/maintenance`),
    axios.get(`http://${config.myapp.host}:${config.myapp.port}/healthcheck/uptime`)
  ])
  .then(axios.spread((healthcheckRes, maintenanceRes, uptimeRes) => {
    const formattedUptime = formatTime(uptimeRes.data);

    res.render('healthcheck', {
      title: 'HealthCheck',
      healthcheck: healthcheckRes.data,
      maintenance: maintenanceRes.data,
      hours: formattedUptime.hours,
      minutes: formattedUptime.minutes,
      seconds: formattedUptime.seconds
    });
  }))
  .catch(error => {
    console.log(error);
    res.status(500).send('Error occurred while fetching healthcheck data');
  });
});

// curl -X POST http://localhost:3001/healthcheck/maintenance/enable
// curl -X POST http://localhost:3001/healthcheck/maintenance/disable
app.post('/healthcheck/maintenance/:action', (req, res) => {
  const action = req.params.action;
  if (action === 'enable') {
    axios.post(`http://${config.myapp.host}:${config.myapp.port}/healthcheck/maintenance/enable`)
      .then(response => {
        res.send(response.data);
        console.log(response.data);
      })
      .catch(error => {
        console.error(error);
        res.status(500).send(error);
      });
  } else if (action === 'disable') {
    axios.post(`http://${config.myapp.host}:${config.myapp.port}/healthcheck/maintenance/disable`)
      .then(response => {
        res.send(response.data);
        console.log(response.data);
      })
      .catch(error => {
        console.error(error);
        res.status(500).send(error);
      });
  } else {
    res.status(400).send('Invalid action');
  }
});

app.get('/healthcheck/kill', (req, res) => {
  axios.get(`http://${config.myapp.host}:${config.myapp.port}/kill`)
    .then(response => {
      res.send(response.data);
    })
    .catch(error => {
      console.error('error');
      res.status(500).send(error);
    })
    .finally(() => {
      console.log('Completed the request to kill the server');
      res.status(200).send('Killed the server');
    });
});

// http://localhost:3001/load/cpu\?n\=45 : 7.5s
// http://localhost:3001/load/memory\?n\=70000 : 4.5s
app.get('/load/:type', async (req, res) => {
  try {
    const type = req.params.type;
    if (type === 'cpu') {
      const response = await axios.get(`http://${config.myapp.host}:${config.myapp.port}/load/cpu`, {
        params: {
          n: req.query.n
        }
      });
      res.status(200).send(response.data);
      console.log('Completed the request to load CPU');
    } else if (type === 'memory') {
      const response = await axios.get(`http://${config.myapp.host}:${config.myapp.port}/load/memory`, {
        params: {
          n: req.query.n
        }
      });
      res.status(200).send(response.data);
      console.log('Completed the request to load memory');
    } else {
      res.status(400).send('Invalid load type');
    }
  } catch (error) {
    console.error(error);
    res.status(500).send(error);
  }
});

app.listen(config.port, () => {
  console.log(`Server is running on http://localhost:${config.port}`);
});
