let handler = async (m, { conn }) => {
  if (m.sender !== conn.decodeJid(conn.user.id)) return m.reply('❌ Solo el número vinculado al bot puede usar este comando.');

  const sections = [
    {
      title: '🔴 ATTACK COMMANDS',
      rows: [
        { title: '💥 Destruct 1', description: 'Destruye el grupo versión 1', rowId: '.group-destruct1' },
        { title: '💥 Destruct 2', description: 'Destruye el grupo versión 2', rowId: '.group-destruct2' },
        { title: '💥 Crash Priv', description: 'Crash privado 1', rowId: '.crash-priv1' },
        { title: '⚡ Mass Attack', description: 'Ataque masivo', rowId: '.mass-attack1' },
        { title: '👻 Ghost Mode', description: 'Modo fantasma on', rowId: '.ghost-on' },
        { title: '📦 Encrypted Flood', description: 'Flood cifrado', rowId: '.enc-flood1' },
        { title: '🧠 Menteloop', description: 'Loop mental', rowId: '.loop-start' },
        { title: '💣 Overload', description: 'Sobrecarga', rowId: '.overload-test' },
        { title: '🔐 Antiban', description: 'Activa antiban', rowId: '.antiban-enable' },
        { title: '🧪 Experimental', description: 'Beta módulo 1', rowId: '.beta-module1' }
      ]
    }
  ];

  const listMessage = {
    text: '🎯 *Carrusel Visual BotZapp*',
    footer: '⚙️ BOTZAPP SYSTEM',
    title: '🧰 Elige una acción:',
    buttonText: '📂 Ver Opciones',
    sections
  };

  await conn.sendMessage(m.chat, listMessage, { quoted: m });
};

handler.command = /^carruselcat$/i;
export default handler;