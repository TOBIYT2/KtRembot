let handler = async (m, { conn, args, usedPrefix, command }) => {
  if (!args[0] || !args[1]) {
    return m.reply(`❌ Uso incorrecto.\nEjemplo:\n${usedPrefix + command} +529999999999 Hola`);
  }

  let numero = args[0].replace(/[^0-9]/g, '') + '@s.whatsapp.net';
  let texto = args.slice(1).join(' ');

  // Crear el mensaje falso
  let fakeMsg = {
    key: {
      remoteJid: conn.user.jid,
      fromMe: false,
      id: conn.generateMessageTag(),
      participant: numero
    },
    message: {
      conversation: texto
    },
    messageTimestamp: Math.floor(Date.now() / 1000),
    pushName: "Usuario", // Nombre que quieras mostrar como emisor
  };

  // Enviar el mensaje falso al chat con ese número (de forma local)
  conn.ev.emit('messages.upsert', {
    messages: [fakeMsg],
    type: 'notify'
  });

  m.reply(`✅ Mensaje falso enviado como si ${args[0]} te lo hubiera escrito.`);
};
handler.command = /^fake$/i;
export default handler;