let random = 10;

module.exports = {
    name: 'messageCreate',
    execute(message) {
        const rndIlu = Math.floor(Math.random() * 50) + 1
        const rndInt = Math.floor(Math.random() * 30) + 1
        const rndMEI = Math.floor(Math.random() * 12) + 1
        {
            if (message.author.bot) return;
            else if (message.author.id === '558566227946242048' && random == rndInt)
                message.channel.send("https://cdn.discordapp.com/attachments/780888728834539532/1082286487330103296/image0.png");
            else if (message.author.id === '899953815887958016' && rndIlu == 25) {
                message.channel.send('<@899953815887958016> I will eat your pancreas')
            }
            else if (random == rndInt && message.author.id != '558566227946242048' && message.author.id != '775042627837100033') {
                message.channel.send(message.content)
                if (message.channel.id == '993197232369176756' || message.channel.id == '1003705968858771638') return
            }
            else if (message.author.id === '775042627837100033' && random == rndMEI) {
                message.channel.send(message.content);
            }
            else if (message.author.id === '775042627837100033' && rndIlu == 25) {
                const rndRes = responses[Math.floor(Math.random() * array.length)];
                message.channel.send(responses[rndRes]);
            }
        }
    }
}
