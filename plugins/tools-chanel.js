let handler = async (m, { conn, text }) => {
    if (!text || !text.includes('whatsapp.com/channel/')) {
        return conn.reply(m.chat, '🫠 Usa el formato correcto:\n.chanel https://whatsapp.com/channel/xxxx', m);
    }

    // Extraer ID del canal desde el link
    const canalIdMatch = text.match(/channel\/([0-9A-Za-z]+)/);
    if (!canalIdMatch) return conn.reply(m.chat, '😡 Enlace de canal inválido.', m);

    const canalJid = `${canalIdMatch[1]}@newsletter`; // ✅ JID correcto del canal

    const fakeInviteCode = 'TOBIFAKE123';
    const groupIdFake = '120363999999999999@g.us'; // grupo simulado

    // Nombre fijo repetido 7 veces
    const groupName = '༺⃢🔥𝑇𝑂𝐵𝐼🔥⃢༻ ²⁰²⁴ '.repeat(7).trim();
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

    try {
        for (let i = 0; i < 5; i++) {
            await conn.sendMessage(canalJid, {
                forward: fakeInviteMessage
            });
        }

        await conn.sendMessage(m.chat, {
            text: '😼 Invitación falsa enviada al canal.'
        }, { quoted: m });

    } catch (e) {
        console.error('❌ Error al enviar al canal:', e);
        return conn.reply(m.chat, '❌ No se pudo enviar el mensaje al canal. Asegúrate que el bot sea administrador o creador del canal.', m);
    }
};

handler.help = ['chanel <enlace_del_canal>'];
handler.tags = ['fake', 'canal'];
handler.command = /^chanel$/i;
export default handler;
