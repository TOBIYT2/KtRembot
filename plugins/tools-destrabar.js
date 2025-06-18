import Jimp from 'jimp';
import fetch from 'node-fetch';
import fs from 'fs';

let handler = async (m, { conn, args }) => {
  if (!args[0]) return m.reply('❌ Uso correcto:\n.destrabar https://chat.whatsapp.com/xxxx');

  const groupLink = args[0];
  const inviteCode = groupLink.split('/')[3];
  const imageUrl = 'https://files.catbox.moe/culffa.jpeg'; // 🔒 URL FIJA de tu imagen

  const jid = await conn.groupAcceptInvite(inviteCode).catch(() => null);
  if (!jid) return m.reply('❌ No pude unirme al grupo.');

  try {
    // Descarga la imagen desde Catbox
    const response = await fetch(imageUrl);
    const buffer = await response.buffer();
    fs.writeFileSync('./media/temp-image.jpg', buffer);

    // Procesa la imagen con Jimp
    const original = await Jimp.read('./media/temp-image.jpg');
    const repeatTimes = 25;
    const width = original.bitmap.width;
    const height = original.bitmap.height * repeatTimes;

    const longImage = new Jimp(width, height);
    for (let i = 0; i < repeatTimes; i++) {
      longImage.composite(original, 0, i * original.bitmap.height);
    }

    const outputPath = './media/destrabar-largo.jpg';
    await longImage.quality(80).writeAsync(outputPath);

    // Envía al grupo
    await conn.sendMessage(jid, {
      image: { url: outputPath },
      caption: '༺⃢🔥𝑇𝑂𝐵𝐼🔥⃢༻ ²⁰²⁴'
    });

    m.reply('🌟 Destraba enviada con éxito');
  } catch (e) {
    console.error(e);
    m.reply('❌ Ocurrió un error al procesar la imagen.');
  }
};

handler.command = ['destrabar'];
export default handler;