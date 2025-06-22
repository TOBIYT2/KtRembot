process.env['NODE_TLS_REJECT_UNAUTHORIZED'] = '1';
import './config.js';
import { createRequire } from 'module';
import path, { join } from 'path';
import { fileURLToPath, pathToFileURL } from 'url';
import fs, { readdirSync, statSync, existsSync, mkdirSync } from 'fs';
import yargs from 'yargs';
import lodash from 'lodash';
import chalk from 'chalk';
import Pino from 'pino';
import readline from 'readline';
import NodeCache from 'node-cache';
import { fetchLatestBaileysVersion, useMultiFileAuthState, makeCacheableSignalKeyStore, jidNormalizedUser, DisconnectReason } from '@whiskeysockets/baileys';
import { Low, JSONFile } from 'lowdb';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const sessionName = process.argv[2] || 'session-default';
const rutaJadiBot = join(__dirname, 'CrowJadiBot');
const sessionPath = join(__dirname, sessionName);
const { chain } = lodash;
const PORT = process.env.PORT || 3000;

if (!existsSync(sessionPath)) mkdirSync(sessionPath, { recursive: true });
if (!existsSync(rutaJadiBot)) mkdirSync(rutaJadiBot, { recursive: true });

// Base de datos general
const db = new Low(new JSONFile('database.json'));
global.db = db;
global.loadDatabase = async () => {
  if (db.data) return; // ya cargada
  await db.read().catch(console.error);
  db.data = {
    users: {},
    chats: {},
    stats: {},
    msgs: {},
    sticker: {},
    settings: {},
    ...(db.data || {}),
  };
  db.chain = chain(db.data);
};
await global.loadDatabase();

// Base ChatGPT
const chatgpt = new Low(new JSONFile(join(__dirname, 'db/chatgpt.json')));
global.chatgpt = chatgpt;
global.loadChatgptDB = async () => {
  if (chatgpt.data) return;
  await chatgpt.read().catch(console.error);
  chatgpt.data = {
    users: {},
    ...(chatgpt.data || {}),
  };
  chatgpt.chain = chain(chatgpt.data);
};
await global.loadChatgptDB();

const rl = readline.createInterface({ input: process.stdin, output: process.stdout, terminal: true });
const question = (text) => new Promise(res => rl.question(text, answer => res(answer.trim())));

const { state, saveCreds } = await useMultiFileAuthState(sessionName);
const { version } = await fetchLatestBaileysVersion();

global.conn = makeWASocket({
  version,
  logger: Pino({ level: 'silent' }),
  auth: {
    creds: state.creds,
    keys: makeCacheableSignalKeyStore(state.keys, Pino({ level: 'fatal' })),
  },
  browser: ['ADO BOT', 'Edge', '20.0.04'],
  printQRInTerminal: true,
  markOnlineOnConnect: true,
  msgRetryCounterCache: new NodeCache(),
  getMessage: async (key) => (await global.db.chain.get('msgs').get(key.id).value())?.message || '',
});

global.conn.ev.on('connection.update', async ({ connection, lastDisconnect }) => {
  if (connection === 'open') console.log(chalk.green('✅ Bot conectado'));
  else if (connection === 'close') {
    const code = new Boom(lastDisconnect?.error)?.output?.statusCode;
    if (code !== DisconnectReason.loggedOut) {
      console.log(chalk.yellow('⚠️ Reintentando conexión...'));
      // Aquí deberías tener una función startBot o similar para reconectar
    } else {
      console.log(chalk.red('❌ Sesión cerrada, elimina la carpeta y vuelve a vincular.'));
    }
  }
});

global.conn.ev.on('creds.update', saveCreds);

// Carga plugins (igual que tú)

// Conexión SubBots (mejor guardar y escuchar)
global.subBots = [];
async function connectSubBots() {
  const folders = readdirSync(rutaJadiBot).filter(f => statSync(join(rutaJadiBot, f)).isDirectory());
  for (const folder of folders) {
    const authPath = join(rutaJadiBot, folder);
    if (existsSync(join(authPath, 'creds.json'))) {
      const { state, saveCreds } = await useMultiFileAuthState(authPath);
      const sock = makeWASocket({
        version,
        logger: Pino({ level: 'silent' }),
        auth: {
          creds: state.creds,
          keys: makeCacheableSignalKeyStore(state.keys, Pino({ level: 'fatal' })),
        },
        browser: ['ADO SUBBOT', 'Edge', '20.0.04'],
        printQRInTerminal: false,
        markOnlineOnConnect: true,
        msgRetryCounterCache: new NodeCache(),
        getMessage: async (key) => (await global.db.chain.get('msgs').get(key.id).value())?.message || '',
      });
      sock.ev.on('connection.update', update => {
        // Similar manejo de conexión para subbots
      });
      sock.ev.on('creds.update', saveCreds);
      global.subBots.push(sock);
      console.log(chalk.green(`🟢 Subbot ${folder} conectado`));
    }
  }
}
await connectSubBots();

process.on('uncaughtException', console.error);
console.log(chalk.blueBright('📦 Bot iniciado'));