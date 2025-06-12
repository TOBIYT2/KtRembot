import fs from 'fs';
import path from 'path';

let handler = async (m, { conn, text, usedPrefix, command }) => {
    if (!text || !text.includes('|')) {
        return conn.reply(m.chat, `❌ Usa el formato correcto:\n${usedPrefix + command} <contenido>|<nombre>`, m);
    }

    if (!m.fromMe) {
        return conn.reply(m.chat, '❌ Este comando solo puede usarlo el número propietario del bot.', m);
    }

    let [contenido, nombre] = text.split('|');
    if (!contenido || !nombre) {
        return conn.reply(m.chat, '❌ Debes incluir contenido y nombre separados por "|"', m);
    }

    nombre = nombre.trim().replace(/[^a-zA-Z0-9_\-]/g, '');
    const fileName = `tools-${nombre}.js`;
    const filePath = path.join('./plugins', fileName);

    try {
        fs.writeFileSync(filePath, contenido.trim());
        await conn.reply(m.chat, `✅ Archivo *${fileName}* creado en *plugins/*.\n\n⚠️ Nota: No se cargó automáticamente. Verifica que el código sea válido y reinicia o usa reload.`, m);
    } catch (err) {
        console.error('❌ Error al crear archivo:', err);
        await conn.reply(m.chat, `❌ Error al crear el archivo: ${err.message}`, m);
    }
};

handler.command = ['plugins'];
handler.help = ['plugins <contenido>|<nombre>'];
handler.tags = ['tools'];

export default handler;