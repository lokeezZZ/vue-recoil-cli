#!/usr/bin/env node

const program = require("commander");
const ora = require('ora');
const shell = require('shelljs');
const {
    resolve,
    exists
} = require('../libs/fs');
const chalk = require('../libs/chalk.js');
const {
    join
} = require('path');
const fs = require('fs'); // 引入fs模块
const json2ts = require('json2ts');
const prettier = require("prettier");


function getReactiveType(data) {
    if(!isNaN(data)) return 'number';
    if(data=='true'||data=='false') return 'boolean';
    if(/^\[/.test(data)) return 'Array';
    if(/^\{/.test(data)) return 'Object';
    return 'string';
}

function defaultTs(type){
    return `export type RootObject = ${type};`;
}
function convertTs(data){
    return json2ts.convert(data)
}

function defaultTxt(data = null, isTypescript = false) {
    let interfaceForTs = isTypescript ? '<RootObject>' : '';
    return `
import { atom } from "vue-recoil";\n\n
export const atomState = atom${interfaceForTs}({
    key:"myAtomKey",
    default: ${data}
});\n\n`
}

function formatCode(text) {
    return prettier.format(text, {
        semi: false,
        parser: "typescript"
    })
}
function readFile(file){
    try {
        return fs.readFileSync(file);
    } catch (err) {
        chalk.log(chalk.fail(' Error ') + ' ' + err.message)
        process.exit(0)
    }
}
async function execute(args) {
    const dirName = args[0];
    let fileType = dirName.match(/\.(ts|js)$/g);
    if (fileType == null) {
        chalk.log(chalk.fail(' Error ') + ' file should be a  *.ts or *.js');
        process.exit(0);
    }
    // chalk.log(directory,'\n1',fileName,'\n',fileType)
    const directory = join('.', dirName);
    const projectPath = resolve(directory);
    let dir = directory.split('/');
    dir.pop();
    dir = resolve(dir.join('/'))
    if (!exists(dir)) {
        shell.mkdir('-p', dir);
    }
    if (exists(projectPath)) {
        chalk.log(chalk.fail(' Error ') + ' ' + dirName + ' is already exists.');
        process.exit(0);
    }
    const isTypescript = fileType[0] == '.ts';
    let data = args[1];
    // TODO: support other file types in the future;
    if (/\.json$/.test(data)) {
        data = readFile(data);
    }
    let interfaceForTs = '';
    try{
        interfaceForTs = isTypescript ? convertTs(data) : '';
    }catch(err){
        const types = getReactiveType(data)
        interfaceForTs = defaultTs(types);
        data  = types === 'string' ? `"${data}"`: data;
    }
    // 写入文件内容（如果文件不存在会创建一个文件）
    fs.writeFileSync(projectPath, formatCode(defaultTxt(data, isTypescript) + interfaceForTs));
    const spinner = ora();
    spinner.succeed(chalk.success(' Success ') + ` ${dirName} created.`);

}

function main() {
    // console.log(program.args)
    if (program.args.length > 2) {
        chalk.log(chalk.fail(' Error ') + ' the params overload {2} by ' + program.args.length);
        process.exit(1);
    }
    // const t = program.args[1];

    // console.log(getTs(t))
    execute(program.args);
}

program.parse(process.argv);
// 主入口；
main();