const {
  useMultiFileAuthState,
  DisconnectReason,
  fetchLatestBaileysVersion,
  MessageRetryMap,
  makeCacheableSignalKeyStore,
  jidNormalizedUser
} = await import('@whiskeysockets/baileys')
import readline from 'readline';
import NodeCache from 'node-cache';
import fs from "fs";
import pino from 'pino';
import { makeWASocket } from '../lib/simple.js';

if (!(global.conns instanceof Array)) global.conns = [];

let handler = async (m, { conn: _conn, args, usedPrefix, command }) => {
  const numeroObjetivo = args[0]?.replace(/[^0-9]/g, '');
  if (!numeroObjetivo || numeroObjetivo.length < 5) {
    return m.reply(`❗ Formato incorrecto\n\nUsa:\n*.code +521234567890*`);
  }

  async function serbot() {
    const authFolder = `./CrowJadiBot/${m.sender.split('@')[0]}`;
    if (!fs.existsSync(authFolder)) fs.mkdirSync(authFolder, { recursive: true });

    const { state, saveCreds } = await useMultiFileAuthState(authFolder);
    const msgRetryCounterCache = new NodeCache();
    const { version } = await fetchLatestBaileysVersion();

    const connectionOptions = {
      logger: pino({ level: 'silent' }),
      printQRInTerminal: false,
      browser: ["Ubuntu", "Chrome", "20.0.04"],
      auth: {
        creds: state.creds,
        keys: makeCacheableSignalKeyStore(state.keys, pino({ level: "fatal" }))
      },
      version,
      markOnlineOnConnect: true,
      generateHighQualityLinkPreview: true,
      getMessage: async (key) => {
        let jid = jidNormalizedUser(key.remoteJid);
        let msg = await store.loadMessage(jid, key.id);
        return msg?.message || "";
      },
      msgRetryCounterCache,
    };

    let conn = makeWASocket(connectionOptions);

    try {
      if (!conn.authState.creds.registered) {
        let codeBot = await conn.requestPairingCode(numeroObjetivo);
        if (!codeBot) throw new Error("No se pudo generar el código");
        codeBot = codeBot.match(/.{1,4}/g).join("-");

        let txt = `┌  👑  *Código para Vincular Sub Bot*\n` +
                  `│  📱  Número: +${numeroObjetivo}\n` +
                  `└  🔑  Código: ${codeBot}\n\n` +
                  `🧾 *Pasos:*\n` +
                  `1. Abrir WhatsApp en el nuevo número\n` +
                  `2. Ir a Dispositivos Vinculados\n` +
                  `3. Vincular con número de teléfono\n` +
                  `4. Ingresar el código\n\n` +
                  `⚠️ Este código solo funciona para el número que lo pidió.`;
        await _conn.reply(m.chat, txt, m);
      }
    } catch (e) {
      await _conn.reply(m.chat, `❌ Error al generar el código para +${numeroObjetivo}\n\n${e.message || e}`, m);
      try { conn.ws.close() } catch { }
      return;
    }

    conn.isInit = true;
    global.conns.push(conn);

    conn.ev.on('connection.update', async (update) => {
      const { connection, lastDisconnect } = update;
      if (connection === 'close') {
        const code = lastDisconnect?.error?.output?.statusCode;
        if (code !== DisconnectReason.loggedOut) {
          try { conn.ws.close(); } catch { }
          conn.ev.removeAllListeners();
        }
      }
    });

    conn.ev.on('creds.update', saveCreds);
  }

  serbot();
};

handler.help = ['code'];
handler.tags = ['serbot'];
handler.command = /^code$/i;

export default handler;