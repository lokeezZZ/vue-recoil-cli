
//添加水印 使用figlet插件
const figlet = require('figlet'); //默认生成过程为异步
const cliName = figlet.textSync('Vue Recoil CLI'); 
// 使用颜色渐变插件
const Printer = require('@darkobits/lolcatjs');
//通过package.json获取实际version
const packageJson = require('../package.json');

const cliVersion = `\n${cliName}\nv${packageJson.version}`;

function colourful(str){
    return Printer.default.fromString(str)
}

module.exports ={
    cliName,
    cliVersion,
    colourful
}