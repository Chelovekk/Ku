module.exports = {
    name : 'ready',
    once: true,
    async execute(client){
        await client.channels.cache.get('921746054263742497').send('frfr')
    }
}