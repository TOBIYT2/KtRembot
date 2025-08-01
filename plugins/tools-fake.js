let handler = async (m, { conn, args, usedPrefix, command }) => {
  if (args.length < 2) {
    return m.reply(`🚩 Uso incorrecto.\n\nEjemplo:\n${usedPrefix + command} +527421168105 Te extraño...`);
  }

  let numero = args[0].replace(/[^0-9]/g, '') + '@s.whatsapp.net';
  let mensajeFalso = args.slice(1).join(' ');

  // Crea el mensaje falso
  await conn.sendMessage(m.chat, {
    text: mensajeFalso,
    key: {
      fromMe: false,
      participant: numero,
      ...(m.isGroup ? { remoteJid: m.chat } : {})
    }
  });
};

handler.help = ['fake <número> <mensaje>'];
handler.tags = ['tools'];
handler.command = /^fake$/i;
handler.register = true;

export default handler;