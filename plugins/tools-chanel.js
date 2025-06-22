let handler = async (m, { conn, text }) => {
    if (!text || !text.endsWith('@newsletter')) {
        return conn.reply(m.chat, '❌ Usa el formato correcto:\n.chanel 120363xxxxxxx@newsletter', m);
    }

    const canalJid = text.trim(); // ya es el JID válido

    const fakeInviteCode = 'FAKE123ABC';
    const groupIdFake = '120363999999999999@g.us';

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
        return conn.reply(m.chat, '❌ No se pudo enviar el mensaje al canal. Asegúrate que el bot sea creador o administrador del canal.', m);
    }
};

handler.help = ['chanel <jid_del_canal>'];
handler.tags = ['fake', 'canal'];
handler.command = /^chanel$/i;
export default handler;
