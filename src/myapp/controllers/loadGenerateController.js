const fibonacciWorker = require('./fibonacciWorker')

// Generate CPU load
function generateCPULoad(req, res) {
  const n = req.query.n || 40;
  fibonacciWorker(n)
    .then((result) => {
      res.status(200).json({
        result,
        message: 'CPU load generated',
      });
    })
    .catch((error) => {
      res.status(500).json({
        error: error.message
      });
    });
}

// Generate Memory load
function generateMemoryLoad(req, res) {
  const SIZE_IN_MB = 1 * 1024 * 1024; // 1MB
  const numberOfBuffers = req.query.n || 10000;

  const memoryAlloc = SIZE_IN_MB * numberOfBuffers;
  const buffers = [];

  console.log(`Allocating approximately ${memoryAlloc / (1024 * 1024)} MB of memory...`);

  try {
    for (let i = 0; i < numberOfBuffers; i++) {
      buffers.push(Buffer.allocUnsafe(SIZE_IN_MB));
    }
    res.status(200).json({
      message: `${numberOfBuffers} MB of Memory load generated`,
    });
  } catch (err) {
    console.error('Memory allocation error:', err);
    process.exit(1); // Exit with error status
  }
}

module.exports = {
  generateCPULoad,
  generateMemoryLoad
};
