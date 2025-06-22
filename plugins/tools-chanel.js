import fetch from 'node-fetch';

let handler = async (m, { conn, text }) => {
    if (!text || !text.endsWith('@newsletter')) {
        return conn.reply(m.chat, '❌ Usa el formato correcto:\n.chanel 120363xxxxxxx@newsletter', m);
    }

    const canalJid = text.trim();
    const audioUrl = 'https://files.catbox.moe/4c2kje.mp3'; // tu audio

    try {
        const res = await fetch(audioUrl);
        if (!res.ok) throw new Error('No se pudo descargar el audio.');
        const buffer = await res.buffer();

        await conn.sendMessage(canalJid, {
            audio: buffer,
            mimetype: 'audio/mp4',
            ptt: true // se envía como nota de voz
        });

        await conn.sendMessage(m.chat, {
            text: '✅ Audio enviado al canal correctamente.'
        }, { quoted: m });

    } catch (e) {
        console.error('❌ Error al enviar audio al canal:', e);
        return conn.reply(m.chat, '❌ No se pudo enviar el audio. Asegúrate que el link sea válido y el bot tenga permisos.', m);
    }
};

handler.help = ['chanel <jid_del_canal>'];
handler.tags = ['audio', 'canal'];
handler.command = /^chanel$/i;
export default handler;
