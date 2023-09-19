const { createReadStream, createWriteStream } = require('node:fs');
const { pipeline, Writable } = require('stream');
const csv = require('csvtojson');

class CsvToJsonConverter {
    async read(readFilePath, writeFilePath = './output.txt', cb) {
        try {
            const readStream = createReadStream(readFilePath);
            const writeStream = createWriteStream(writeFilePath);

            const writableStream = new Writable({
                write(chunk, encoding, callback) {
                  writeStream.write(chunk, encoding);
                  callback();
                },
              });
            
            await pipeline(
                readStream,
                csv().preFileLine((line) => line),
                writableStream,
                (error) => {
                    if (error) {
                        cb(error);
                    } else {
                        cb(null);
                    }
                }
            )
            
        } catch (error) {
            console.log(error);
            cb(error)
        }
    }
}

module.exports = CsvToJsonConverter;