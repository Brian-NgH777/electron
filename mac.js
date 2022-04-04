// let {PythonShell} = require('python-shell');
var path = require("path");
const util = require('util');
const exec = util.promisify(require('child_process').exec);
// const Redis = require('ioredis');
// const fs = require("fs");
// const client = new Redis('redis://localhost:6379');

// let appName = "Electron", localData, fileName = "data-storage.log";

async function GetIP() {
    console.log("scan..........");
    document.getElementById("ip").innerHTML = "scan..........";
    var cmd = ""
    switch (process.platform) {
        case "darwin": {
            console.log("darwin");
            cmd = path.join(__dirname, 'py', 'pk-new');
            break
        }
        case "win32": {
            console.log("win32");
            cmd = path.join(__dirname, 'py', 'pk-new.exe');
            break
        }
        case "linux": {
            console.log("linux");
            cmd = path.join(__dirname, 'py', 'pk-new');
            break
        }
        default: {
            cmd = path.join(__dirname, 'py', 'pk-new');
        }
    }

    const { stdout, stderr } = await exec(cmd);
    console.log('stdout:', stdout);
    console.log('stderr:', stderr);
    // await saveDataScan('b-test-1', stdout);
    document.getElementById("ip").innerHTML = stdout;
}


// function getAppDataPath() {
//     switch (process.platform) {
//         case "darwin": {
//             return path.join(process.env.HOME, "Library", "Application Support", appName);
//         }
//         case "win32": {
//             return path.join(process.env.APPDATA, appName);
//         }
//         case "linux": {
//             return path.join(process.env.HOME, "."+appName);
//         }
//         default: {
//             console.log("Unsupported platform!");
//             process.exit(1);
//         }
//     }
// }

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

// async function saveDataScan(key, value) {
//     let s = await client.set(key, value);
//     console.log("set", s);
// }

async function InstallPackage() {
    let pab = '';
    let pai = path.join(__dirname, 'frp', 'frpc.ini');
    switch (process.platform) {
        case "darwin": {
            console.log("darwin");
            pab = path.join(__dirname, 'frp', 'frpc-mac');
            break
        }
        case "win32": {
            console.log("win32");
            pab = path.join(__dirname, 'frp', 'frpc-win.exe');
            break
        }
        case "linux": {
            console.log("linux");
            pab = path.join(__dirname, 'frp', 'frpc-raspberry');
            break
        }
        default: {
            pab = path.join(__dirname, 'frp', 'frpc-mac');
        }
    }

    let cmd = `${pab} -c ${pai}`
    console.log('cmd:', cmd);
    const { stdout, stderr } = await exec(cmd);
    console.log('stdout:', stdout);
    console.log('stderr:', stderr);
}
