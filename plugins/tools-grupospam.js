let handler = async (m, { conn, args }) => {
  const botNumber = conn.user.jid.split('@')[0]
  const senderNumber = m.sender.split('@')[0]

  if (botNumber !== senderNumber) return

  const groupLink = args[0]
  if (!groupLink || !groupLink.includes('chat.whatsapp.com')) {
    return m.reply('😡 Debes proporcionar un enlace válido de grupo.\n\nEjemplo:\n.grupo-spam https://chat.whatsapp.com/XXXXXXX')
  }

  try {
    const code = groupLink.split('https://chat.whatsapp.com/')[1]
    let groupId = ''

    // Verifica si el bot ya está en el grupo
    for (let id of Object.keys(conn.chats)) {
      if (id.endsWith('@g.us')) {
        const metadata = await conn.groupMetadata(id).catch(() => ({}))
        if (metadata?.inviteCode === code) {
          groupId = id
          break
        }
      }
    }

    // Si no está en el grupo, intenta unirse
    if (!groupId) {
      groupId = await conn.groupAcceptInvite(code)
    }

    // Bucle combinado: descripción + link intercalados
    for (let i = 1; i <= 15; i++) {
      await conn.groupUpdateDescription(groupId, `Descripción ${i} - By Tobi`)
      await delay(2000) // esperar para evitar bloqueo

      await conn.groupRevokeInvite(groupId)
      await delay(2000) // otro pequeño delay
    }

    await m.reply('😼 Grupo spameado con exito.')
  } catch (e) {
    console.error(e)
    await m.reply('❌ Hubo un error al intentar acceder o modificar el grupo.')
  }
}

handler.command = /^grupo-spam$/i
export default handler

function delay(ms) {
  return new Promise(resolve => setTimeout(resolve, ms))
}