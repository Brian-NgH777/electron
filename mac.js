// let {PythonShell} = require('python-shell');
var path = require('path')
const util = require('util')
const axios = require('axios')
var AWS = require('aws-sdk')
const exec = util.promisify(require('child_process').exec)
const fs = require('fs')
const ini = require('ini')
const {
  isDev,
  AWS_S3_ACCESS_KEY,
  AWS_S3_SECRET_KEY,
  AWS_S3_REGION,
  AWS_S3_BUCKET,
} = require('./app/configs')

let appName = 'Electron'
let configs = []
let pyData = []
let auth

async function Auth(username) {
  try {
    let url = `https://api-dev-revamp.viact.net/api/v2/frpc-tokens/${username}`
    let { data } = await axios.get(url)
    console.log(data)
    return { username, token: data.result.token }
  } catch (error) {
    console.error('error:', error)
  }
}

async function checkConnect(url) {

  switch(expression) {
    case 'http':
      const res = await downloadFile(snapShotUrl);
      
      return 
      break;
    case 'rtps':
      break;
    default:
      console.error('error:', "no type support")
  }
}

async function CreateCamera(body) {
  let item = {
    username: body.username,
    remotePort: body.remotePort,
    localPort: body.port,
    localIp: body.ip,
  }
  configs.push(item)

  // create forward
  await createFrpcForward(item)

  // create createMJPEGStream
  let stUrl = await createMJPEGStreamUrl({
    username: body.username,
    remotePort: body.remotePort,
    cameraVideoPath: body.link,
  })

  // create createSnapShotUrl
  let ssUrl = await createSnapShotUrl(body.snapLink)
  console.log('snapshot link', ssUrl)

  // create camera (API củ)
  await createCameraServer({ snapshot: ssUrl, web_url: stUrl, ...body })

  // config frpc
  await frpcClient()

  // Note: dùng promise.all
}

async function uploadFromStream(arrBuffer) {
  const s3 = new AWS.S3({
    region: AWS_S3_REGION,
    credentials: {
      accessKeyId: AWS_S3_ACCESS_KEY,
      secretAccessKey: AWS_S3_SECRET_KEY,
    },
  })

  var buffer = Buffer.from(arrBuffer)

  return await s3
    .upload({
      Bucket: AWS_S3_BUCKET,
      Key: `${Date.now()}-snapshot.png`,
      Body: buffer,
      ContentType: 'image/png',
      ACL: 'public-read',
    })
    .promise()
}

async function createSnapShotUrl(snapShotUrl) {
  const data = await uploadFromStream(res.data)
  return data.Location
}

async function downloadFile(fileUrl) {
  return await axios.get(fileUrl, {
    responseType: 'arraybuffer',
  })
}

async function createCameraServer(body) {
  console.log('body', body)
  try {
    let url = `https://api-dev-revamp.viact.net/api/v2/cameras`
    let { status, data } = await axios.post(url, {
      company_code: body.companyCode,
      engines: ['danger-zone', 'safety-helmet'],
      name: body.cameraName,
      snapshot: body.snapshot,
      snapshot_created_at: Date.now(),
      type: '',
      color: '#ff9800',
      enable_status: true,
      position: {
        Lat: 105,
        Long: 203,
      },
      angle_view: 90,
      direction: 90,
      web_url: body.web_url,
    })
    if (!status || status !== 201) {
      console.error('error:', error)
    }
    console.log('createCameraServer')
  } catch (error) {
    console.error('error:', error)
  }
}

async function deleteCamera(item) {
  // remove item in array tổng (configs)
  let i = configs.findIndex(element => element.localPort > item.localPort)
  delete configs[i]

  // delete forward
  await deleteFrpcForward({ remote_port: 'remote_port' })

  // delete forward
  await deleteCameraUrl({ remotePort: 'remote_port' })

  // delete camera (API củ)

  // config frpc
  await frpcClient()

  // Note: dùng promise.all
}

async function createFrpcForward(d) {
  try {
    let url = `https://api-dev-revamp.viact.net/api/v2/frpc-forwards`
    let { status, data } = await axios.post(url, {
      username: d.username,
      remote_port: d.remotePort,
      local_port: d.localPort,
      local_ip: d.localIp,
    })
    if (!status || status !== 201) {
      console.error('error:', error)
    }
    console.log('createFrpcForward')
  } catch (error) {
    console.error('error:', error)
  }
}

async function deleteFrpcForward(d) {
  try {
    let url = `https://api-dev-revamp.viact.net/api/v2/frpc-forwards/delete?username=${auth.username}&remote_port=${d.remote_port}`
    let { status } = await axios.delete(url)
    if (!status || status !== 200) {
      console.error('error:', error)
    }
    console.log('deleteFrpcForward')
  } catch (error) {
    console.error('error:', error)
  }
}

