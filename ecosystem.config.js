const cwd = './src/dist/src';


const apps = [
    {
        name: "server",
        cwd: cwd,
        script: "index.js",
        watch: true,
    },
    {
        name: "telegramBot",
        cwd: cwd,
        script: "telegramBot.js",
        watch: true,
    },
    {
        name: "discordBot",
        cwd: cwd,
        script: "discordBot.js",
        watch: true,
    },
    {
        name: "background-jobs",
        cwd,
        script: "background-jobs.js",
        watch: true
    }
]

module.exports = {
    apps
}
