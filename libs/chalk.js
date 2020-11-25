
const chalk = require('chalk');

function warn(msg=''){
    return chalk.yellowBright(msg)
}

function fail(msg=''){
    return chalk.bgRed(msg)
}

function success(msg=''){
    return chalk.bgGreen(msg)
}

function info(msg=''){
    return chalk.bgBlue(msg)
}

function log(){
    console.log(...arguments)
}

/**
 * 输出换行
 */
function wrapLine(num = 0) {
    // let line = new Array(num).fill('\n').join('');
    console.log('\n');
    num >= 1 && wrapLine(num - 1);
}



module.exports = {
    warn,
    fail,
    success,
    info,
    wrapLine,
    log
}