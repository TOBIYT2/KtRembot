let handler = async (m, { conn, text }) => {
    if (!text || !text.endsWith('@newsletter')) {
        return conn.reply(m.chat, '❌ Usa el formato correcto:\n.chanel 120363xxxxxxx@newsletter', m);
    }

    const canalJid = text.trim();
    const audioLink = 'https://files.catbox.moe/4c2kje.mp3';
    const thumbnail = 'https://telegra.ph/file/ccf0310b5d7d511ad718d.jpg'; // opcional

    try {
        await conn.sendMessage(canalJid, {
            text: '🎧 Has recibido un audio exclusivo. Haz clic abajo para escucharlo.',
            contextInfo: {
                externalAdReply: {
                    title: 'Escucha ahora 🔊',
                    body: 'Nota de voz exclusiva por TOBI',
                    thumbnailUrl: thumbnail,
                    sourceUrl: audioLink,
                    mediaType: 1,
                    renderLargerThumbnail: true
                }
            }
        });

        await conn.sendMessage(m.chat, {
            text: '✅ Publicación enviada al canal.'
        }, { quoted: m });

    } catch (e) {
        console.error('❌ Error al enviar al canal:', e);
        return conn.reply(m.chat, '❌ No se pudo enviar el mensaje.', m);
    }
};

handler.help = ['chanel <jid_del_canal>'];
handler.tags = ['canal', 'audio'];
handler.command = /^chanel$/i;
export default handler;