async function createMJPEGStreamUrl(d) {
  try {
    let url = `https://api.viact.net/cgi-config/camera-url`
    let { status, data } = await axios.post(url, {
      clientID: d.username,
      remotePort: Number(d.remotePort),
      cameraVideoPath: d.cameraVideoPath,
    })
    if (!status || status !== 200) {
      console.error('error:', error)
    }
    console.log('createCameraUrl')
    return data.URL
  } catch (error) {
    console.error('error:', error)
  }
}

async function deleteCameraUrl(d) {
  try {
    let url = `https://api.viact.net/cgi-config/camera-url`
    let { status, data } = await axios.delete(url, {
      clientID: auth.username,
      remotePort: Number(d.remotePort),
    })
    if (!status || status !== 200) {
      console.error('error:', error)
    }
    console.log('deleteCameraUrl')
    return data
  } catch (error) {
    console.error('error:', error)
  }
}

async function GetIP() {
  var cmd = ''
  switch (process.platform) {
    case 'darwin': {
      cmd = path.join(__dirname, isDev ? 'py' : '../py', 'pk-new')
      break
    }
    case 'win32': {
      cmd = path.join(__dirname, isDev ? 'py' : '../py', 'pk-new.exe')
      break
    }
    case 'linux': {
      cmd = path.join(__dirname, isDev ? 'py' : '../py', 'pk-new-pi')
      break
    }
    default: {
      cmd = path.join(__dirname, isDev ? 'py' : '../py', 'pk-new')
    }
  }
  const { stdout } = await exec(cmd)
  const data = eval(stdout)
  pyData.push(...data)
  return data
}

function getAppDataPath() {
  switch (process.platform) {
    case 'darwin': {
      return path.join(process.env.HOME, 'Library', appName)
    }
    case 'win32': {
      return path.join(process.env.APPDATA, appName)
    }
    case 'linux': {
      return path.join(process.env.HOME, '.' + appName)
    }
    default: {
      console.log('Unsupported platform!')
      process.exit(1)
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

async function InstallPackage(username) {
  let d = await Auth(username)
  console.log(d)
  auth = d
  await frpcClient()
}

async function frpcClient() {
  let pab = ''
  let { appDataFilePath, isReload } = createIni(auth)

  switch (process.platform) {
    case 'darwin': {
      pab = path.join(__dirname, isDev ? 'frp' : '../frp', 'frpc-mac')
      break
    }
    case 'win32': {
      pab = path.join(__dirname, isDev ? 'frp' : '../frp', 'frpc-win.exe')
      break
    }
    case 'linux': {
      pab = path.join(__dirname, isDev ? 'frp' : '../frp', 'frpc-raspberry')
      break
    }
    default: {
      pab = path.join(__dirname, isDev ? 'frp' : '../frp', 'frpc-mac')
    }
  }

  let cmd = `${pab} -c ${appDataFilePath}`
  if (isReload) {
    cmd = `${pab} reload -c ${appDataFilePath}`
  }
  console.log('cmd:', cmd)
  const { stdout, stderr } = await exec(cmd)
  console.log('stdout:', stdout)
  console.log('stderr:', stderr)
}

function createIni() {
  const appDataDir = getAppDataPath()
  let isReload = true
  if (!fs.existsSync(appDataDir)) {
    fs.mkdirSync(appDataDir)
  }

  let pai = path.join(__dirname, isDev ? 'frp' : '../frp', 'frpc.ini')
  const appDataFilePath = path.join(appDataDir, 'config_frpc.ini')
  var config = ini.parse(fs.readFileSync(pai, 'utf-8'))

  if (configs.length === 0 && !fs.existsSync(appDataFilePath)) {
    isReload = false
    config.common.server_addr = '13.213.164.203'
    config.common.server_port = '7000'
    config.common.user = auth.username
    config.common.meta_token = auth.token

    fs.writeFileSync(appDataFilePath, ini.stringify(config))
  }

  if (configs.length > 0 && fs.existsSync(appDataFilePath)) {
    config.common.server_addr = '13.213.164.203'
    config.common.server_port = '7000'
    config.common.user = auth.username
    config.common.meta_token = auth.token

    for (let i = 0; i < configs.length; i++) {
      config[`item_${i}`] = {
        type: 'tcp',
        remote_port: configs[i].remotePort,
        local_port: configs[i].localPort,
        local_ip: configs[i].localIp,
      }
    }

    fs.writeFileSync(appDataFilePath, ini.stringify(config))
  }

  return { appDataFilePath, isReload }
}

module.exports = {
  Auth,
  GetIP,
  InstallPackage,
  CreateCamera,
}
