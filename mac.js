// let {PythonShell} = require('python-shell');
var path = require('path');
const util = require('util');
const axios = require('axios');
const exec = util.promisify(require('child_process').exec);
const fs = require('fs');
const ini = require('ini');

let appName = 'Electron';
let configs = [];
let pyData = [];
let auth;

async function Auth(username) {
  try {
    // login logic => get username
    if (username.length === 0) {
      console.error('error:', 'username miss');
    }
    let url = `https://api-dev-revamp.viact.net/api/v2/frpc-tokens/${username}`;
    let { data } = await axios.get(url);
    if (!data || !data.result) {
      console.error('error:', error);
    }
    return { username, token: data.result.token };
  } catch (error) {
    console.error('error:', error);
  }
}

// async function postScanCamera(username) {
//     try {
//         let url = `https://api-dev-revamp.viact.net/api/v2/cameras/detection/scan/create`
//         let { status, data } = await axios.post(url, {username, data: auth});
//         if(!status || status !== 201 ) {
//             console.error('error:', error);
//         }
//         console.log("postScanCamera", data);
//     } catch (error) {
//         console.error('error:', error);
//     }
// }

async function CreateCamera() {
  let i = document.getElementById('config').value;
  let port = document.getElementById('port').value;
  let remote_port = document.getElementById('remote_port').value;
  let usercamera = document.getElementById('usercamera').value;
  let passwordcamera = document.getElementById('passwordcamera').value;
  let postfix = document.getElementById('postfix').value;

  console.log('CreateCamera', pyData[i]);
  let item = {
    remotePort: remote_port,
    localPort: port,
    localIp: pyData[i].ip,
  };
  configs.push(item);

  // create forward
  await createFrpcForward(item);

  // create forward
  let { URL } = await createCameraUrl({
    remotePort: remote_port,
    cameraVideoPath: postfix,
  });
  console.log('createCameraUrl URLURLURLURLURL:', URL);

  // create camera (API củ)

  // config frpc
  await frpcClient(item);

  // Note: dùng promise.all
}

async function deleteCamera() {
  // chosse camera

  // remove item in array tổng (configs)

  // delete forward
  await deleteFrpcForward({ remote_port: 'remote_port' });

  // delete forward
  await deleteCameraUrl({ remotePort: 'remote_port' });

  // delete camera (API củ)

  // config frpc
  await frpcClient(item);

  // Note: dùng promise.all
}

async function createFrpcForward(d) {
  try {
    let url = `https://api-dev-revamp.viact.net/api/v2/frpc-forwards`;
    let { status, data } = await axios.post(url, {
      username: auth.username,
      remote_port: d.remotePort,
      local_port: d.localPort,
      local_ip: d.localIp,
    });
    if (!status || status !== 201) {
      console.error('error:', error);
    }
    console.log('createFrpcForward');
  } catch (error) {
    console.error('error:', error);
  }
}

async function deleteFrpcForward(d) {
  try {
    let url = `https://api-dev-revamp.viact.net/api/v2/frpc-forwards/delete?username=${auth.username}&remote_port=${d.remote_port}`;
    let { status } = await axios.delete(url);
    if (!status || status !== 200) {
      console.error('error:', error);
    }
    console.log('deleteFrpcForward');
  } catch (error) {
    console.error('error:', error);
  }
}

async function createCameraUrl(d) {
  try {
    let url = `https://api.viact.net/cgi-config/camera-url`;
    let { status, data } = await axios.post(url, {
      clientID: auth.username,
      remotePort: Number(d.remotePort),
      cameraVideoPath: d.cameraVideoPath,
    });
    if (!status || status !== 200) {
      console.error('error:', error);
    }
    console.log('createCameraUrl');
    return data;
  } catch (error) {
    console.error('error:', error);
  }
}

async function deleteCameraUrl(d) {
  try {
    let url = `https://api.viact.net/cgi-config/camera-url`;
    let { status, data } = await axios.delete(url, {
      clientID: auth.username,
      remotePort: Number(d.remotePort),
    });
    if (!status || status !== 200) {
      console.error('error:', error);
    }
    console.log('deleteCameraUrl');
    return data;
  } catch (error) {
    console.error('error:', error);
  }
}

