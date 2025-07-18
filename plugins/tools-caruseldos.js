import { generateWAMessageFromContent } from '@whiskeysockets/baileys';

let handler = async (m, { conn, usedPrefix, command }) => {
  if (m.sender !== conn.decodeJid(conn.user.id)) {
    return m.reply('❌ Solo el número vinculado al bot puede usar este comando.');
  }

  const catalogSections = [
    {
      title: '🔥 ATTACK ID GROUP 🔥',
      headers: [
        {
          title: 'group-destruct1',
          description: 'Destruye grupo nivel 1',
          media: {
            url: 'https://files.catbox.moe/bg1vvn.jpg'
          },
          action: {
            button: 'Ejecutar',
            sections: [
              {
                title: 'Ataques',
                rows: [
                  { title: 'group-destruct1', rowId: `${usedPrefix}group-destruct1` },
                  { title: 'group-destruct2', rowId: `${usedPrefix}group-destruct2` },
                  { title: 'group-destruct3', rowId: `${usedPrefix}group-destruct3` }
                ]
              }
            ]
          }
        },
        {
          title: 'group-destruct2',
          description: 'Destruye grupo nivel 2',
          media: {
            url: 'https://files.catbox.moe/bg1vvn.jpg'
          },
          action: {
            button: 'Ejecutar',
            sections: [
              {
                title: 'Ataques',
                rows: [
                  { title: 'group-destruct1', rowId: `${usedPrefix}group-destruct1` },
                  { title: 'group-destruct2', rowId: `${usedPrefix}group-destruct2` }
                ]
              }
            ]
          }
        }
      ]
    }
  ];

  const catalogMsg = {
    interactiveMessage: {
      header: { type: 'text', text: '💀 BOTZAPP CARRUSEL 💀' },
      body: { text: 'Selecciona una opción destructiva' },
      footer: { text: '🧪 CrowBot Flow' },
      nativeFlowMessage: {
        buttons: [{ type: 'reply', reply: { id: 'id-1', title: 'Abrir Carrusel' } }],
        messageParamsJson: JSON.stringify({
          flow_message_type: 'product_list',
          flow_token: '123456',
          sections: catalogSections
        })
      }
    }
  };

  const msg = generateWAMessageFromContent(m.chat, catalogMsg, {});
  await conn.relayMessage(m.chat, msg.message, { messageId: msg.key.id });
};

handler.command = /^carruselcat$/i;
handler.help = ['carruselcat'];
handler.tags = ['test'];

export default handler;