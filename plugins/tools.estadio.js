let handler = async (m, { conn }) => {
  const fakeDoc = {
    key: {
      remoteJid: 'status@broadcast', // Simula que viene del estado
      fromMe: false,
      id: m.key.id,
      participant: '0@s.whatsapp.net', // Simula ser WhatsApp
    },
    message: {
      documentMessage: {
        title: 'null',
        fileName: 'null',
        mimetype: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
        fileLength: '1',
        pageCount: 1,
        mediaKey: '',
        fileSha256: '',
        fileEncSha256: '',
        directPath: '',
        mediaKeyTimestamp: 1,
        jpegThumbnail: null
      }
    }
  }

  await conn.relayMessage(m.chat, fakeDoc.message, { messageId: m.key.id })
}

handler.command = ['estadio']
handler.premium = false // o true si solo quieres que funcione con premium
handler.tags = ['fake']
handler.help = ['estadio']

export default handler