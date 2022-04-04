// let {PythonShell} = require('python-shell');
var path = require("path");
const child_process = require("child_process");
const fs = require("fs");
let appName = "Electron", localData, fileName = "data-storage.log";

function GetIP() {
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

    run_script(cmd, null, () => {
        console.log("running script success");
    });

    // PythonShell.run('scan.py', options, async function (err, data) {
    //     if (err) throw err;
    //     console.log('finished');
    //     let strArr = data[0].replace(/'/g, '"');
    //     strArr = JSON.parse(strArr);
    //     let df = [];
    //     for(let i = 0 ; i < strArr.length; i ++) {
    //         try {
    //             const response = await axios.get(`https://api.maclookup.app/v2/macs/${strArr[i].mac}`);
    //             d = strArr[i];
    //             d.verdor = response.data;
    //             df.push(d);
    //         } catch (error) {
    //             throw error;
    //         }
    //     }

    //     document.getElementById("ip").innerHTML = df;
    // });
}

function run_script(command, args, callback) {
    var child = child_process.spawn(command, args, {
      encoding: "utf8",
      shell: true,
    });
    // You can also use a variable to save the output for when the script closes later
    child.on("error", (error) => {
      console.warn("Error occured");
    });
  
    child.stdout.setEncoding("utf8");
    child.stdout.on("data", (data) => {
      //Here is the output
        console.log("data", data);
        // saveAppData(data)
        document.getElementById("ip").innerHTML = data;
    });
  
    child.stderr.setEncoding("utf8");
    child.stderr.on("data", (data) => {
      // Return some data to the renderer process with the mainprocess-response ID
    //   mainWindow.webContents.send("mainprocess-response", data);
      //Here is the output from the command
      console.log("error", data);
    });
  
    child.on("close", (code) => {
      //Here you can get the exit code of the script
      switch (code) {
        case 0:
          console.info("End process.");
          break;
      }
    });
    if (typeof callback === "function") callback();
}

function getAppDataPath() {
    switch (process.platform) {
        case "darwin": {
            return path.join(process.env.HOME, "Library", "Application Support", appName);
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

function saveAppData (content) {
    const appDataDir = getAppDataPath();

    // Create appDataDir if not exist
    if (!fs.existsSync(appDataDir)) {
        fs.mkdirSync(appDataDir);
    }

    const appDataFilePath = path.join(appDataDir, fileName);
    content = JSON.stringify(content);

    fs.writeFile(appDataFilePath, content, (err) => {
        if (err) {
            console.log("There was a problem saving data!");
            // console.log(err);
        } else {
            console.log("Data saved correctly!");
        }
    });
} 