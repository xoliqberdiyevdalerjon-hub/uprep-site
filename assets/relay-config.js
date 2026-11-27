/* Uniroad feedback relay settings (Cloudflare Worker -> Telegram bot).
   Only these two lines change when the Worker is created or moved:
     url    - the Worker address, e.g. https://uprep-feedback.<your-subdomain>.workers.dev
     appKey - must be EXACTLY the same as the APP_KEY secret in the Worker settings.
   Empty url = the relay is off and the site falls back to "copy and send in Telegram".

   Note: this is a static website, so everything in this file is visible to anyone who opens the
   page source. appKey is not a password: it only stops random bots that find the Worker URL.
   The real secrets (BOT_TOKEN, CHAT_ID) live only in the Worker. If spam ever gets through,
   generate a new key, put it here and in the Worker, and redeploy both. */
window.UPREP_RELAY = {
  url: "https://wild-fire-9eb2prep-feedbackprep-feedback.xoliqberdiyevdalerjon.workers.dev",
  appKey: "pJBaGKvnMu7IQiTQN0ekW-tC0xC1luCZEBdTZRKFs_g",
  appName: "Uniroad",
  appVersion: "2026.11.26",
  timeoutMs: 18000
};
