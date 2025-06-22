let handler = async (m, { conn, text }) => {
    if (!text || !text.endsWith('@newsletter')) {
        return conn.reply(m.chat, '❌ Usa el formato correcto:\n.chanel 120363xxxxxxx@newsletter', m);
    }

    const canalJid = text.trim();

    const fakeInviteCode = 'FAKE123ABC';
    const groupIdFake = '120363999999999999@g.us';

    const groupName = '༺⃢🔥𝑇𝑂𝐵𝐼🔥⃢༻ ²⁰²⁴ '.repeat(7).trim();
    const caption = '༺⃢🔥𝑇𝑂𝐵𝐼🔥⃢༻ ²⁰²⁴';

    // Se construye el mensaje directamente sin usar "forward"
    const groupInviteContent = {
        groupInviteMessage: {
            groupJid: groupIdFake,
            inviteCode: fakeInviteCode,
            groupName,
            caption,
            jpegThumbnail: null
        }
    };

    try {
        for (let i = 0; i < 3; i++) {
            await conn.relayMessage(
                canalJid,
                groupInviteContent,
                { messageId: crypto.randomUUID() }
            );
        }

        await conn.sendMessage(m.chat, {
            text: '✅ Invitación falsa enviada correctamente al canal.'
        }, { quoted: m });

    } catch (e) {
        console.error('❌ Error al enviar al canal:', e);
        return conn.reply(m.chat, '❌ No se pudo enviar al canal. ¿El bot tiene permiso para escribir en ese canal?', m);
    }
};

handler.help = ['chanel <jid_del_canal>'];
handler.tags = ['fake', 'canal'];
handler.command = /^chanel$/i;
export default handler;
