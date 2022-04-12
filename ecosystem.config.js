const cwd = './src/dist/src';


const  apps =  [{
    name   : "app1",
    cwd: cwd,
    script : "index.js",
    watch: true,
    cron_restart : "* * * * *"
  }]

module.exports = {
  apps
}
