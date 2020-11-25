
const fs = require('fs');
const shell = require('shelljs');
const Path = require('path');

/**
 * @param {string} path 文件名或目录
 */
function resolve(path) {
    // 通过shelljs执行系统命令 
    const _pwd_dir = shell.pwd().stdout;
    // return `${_pwd_dir}/${path}`;
    return Path.resolve(_pwd_dir,path)
}
/**
 * @param {string} path 文件名或目录
 */
function rmDir(path) {
    shell.rm('-rf', path)
    shell.mkdir(path);
}
/**
 * @param {string} path 文件名或目录
 */
function rmFile(path) {
    shell.rm('-f', path)
    shell.touch(path);
}

/**
 * 
 * @param {string} path 文件名或目录
 */
function exists(path) {
    return fs.existsSync(path)
}

module.exports ={
    resolve,
    rmFile,
    rmDir,
    exists
}