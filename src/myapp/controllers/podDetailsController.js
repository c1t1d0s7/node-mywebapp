const fs = require('fs');

// Downward API의 환경변수를 통해 Pod의 상세 정보를 가져오는 함수
function getPodDetailsEnv(req, res) {
  const podDetails = {
    "Node": {
      "nodeName": process.env.NODE_NAME,
      "nodeIP": process.env.NODE_IP,
    },
    "Pod": {
      "podNamespace": process.env.POD_NAMESPACE,
      "podName": process.env.POD_NAME,
      "podUid": process.env.POD_UID,
      "podIP": process.env.POD_IP,
      "podServiceAccount": process.env.POD_SERVICE_ACCOUNT_NAME,
    },
    "Resource": {
      "cpuRequest": process.env.CPU_REQUEST,
      "cpuLimit": process.env.CPU_LIMIT,
      "memoryRequest": process.env.MEMORY_REQUEST,
      "memoryLimit": process.env.MEMORY_LIMIT,
    },
  };

  if (podDetails === undefined || podDetails === null) {
    res.status(500).send('Cannot get pod details');
  } else {  
    res.status(200).json(podDetails);
  }
}

// Downward API의 볼륨을 통해 Pod의 상세 정보를 가져오는 함수
function getPodDetailsDApi(req, res) {
  const podDetails = {};
  const podInfoDir = '/etc/podinfo';
  const files = fs.readdirSync(podInfoDir);

  files.forEach(file => {
    const filePath = path.join(podInfoDir, file);
    if (fs.statSync(filePath).isFile()) {
      const data = fs.readFileSync(filePath, 'utf8');
      podDetails[file] = data;
      console.log(podDetails)
      // console.log(`${file}: ${data}`)
    }
  });
  res.status(200).json(podDetails);
}

module.exports = {
  getPodDetailsEnv,
  getPodDetailsDApi
};
