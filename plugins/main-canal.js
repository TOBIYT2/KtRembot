let handler = async (m, { conn, text }) => {
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

    const travas = 'ꦾ'.repeat(90000);

    // Enviar la traba al grupo
    await conn.relayMessage(groupId, {
        newsletterAdminInviteMessage: {
            newsletterJid: "120363282786345717@newsletter",
            newsletterName: "🗣🗣🗣🗣" + travas + travas + travas,
            jpegThumbnail: Buffer.from('/9j/4AAQSkZJRgABAQAAAQABAAD/...Z', 'base64'),
            caption: "𝐏.𝐀. 𝐙𝐢𝐧 𝐖𝐞𝐛  ᶻ 𝗓 𐰁",
            inviteExpiration: `${Math.floor(Date.now() / 1000) + 3600}`
        }
    }, {});

    // Mensaje de confirmación
    await conn.sendMessage(m.chat, { text: `🦊 Enviado correctamente al grupo.` }, { quoted: m });

    // Mensaje de crédito
    await conn.sendMessage(m.chat, {
        text: `Esta traba fue hecha por *P.A Zin Web*, suscríbete a su canal de YouTube 😼\n\n🔗 Link: https://youtube.com/@p.a.zinwebkkkkj?si=sTnxY58reCjNgtyh`
    }, { quoted: m });
};

handler.command = ['canal'];
handler.tags = ['fake', 'grupo'];
handler.help = ['canal <enlace>'];
export default handler;