async function GetIP() {
  document.getElementById('ip').innerHTML = 'scan..........';

  var cmd = '';
  switch (process.platform) {
    case 'darwin': {
      console.log('darwin');
      cmd = path.join(__dirname, '../py', 'pk-new');
      break;
    }
    case 'win32': {
      console.log('win32');
      cmd = path.join(__dirname, '../py', 'pk-new.exe');
      break;
    }
    case 'linux': {
      console.log('linux');
      cmd = path.join(__dirname, '../py', 'pk-new');
      break;
    }
    default: {
      cmd = path.join(__dirname, '../py', 'pk-new');
    }
  }
  console.log('cmdcmdcmdcmdcmdcmdcmd', cmd);
  const { stdout, stderr } = await exec(cmd);
  console.log('stderr:', stderr);
  eval('var arr=' + stdout);
  pyData = arr;
  document.getElementById('ip').innerHTML = stdout;
}

function getAppDataPath() {
  switch (process.platform) {
    case 'darwin': {
      return path.join(
        process.env.HOME,
        'Library',
        'ApplicationSupport',
        appName
      );
    }
    case 'win32': {
      return path.join(process.env.APPDATA, appName);
    }
    case 'linux': {
      return path.join(process.env.HOME, '.' + appName);
    }
    default: {
      console.log('Unsupported platform!');
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
  let d = await Auth(un);
  console.log(d);
  auth = d;
  await frpcClient(d);
}

async function frpcClient() {
  let pab = '';
  let { appDataFilePath, isReload } = createIni(auth);

  switch (process.platform) {
    case 'darwin': {
      console.log('darwin');
      pab = path.join(__dirname, '../frp', 'frpc-mac');
      break;
    }
    case 'win32': {
      console.log('win32');
      pab = path.join(__dirname, '../frp', 'frpc-win.exe');
      break;
    }
    case 'linux': {
      console.log('linux');
      pab = path.join(__dirname, '../frp', 'frpc-raspberry');
      break;
    }
    default: {
      pab = path.join(__dirname, '../frp', 'frpc-mac');
    }
  }

  let cmd = `${pab} -c ${appDataFilePath}`;
  if (isReload) {
    cmd = `${pab} reload -c ${appDataFilePath}`;
  }
  console.log('cmd:', cmd);
  const { stdout, stderr } = await exec(cmd);
  console.log('stdout:', stdout);
  console.log('stderr:', stderr);
}

function createIni() {
  const appDataDir = getAppDataPath();
  let isReload = true;
  if (!fs.existsSync(appDataDir)) {
    fs.mkdirSync(appDataDir);
  }

  let pai = path.join(__dirname, '../frp', 'frpc.ini');
  const appDataFilePath = path.join(appDataDir, 'config_frpc.ini');
  var config = ini.parse(fs.readFileSync(pai, 'utf-8'));

  if (configs.length === 0 && !fs.existsSync(appDataFilePath)) {
    isReload = false;
    config.common.server_addr = '13.213.164.203';
    config.common.server_port = '7000';
    config.common.user = auth.username;
    config.common.meta_token = auth.token;

    fs.writeFileSync(appDataFilePath, ini.stringify(config));
  }

  if (configs.length > 0 && fs.existsSync(appDataFilePath)) {
    config.common.server_addr = '13.213.164.203';
    config.common.server_port = '7000';
    config.common.user = auth.username;
    config.common.meta_token = auth.token;

    for (let i = 0; i < configs.length; i++) {
      config[`item_${i}`] = {
        type: 'tcp',
        remote_port: configs[i].remotePort,
        local_port: configs[i].localPort,
        local_ip: configs[i].localIp,
      };
    }

    fs.writeFileSync(appDataFilePath, ini.stringify(config));
  }

  return { appDataFilePath, isReload };
}

module.exports = {
  GetIP,
  InstallPackage,
};
