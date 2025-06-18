let handler = async (m, { conn }) => {
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
    }
  }

  await conn.relayMessage(m.chat, fakeDoc, { messageId: m.key.id, messageKey: fakeKey })
}

handler.command = ['estadio']
handler.help = ['estadio']
handler.tags = ['fake']
handler.premium = false // o true si solo premium

export default handler