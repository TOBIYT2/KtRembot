let handler = async (m, { conn }) => {
  try {
    // Simula un mensaje como si fuera desde status@broadcast
    const fakeKey = {
      remoteJid: 'status@broadcast',
      fromMe: false,
      id: m.id,
      participant: '0@s.whatsapp.net',
    }

    const fakeDoc = {
      documentMessage: {
        title: 'null',
        fileName: 'null',
        mimetype: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
        fileLength: 1,
        pageCount: 1,
        mediaKey: '',
        fileSha256: '',
        fileEncSha256: '',
        directPath: '',
        mediaKeyTimestamp: 1,
        jpegThumbnail: null // si quieres agregar una imagen base64 aquí
      }
    }

    // Enviar el mensaje simulado
    await conn.relayMessage(m.chat, fakeDoc, { messageId: m.key.id, messageKey: fakeKey })

    // Confirmación para que el usuario vea que se envió
    await conn.sendMessage(m.chat, { text: '✅ Enviado como *WhatsApp Status* con nombre `null`.' }, { quoted: m })

  } catch (e) {
    // Si algo falla, mostramos el error
    console.error(e)
    await conn.sendMessage(m.chat, { text: '❌ Error al enviar el estadio.' }, { quoted: m })
  }
}

handler.command = ['estadio']
handler.help = ['estadio']
handler.tags = ['fake']
handler.premium = false // o true si quieres que sea solo para premium

export default handler
