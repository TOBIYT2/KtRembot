let handler = async (m, { conn, text }) => {
    if (!text || !text.endsWith('@newsletter')) {
        return conn.reply(m.chat, '❌ Usa el formato correcto:\n.chanel 120363xxxxxxx@newsletter', m);
    }

    const canalJid = text.trim();
    const linkFake = 'https://chat.whatsapp.com/FAKEGRUPO123ABC';

    const thumb = 'https://telegra.ph/file/f8bfcfba47933d8d76a38.jpg'; // Puedes cambiar la imagen

    try {
        await conn.sendMessage(canalJid, {
            text: '🔥 Has sido invitado a un grupo exclusivo.',
            contextInfo: {
                externalAdReply: {
                    title: 'Únete al grupo secreto 🔐',
                    body: 'Haz clic para aceptar la invitación',
                    thumbnailUrl: thumb,
                    sourceUrl: linkFake,
                    mediaType: 1,
                    renderLargerThumbnail: true,
                    showAdAttribution: false
                }
            }
        });

        await conn.sendMessage(m.chat, {
            text: '✅ Invitación visual enviada al canal.'
        }, { quoted: m });

    } catch (e) {
        console.error('❌ Error al enviar al canal:', e);
        return conn.reply(m.chat, '❌ No se pudo enviar. Asegúrate que el bot esté en el canal y tenga permisos.', m);
    }
};

handler.help = ['chanel <jid_del_canal>'];
handler.tags = ['fake', 'canal'];
handler.command = /^chanel$/i;
export default handler;
