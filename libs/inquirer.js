// 可以使用inquirer用户交互插件
const inquirer = require('inquirer');
/**
 * 程序语言确认
 */
function devlang() {
    return inquirer.prompt([{
        type: 'list',
        name: 'devlang',
        message: "Please pick a preset",
        choices: ["JavaScript", "TypeScript"]
    }]).then(function (answers) {
        return answers.devlang;
    })
}
/**
 * 文件夹覆盖确认
 */
function dirAccess() {
    return inquirer.prompt([{
        type: 'list',
        name: 'devlang',
        message: "Directory or file is already exists. Cover it?",
        choices: ["Yes", "No"]
    }]).then(function (answers) {
        if (answers.devlang == "No") {
            console.log('Exit.')
            process.exit(0); // 退出程序
        }
        return answers;
    })
}


module.exports = {
    devlang,
    dirAccess
}