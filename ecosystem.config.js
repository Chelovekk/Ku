module.exports = {
  apps : [{
    name   : "app1",
    script : "./index.js",
    watch: true,
    cron_restart : "0 * * * *"
  }]
}