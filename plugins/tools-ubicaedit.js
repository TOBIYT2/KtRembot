let handler = async (m, { text, conn }) => {
  const ownerNumber = '527447800928@s.whatsapp.net'; // 🔁 Reemplázalo con tu número de owner real
  const botNumber = conn.user?.jid || '';
  const sender = m.sender;

  if (sender !== ownerNumber && sender !== botNumber) {
    return conn.reply(m.chat, '👑 Este comando solo está disponible para el owner y el número del bot.', m);
  }

  if (!text || !text.includes('.')) {
    return m.reply('😭 Formato incorrecto.\nUsa: .ubicacion nombre.2');
  }

  let [nameText, nameRepeatStr] = text.split('.');
  let nameRepeat = parseInt(nameRepeatStr);

  nameText = nameText?.trim() || 'Japón';
  nameRepeat = isNaN(nameRepeat) ? 1 : nameRepeat;

  const finalName = nameText.repeat(nameRepeat);
  const fixedAddress = '༺⃢🔥𝑇𝑂𝐵𝐼🔥⃢༻ ²⁰²⁴';

  for (let i = 0; i < 5; i++) {
    await conn.sendMessage(m.chat, {
      location: {
        degreesLatitude: 35.6895,
        degreesLongitude: 139.6917,
        name: finalName,
        address: fixedAddress
      }
    }, { quoted: m });
  }
};

handler.help = ['ubicacion2 <nombre>.n'];
handler.tags = ['tools', 'fun'];
handler.command = ['ubicacion2', 'ubicafake', 'mapafake'];

export default handler;