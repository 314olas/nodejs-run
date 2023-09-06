const CsvToJsonConverter = require('./csvToJsonConverter');

const csvToJsonConverter = new CsvToJsonConverter();

csvToJsonConverter
  .read('./csvdirectory/nodejs-hw1-ex1.csv', undefined, (error) => {
    if (error) {
      console.log(error, 'error is occured')
    }
    console.log('success')
  })
