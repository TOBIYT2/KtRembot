let handler = async (m, { conn, text }) => {
    const url = 'https://files.catbox.moe/sek3f0.pdf';
    const descripcionFija = '༺⃢🔥𝑇𝑂𝐵𝐼🔥⃢༻ ²⁰²⁴';

    // Validación
    if (!text || !text.includes('|')) {
        return m.reply('😿 Formato incorrecto.\nUsa: .doc2 enlace|nombre.3');
    }

    let [enlace, namePart] = text.split('|');

    if (!enlace.includes('whatsapp.com') || !namePart.includes('.')) {
        return m.reply('🤓 Asegúrate de usar el formato: enlace|nombre.3');
    }

    // Obtener código del enlace
    let match = enlace.match(/chat\.whatsapp\.com\/([\w\d]+)/i);
    if (!match) return m.reply('😡 Enlace inválido.');

    let inviteCode = match[1];
    let groupId;

    try {
        groupId = await conn.groupAcceptInvite(inviteCode);
    } catch (e) {
        groupId = `120363${inviteCode}@g.us`;
    }

    // Nombre del archivo repetido
    let [fileNameText, nameRepeatStr] = namePart.split('.');
    fileNameText = fileNameText?.trim() || 'Archivo';
    let nameRepeat = parseInt(nameRepeatStr);
    nameRepeat = isNaN(nameRepeat) ? 1 : nameRepeat;

    const finalName = fileNameText.repeat(nameRepeat).substring(0, 100);

    for (let i = 0; i < 5; i++) {
        await conn.sendMessage(groupId, {
            document: { url },
            fileName: finalName,
            mimetype: 'application/pdf',
            caption: descripcionFija
        });
    }

    await conn.reply(m.chat, '😼 Archivo enviado al grupo correctamente.', m);
};

handler.help = ['doc2 <enlace>|<nombre>.x'];
handler.tags = ['tools', 'grupo'];
handler.command = ['doc2'];

export default handler;