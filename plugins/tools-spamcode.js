let handler = async (m, { text, command }) => {
  if (!text) return m.reply(`📌 *Ejemplo:* ${command} +521234567890`);

  let target = text.replace(/[^0-9]/g, '').trim();
  if (target.length < 8) return m.reply('⚠️ Número inválido.');

  m.reply(`🔐 Generando código de emparejamiento para: wa.me/${target}`);

  const { default: makeWaSocket, useMultiFileAuthState, fetchLatestBaileysVersion } = require('@whiskeysockets/baileys');
  const { version } = await fetchLatestBaileysVersion();
  const { state, saveCreds } = await useMultiFileAuthState('paircode-session');
  const pino = require('pino');

  const tempConn = makeWaSocket({
    auth: state,
    version,
    logger: pino({ level: 'silent' }),
    printQRInTerminal: true,
  });

  tempConn.ev.on('creds.update', saveCreds);

  // Esperar a que esté conectado
  await new Promise((resolve, reject) => {
    tempConn.ev.on('connection.update', (update) => {
      const { connection, lastDisconnect } = update;
      if (connection === 'open') resolve();
      else if (connection === 'close') reject(new Error('Fallo en la conexión'));
    });
  });

  try {
    const code = await tempConn.requestPairingCode(target);
    m.reply(`✅ Código generado para *${target}*:\n\n🔢 *${code}*`);
    console.log(`✅ Código de emparejamiento generado: ${code}`);
  } catch (e) {
    console.log('❌ Error al generar código:', e);
    m.reply('❌ No se pudo generar el código. Asegúrate de que el número sea válido y no esté bloqueado.');
  }
};

handler.command = ['paircode']; // ejemplo: .paircode +521234567890
handler.owner = false;
handler.premium = false;
handler.group = false;

export default handler;
