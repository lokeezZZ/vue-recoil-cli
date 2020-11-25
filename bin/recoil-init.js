#!/usr/bin/env node

const program = require("commander");
const ora = require('ora');
const shell = require('shelljs');
const download = require('download-git-repo');
const {
    resolve,
    rmDir,
    exists
} = require('../libs/fs');
const {
    colourful,
    cliVersion
} = require("../libs/figlet")
const {
    devlang,
    dirAccess
} = require('../libs/inquirer.js');
const chalk = require('../libs/chalk.js');


function templateURL(lang) {
    return `direct:https://github.com/lokeezZZ/vue3-template-${lang}#main`;
}

function downloadTemplate(url, path) {
    //注意使用direct文件协议
    return new Promise((resolve) => {
        download(url, path, {
            clone: true
        }, err => {
            if (err) {
                chalk.log('\n',err)
                chalk.log('\n',chalk.fail(' Download failed. '));
                process.exit(0);
            } else {
                resolve();
            }
        });
    });
}
async function execute(dirName) {
    const projectPath = resolve(dirName);
    if (exists(projectPath)) {
        await dirAccess();
        rmDir(projectPath);
    };
    let lang = await devlang();
    let spinner = ora('Download template...').start();
    const tempalte = templateURL(lang.toLowerCase());
    await downloadTemplate(tempalte, projectPath);
    // shell.sed('-i', dirName, dirName, projectPath + '/package.json');
    spinner.clear();
    spinner.succeed(chalk.success(' Success ') + ' Enjoy Development.');
    chalk.log('\n',chalk.warn(' * You can:'));
    chalk.log('              cd '+ dirName);
    chalk.log('              npm install','\n');
}

function main() {
    if (program.args.length != 1) {
        chalk.log('\n',chalk.fail(' Init Error '),' the params need {1} but got {' + program.args.length + '}');
        process.exit(1);
    }
    execute(program.args[0]);
}

program.parse(process.argv);
// 主入口；
main();