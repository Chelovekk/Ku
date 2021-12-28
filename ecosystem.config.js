module.exports = {
  apps : [{
    name   : "app1",
    script : "./dist/index.js",
    watch: true,
    cron_restart : "* * * * *"
  }]
}
