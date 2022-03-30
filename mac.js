let {PythonShell} = require('python-shell');
var path = require("path");

function GetIP() {
    console.log("scan..........");
    let p = path.join(__dirname, 'py');
    var options = {
        scriptPath : p,
    }
    console.log("pppp", p);

    PythonShell.run('package-socket.py', options, function (err, data) {
        if (err) throw err;
        console.log('finished', data);
        document.getElementById("ip").innerHTML = data;
    });
}