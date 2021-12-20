module.exports = {
    name : 'interactionCreate',
    once: true,
    async execute(interaction){
        if (!interaction.isCommand()) return;
        
            const { commandName } = interaction;

            if (commandName === 'data') {
                let f = await this.getData();
                await interaction.reply(f.substr(0,2000));
            } 
    }
}