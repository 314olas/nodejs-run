const os = require('os');
const { appendFile } = require('fs');
const { exec } = require('child_process');
const { SYSTEM_COMMANDS, LOG_FILE_WRITE_INTERVAL, STD_OUT_WRITE_INTERVAL } = require('./constants');

const getSystemCommand = (osType) => {
  const command = SYSTEM_COMMANDS[osType];

  if (command) return command;

  throw new Error("OS is not supported");
};

const logToFile = (data) => {
  appendFile('activityMonitor.log', `${Date.now()} : ${data}\n`, (err) => {
    if (err) throw err;
    console.log(' Added');
  })
}

const logToConsole = (output) => {
  process.stdout.write(output);
}

const shouldLogToFile = () => Date.now() % LOG_FILE_WRITE_INTERVAL < 300;

const executeSystemCommand = (sysCommand, callback) => {
  exec(sysCommand, (error, stdout, stderr) => {
    if (error) {
      console.error('Error executing system command:', error);
      return callback(error, null);
    }

    if (stderr) {
      console.error('Error in system command output:', stderr);
      return callback(stderr, null);
    }
      
    return callback(null, stdout);
  });
}

const runLogProcess = () => {
  const command = getSystemCommand(os.type());

    executeSystemCommand(command, (err, stdout) => {
      const output = `\r${stdout.trim()}`;

      if (!err) {
        logToConsole(output)
      }

      if (!err && shouldLogToFile()) {
        logToFile(stdout.trim());
      }

      setTimeout(writingProcess, STD_OUT_WRITE_INTERVAL);
    })
}

runLogProcess();
