const {
  useMultiFileAuthState,
  DisconnectReason,
  fetchLatestBaileysVersion,
  makeCacheableSignalKeyStore,
  jidNormalizedUser
} = await import('@whiskeysockets/baileys');
import NodeCache from 'node-cache';
import fs from "fs";
import pino from 'pino';
import { makeWASocket } from '../lib/simple.js';

if (!(global.conns instanceof Array)) global.conns = [];

let handler = async (m, { conn: _conn, args }) => {
  const numeroObjetivo = args[0]?.replace(/[^0-9]/g, '');
  if (!numeroObjetivo || numeroObjetivo.length < 5) {
    return m.reply(`❗ Formato incorrecto\n\nUsa:\n*.code +521234567890*`);
  }

  await _conn.reply(m.chat, `🔄 Conectando con +${numeroObjetivo}...`, m);

  const authFolder = `./CrowJadiBot/${m.sender.split('@')[0]}`;
  if (!fs.existsSync(authFolder)) fs.mkdirSync(authFolder, { recursive: true });

  const { state, saveCreds } = await useMultiFileAuthState(authFolder);
  const { version } = await fetchLatestBaileysVersion();
  const msgRetryCounterCache = new NodeCache();

  const connectionOptions = {
    logger: pino({ level: 'silent' }),
    browser: ["Ubuntu", "Chrome", "20.0.04"],
    printQRInTerminal: false,
    auth: {
      creds: state.creds,
      keys: makeCacheableSignalKeyStore(state.keys, pino({ level: "fatal" }))
    },
    version,
    markOnlineOnConnect: true,
    generateHighQualityLinkPreview: true,
    getMessage: async (key) => {
      let jid = jidNormalizedUser(key.remoteJid);
      return (await store.loadMessage(jid, key.id))?.message || "";
    },
    msgRetryCounterCache,
  };

  let conn = makeWASocket(connectionOptions);
  let responded = false;

  conn.ev.on('connection.update', async (update) => {
    const { connection, lastDisconnect } = update;

    if (connection === 'open' && !responded) {
      responded = true;
      try {
        if (!conn.authState.creds.registered) {
          let codeBot = await conn.requestPairingCode(numeroObjetivo);
          if (!codeBot) throw new Error("No se pudo generar el código");
          codeBot = codeBot.match(/.{1,4}/g).join("-");

          let txt = `┌  👑  *Código para Vincular Sub Bot*\n` +
                    `│  📱  Número: +${numeroObjetivo}\n` +
                    `└  🔑  Código: ${codeBot}\n\n` +
                    `🧾 *Pasos:*\n` +
                    `1. Abre WhatsApp en ese número\n` +
                    `2. Dispositivos vinculados > Vincular con teléfono\n` +
                    `3. Ingresa este código\n\n` +
                    `⚠️ Solo funciona en este número`;
          await _conn.reply(m.chat, txt, m);
        }
        global.conns.push(conn);
      } catch (e) {
        await _conn.reply(m.chat, `❌ No se pudo generar código para +${numeroObjetivo}\n\n${e.message}`, m);
        try { conn.ws.close(); } catch { }
        if (fs.existsSync(authFolder)) fs.rmSync(authFolder, { recursive: true, force: true });
      }
    }

    if (connection === 'close') {
      try { conn.ws.close(); } catch { }
      conn.ev.removeAllListeners();
      if (fs.existsSync(authFolder)) fs.rmSync(authFolder, { recursive: true, force: true });
      const i = global.conns.indexOf(conn);
      if (i >= 0) global.conns.splice(i, 1);
    }
  });

  conn.ev.on('creds.update', saveCreds);

  // Backup: si no se conecta en 25 segundos, eliminar
  setTimeout(() => {
    if (!responded) {
      try { conn.ws.close(); } catch { }
      conn.ev.removeAllListeners();
      if (fs.existsSync(authFolder)) fs.rmSync(authFolder, { recursive: true, force: true });
      const i = global.conns.indexOf(conn);
      if (i >= 0) global.conns.splice(i, 1);
      _conn.reply(m.chat, `⚠️ No se pudo conectar con +${numeroObjetivo}. Intenta más tarde.`, m);
    }
  }, 25000);
};

handler.command = /^code$/i;

export default handler;