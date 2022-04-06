// let {PythonShell} = require('python-shell');
var path = require('path');
const util = require('util');
const axios = require('axios');
const exec = util.promisify(require('child_process').exec);
const fs = require("fs");
const ini = require('ini');

let appName = "Electron";
// let localData, fileName = "data-storage.log";
async function Auth(username, password) {
    try {
        // login logic => get username
        if(username.length === 0) {
            console.error('error:', "username miss");
        }
        let url = `https://api-dev-revamp.viact.net/api/v2/frpc-tokens/${username}`;
        let { data } = await axios.get(url);
        if(!data || !data.result) {
            console.error('error:', error);
        }
        return {username, token: data.result.token}
    } catch (error) {
        console.error('error:', error);
    }
   
}

async function postScanCamera(username, d) {
    try {
        let url = `https://api-dev-revamp.viact.net/api/v2/cameras/detection/scan/create`
        let { status, data } = await axios.post(url, {username, data: d});
        if(!status || status !== 201 ) {
            console.error('error:', error);
        }
        console.log("postScanCamera", data);
    } catch (error) {
        console.error('error:', error);
    }
}

async function GetIP(username) {
    console.log("scan..........");
    document.getElementById("ip").innerHTML = "scan..........";

    if(!username) {
        username = document.getElementById('username').value;
    }

    var cmd = ""
    switch (process.platform) {
        case "darwin": {
            console.log("darwin");
            cmd = path.join(__dirname, '../py', 'pk-new');
            break
        }
        case "win32": {
            console.log("win32");
            cmd = path.join(__dirname, '../py', 'pk-new.exe');
            break
        }
        case "linux": {
            console.log("linux");
            cmd = path.join(__dirname, '../py', 'pk-new');
            break
        }
        default: {
            cmd = path.join(__dirname, '../py', 'pk-new');
        }
    }
    console.log("cmdcmdcmdcmdcmdcmdcmd", cmd);
    const { stdout, stderr } = await exec(cmd);
    console.log('stdout:', stdout);
    console.log('stderr:', stderr);
    await postScanCamera(username, stdout);
    document.getElementById("ip").innerHTML = stdout;
}

function getAppDataPath() {
    switch (process.platform) {
        case "darwin": {
            return path.join(process.env.HOME, "Library", "ApplicationSupport", appName);
        }
        case "win32": {
            return path.join(process.env.APPDATA, appName);
        }
        case "linux": {
            return path.join(process.env.HOME, "."+appName);
        }
        default: {
            console.log("Unsupported platform!");
            process.exit(1);
        }
    }
}

// function saveAppData (content) {
//     const appDataDir = getAppDataPath();

//     // Create appDataDir if not exist
//     if (!fs.existsSync(appDataDir)) {
//         fs.mkdirSync(appDataDir);
//     }

//     const appDataFilePath = path.join(appDataDir, fileName);
//     content = JSON.stringify(content);

//     fs.writeFile(appDataFilePath, content, (err) => {
//         if (err) {
//             console.log("There was a problem saving data!");
//             // console.log(err);
//         } else {
//             console.log("Data saved correctly!");
//         }
//     });
// }

async function InstallPackage() {
    let un = document.getElementById('username').value;
    // let pw = document.getElementById('password').value;
    let d = await Auth(un, "123");
    await GetIP(d.username);
    
    let pab = '';
    let pai = createIni(d);

    switch (process.platform) {
        case "darwin": {
            console.log("darwin");
            pab = path.join(__dirname, '../frp', 'frpc-mac');
            break
        }
        case "win32": {
            console.log("win32");
            pab = path.join(__dirname, '../frp', 'frpc-win.exe');
            break
        }
        case "linux": {
            console.log("linux");
            pab = path.join(__dirname, '../frp', 'frpc-raspberry');
            break
        }
        default: {
            pab = path.join(__dirname, '../frp', 'frpc-mac');
        }
    }
  
    let cmd = `${pab} -c ${pai}`;
    console.log('cmd:', cmd);
    const { stdout, stderr } = await exec(cmd);
    console.log('stdout:', stdout);
    console.log('stderr:', stderr);
}

function createIni(d) {
    const appDataDir = getAppDataPath();

    if (!fs.existsSync(appDataDir)) {
        fs.mkdirSync(appDataDir);
    }

    let pai = path.join(__dirname, 'frp', 'frpc.ini')
    var config = ini.parse(fs.readFileSync(pai, 'utf-8'))

    config.common.server_addr = '13.213.164.203';
    config.common.server_port = '7000';
    config.common.user = d.username;
    config.common.meta_token = d.token;

    config.tcp_7000.remote_port = '2323';
    config.tcp_7000.local_port = '7000';
    config.tcp_7000.local_ip = '127.0.0.1';

    const appDataFilePath = path.join(appDataDir, "config_frpc.ini");

    fs.writeFileSync(appDataFilePath, ini.stringify(config));

    return appDataFilePath
}
