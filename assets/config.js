/* Uniroad platform settings. Fill these in once the accounts exist (see README).
   Empty values = "tayyorlanmoqda" mode: login and payment show a "coming soon" note. */
window.UNIROAD_CONFIG = {
  supabaseUrl: "",        // e.g. https://abcd1234.supabase.co
  supabaseAnonKey: "",    // Supabase > Project Settings > API > anon public key (public by design)
  paymentLink: "",        // Stripe Payment Link, e.g. https://buy.stripe.com/xxxx
  googleLogin: false,     // true after Google is enabled in Supabase Auth
  openAll: true           // true = hamma bosqichlar hammaga ochiq (vaqtincha). To'lovni yoqishda false qiling.
};
