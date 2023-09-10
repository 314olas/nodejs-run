const WINDOWS_SYS_CMD =
  'powershell "Get-Process | Sort-Object CPU -Descending | Select-Object -First 1 | Format-Table -HideTableHeaders -Property Name, CPU, WorkingSet -AutoSize | Out-String"';

const UNIX_LIKE_SYS_CMD = '"ps -A -o %cpu,%mem,comm | sort -nr | head -n 1"';

const SYSTEM_COMMANDS = {
  Windows_NT: WINDOWS_SYS_CMD,
  Linux: UNIX_LIKE_SYS_CMD,
  Darwin: UNIX_LIKE_SYS_CMD,
};

const STD_OUT_WRITE_INTERVAL = 100;
const LOG_FILE_WRITE_INTERVAL = 60000;


module.exports = {
    SYSTEM_COMMANDS: SYSTEM_COMMANDS,
    STD_OUT_WRITE_INTERVAL: STD_OUT_WRITE_INTERVAL,
    LOG_FILE_WRITE_INTERVAL: LOG_FILE_WRITE_INTERVAL
}