const WithTime = require('./withTime');

const withTime = new WithTime();

withTime.on('start', () => {
    console.log('Execution started...');
  });
  
  withTime.on('data', (data) => {
    console.log('Data received:', JSON.stringify(data, null, 2));
  });
  
  withTime.on('error', (error) => {
    console.error('Error msg:', error);
  });
  
  withTime.on('end', (timeTaken) => {
    console.log(`Execution completed in ${timeTaken} ms.`);
  });

withTime.execute(() => fetch('https://jsonplaceholder.typicode.com/posts/1'));
//withTime.execute(() => fetch('https://jsonplaceholderw.typicode.com/posts/1')); // error example