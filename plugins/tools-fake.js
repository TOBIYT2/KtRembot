let handler = async (m, { conn, args, usedPrefix, command }) => {
  if (!args[0] || args.length < 2) {
    return m.reply(`❌ Uso incorrecto.\nEjemplo:\n${usedPrefix + command} +529999999999 Hola`);
  }

  let numero = args[0].replace(/[^0-9]/g, '') + '@s.whatsapp.net';
  let texto = args.slice(1).join(' ');

  // Crear mensaje falso como si lo mandara el número al bot (en privado)
  const fake = {
    key: {
      remoteJid: conn.user.jid, // Chat del bot (mensaje que recibe el bot)
      fromMe: false,
      id: conn.generateMessageTag(),
      participant: numero,
    },
    message: {
      conversation: texto
    },
    messageTimestamp: Math.floor(Date.now() / 1000),
      pushName: 'Desconocido' // Puedes cambiarlo a lo que quieras
  };

  // Mostrar el mensaje falso como notificación entrante
  conn.ev.emit('messages.upsert', {
    messages: [fake],
    type: 'notify'
  });

  m.reply('✅ Mensaje falso recibido simulado.');
};
handler.command = /^fake$/i;
export default handler;