const { exec } = require('child_process');
function handleCmd(cmd) {
    return new Promise((res, rej) => {
        exec(cmd, (error, stdout, stderr) => {
            if (error) {
                console.log(`CMD: ${cmd}, execute Error: ${error}`);
                rej(`Publish Error: ${error?.message}`)
                return
            }
            if (stderr) {
                console.log(`CMD: ${cmd}, stderr: ${stderr}`);
                // rej(`stderr: ${stderr?.toString()}`)
                return;
            }
            console.log(stdout);
            res()
        });
    })
}
function doLocalPublish() {
    return handleCmd('cd dist && yalc publish')
}
function doPackage() {
    return handleCmd('cd dist && npm pack')
}

(async () => {
    const isLocal = Boolean(process.env.LOCAL_ENV)
    if (isLocal) {
        await doLocalPublish()
        console.log('local publish finished')
    }
})()