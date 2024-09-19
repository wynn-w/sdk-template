const { exec } = require('child_process');

async function doLocalPublish() {
    return await handleCmd('cd dist && yalc publish')
}
function handleCmd(cmd) {
    return new Promise((res, rej) => {
        exec(cmd, (error, stdout, stderr) => {
            if (error) {
                console.log(`CMD: ${cmd}, execute Error: ${error}`);
                rej(`Publish Error: ${error}`)
                return
            }
            if (stderr) {
                console.log(`CMD: ${cmd}, stderr: ${stderr}`);
                rej(`stderr: ${stderr}`)
                return;
            }
            console.log(stdout);
            res()
        });
    })
}
async function doPackage() {
    return await handleCmd('cd dist && npm pack')
}

(async () => {
    const isLocal = Boolean(process.env.LOCAL_ENV)
    if(isLocal){
        await doLocalPublish()
        console.log('local publish finished')
    }
    await doPackage()
    console.log('pack finished')
})()