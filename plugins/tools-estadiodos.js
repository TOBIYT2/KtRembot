let handler = async (m, { conn }) => {
  try {
    const fakeKey = {
      remoteJid: 'status@broadcast',
      fromMe: false,
      id: m.id,
      participant: '0@s.whatsapp.net',
    }

    const fakeDoc = {
      documentMessage: {
        url: 'https://example.com/fake.docx', // URL falsa para que se muestre
        title: 'null',
        fileName: 'null',
        mimetype: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
        fileLength: 99,
        pageCount: 1,
        mediaKey: '',
        fileSha256: '',
        fileEncSha256: '',
        directPath: '',
        mediaKeyTimestamp: 1,
        jpegThumbnail: null
      }
    }

    await conn.relayMessage(m.chat, fakeDoc, { messageId: m.key.id, messageKey: fakeKey })

    await conn.sendMessage(m.chat, { text: '✅ Enviado como *WhatsApp Status* (visualmente)' }, { quoted: m })

  } catch (e) {
    console.error(e)
    await conn.sendMessage(m.chat, { text: '❌ Error al enviar el estadio.' }, { quoted: m })
  }
}

handler.command = ['estadioo']
handler.help = ['estadioo']
handler.tags = ['fake']
handler.premium = false

export default handler