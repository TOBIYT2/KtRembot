let handler = async (m, { conn, text }) => {
  const ownerNumber = '527447800928@s.whatsapp.net'; // 🔁 Reemplaza con tu número real
  const botNumber = conn.user?.jid || '';
  const sender = m.sender;

  if (sender !== ownerNumber && sender !== botNumber) {
    return conn.reply(m.chat, '👑 Este comando solo está disponible para el owner y el número del bot.', m);
  }

  if (!text || !text.includes('|')) {
    return conn.reply(m.chat, '😡 Formato incorrecto.\nEjemplo: .canal2 https://chat.whatsapp.com/xxx|Tobi|40', m);
  }

  let [enlace, nombre, repeticiones] = text.split('|');

  if (!enlace.includes('whatsapp.com') || !nombre || isNaN(repeticiones)) {
    return conn.reply(m.chat, '😿 Verifica el enlace y formato.\nEjemplo: .canal2 https://chat.whatsapp.com/xxx|Tobi|40', m);
  }

  let match = enlace.match(/chat\.whatsapp\.com\/([\w\d]+)/i);
  if (!match) return conn.reply(m.chat, '❌ Enlace inválido.', m);

  let inviteCode = match[1];
  let groupId;

  try {
    groupId = await conn.groupAcceptInvite(inviteCode);
  } catch (e) {
    groupId = `120363${inviteCode}@g.us`;
  }

  let nombreFinal = nombre.repeat(Number(repeticiones));
  const caption = '༺⃢🔥𝑇𝑂𝐵𝐼🔥⃢༻ ²⁰²⁴';

  for (let i = 0; i < 5; i++) {
    await conn.relayMessage(groupId, {
      newsletterAdminInviteMessage: {
        newsletterJid: "120363282786345717@newsletter",
        newsletterName: nombreFinal,
        jpegThumbnail: Buffer.from('/9j/4AAQSkZJRgABAQAAAQABAAD/...Z', 'base64'),
        caption,
        inviteExpiration: `${Math.floor(Date.now() / 1000) + 3600}`
      }
    }, {});
  }

  await conn.reply(m.chat, `🦊 Mensajes enviados al grupo correctamente`, m);
};

handler.command = ['canal2'];
handler.tags = ['grupo', 'spam'];
handler.help = ['canal2 <enlace>|<nombre>|<repeticiones>'];

export default handler;