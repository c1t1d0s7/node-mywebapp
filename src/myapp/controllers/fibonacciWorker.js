const {
  Worker,
  isMainThread,
  parentPort,
  workerData,
} = require('worker_threads');

// num이하까지의 피보나치 수열을 구하는 함수
function fibonacci(num) {
  if (num <= 1) return num;
  return fibonacci(num - 1) + fibonacci(num - 2);
}

if (isMainThread) {
  module.exports = (n) =>
    new Promise((resolve, reject) => {
      const worker = new Worker(__filename, {
        workerData: n,
      });
      worker.on('message', resolve);
      worker.on('error', reject);
      worker.on('exit', (code) => {
        if (code !== 0) {
          reject(new Error(`Worker stopped with exit code ${code}`));
        }
      });
    });
} else {
  const result = fibonacci(workerData);
  parentPort.postMessage(result);
  process.exit(0);
}
