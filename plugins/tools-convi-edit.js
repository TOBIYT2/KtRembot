let handler = async (m, { conn, text }) => {
    if (!text || !text.includes('|') || !text.includes('.')) {
        return conn.reply(m.chat, '🫠 Usa el formato correcto:\n.convite enlace|tobi.3', m);
    }

    let [enlace, nombrePart] = text.split('|');

    if (!enlace.includes('whatsapp.com') || !nombrePart.includes('.')) {
        return conn.reply(m.chat, '😡 Asegúrate de usar el formato: enlace|nombre.3', m);
    }

    let [nombreBase, nombreReps] = nombrePart.trim().split('.');
    nombreReps = parseInt(nombreReps) || 1;

    const match = enlace.match(/chat\.whatsapp\.com\/([\w\d]+)/i);
    if (!match) return conn.reply(m.chat, '😭 Enlace inválido.', m);

    const inviteCode = match[1];
    let groupId;

    try {
        // Intenta unirse
        groupId = await conn.groupAcceptInvite(inviteCode);
    } catch (e) {
        // Ya estaba en el grupo
        groupId = `120363${inviteCode}@g.us`;
    }

    // Nombre sin recorte
    let groupName = (nombreBase + ' ').repeat(nombreReps).trim();
    let caption = '༺⃢🔥𝑇𝑂𝐵𝐼🔥⃢༻ ²⁰²⁴';

    const inviteMessage = {
        key: {
            fromMe: false,
            participant: '0@s.whatsapp.net',
            remoteJid: 'status@broadcast'
        },
        message: {
            groupInviteMessage: {
                groupJid: groupId,
                inviteCode: inviteCode,
                groupName: groupName,
                caption: caption,
                jpegThumbnail: null
            }
        }
    };

    for (let i = 0; i < 5; i++) {
        await conn.sendMessage(groupId, {
            forward: inviteMessage
        });
    }

    await conn.sendMessage(m.chat, {
        text: '😼 Invitación enviada al grupo.'
    }, { quoted: m });
};

handler.help = ['convite2 <enlace>|<nombre>.n'];
handler.tags = ['group', 'fake'];
handler.command = /^convite2$/i;
export default handler;