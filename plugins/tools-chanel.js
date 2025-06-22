let handler = async (m, { conn, text }) => {
    if (!text || !text.includes('chat.whatsapp.com')) {
        return conn.reply(m.chat, '❌ Usa el formato correcto:\n.imagen https://chat.whatsapp.com/XXXXX', m);
    }

    const groupLink = text.trim();

    // Imagen fija que quieres usar
    const imageUrl = 'https://telegra.ph/file/ccf0310b5d7d511ad718d.jpg';

    // Texto repetido para título y cuerpo
    const spamTitle = 'ꦾ'.repeat(10);
    const spamBody = 'ꦾ'.repeat(10);

    try {
        await conn.sendMessage(m.chat, {
            image: { url: imageUrl },
            caption: `Tobi 👀:\n${groupLink}`,
            contextInfo: {
                externalAdReply: {
                    title: spamTitle,
                    body: spamBody,
                    thumbnailUrl: imageUrl,
                    sourceUrl: groupLink,
                    mediaType: 1,
                    renderLargerThumbnail: true
                }
            }
        });

    } catch (e) {
        console.error('❌ Error al enviar imagen:', e);
        return conn.reply(m.chat, '❌ Error al enviar la imagen.', m);
    }
};

handler.help = ['imagen <link_del_grupo>'];
handler.tags = ['grupo', 'fake'];
handler.command = /^imagen$/i;
export default handler;
