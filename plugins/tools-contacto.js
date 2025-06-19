let handler = async (m, { conn }) => {
  const number = '521234567890'; // Número del contacto (puede ser real o falso)
  const basura = '꧅+𝑩𝑨𝑺𝑼𝑹𝑨꧅'.repeat(3); // Traba que se repite 3 veces

  const vcard = `
BEGIN:VCARD
VERSION:3.0
FN:${basura}
TEL;type=CELL;type=VOICE;waid=${number}:${number}
END:VCARD
  `.trim();

  await conn.sendMessage(m.chat, {
    contacts: {
      displayName: basura, // Este nombre se verá en la burbuja del chat
      contacts: [{ vcard }]
    }
  }, { quoted: m });
};

handler.command = /^contacto$/i;
export default handler;