// Susun Khotbah — Worker situs (2026-10-19).
// fetch(): sajikan file statis apa adanya (sama seperti sebelumnya, "assets only").
// scheduled(): sekali sehari "menyentuh" Supabase supaya project gratis tidak
// di-pause otomatis (pause terjadi setelah ~7 hari tanpa aktivitas; 2026-10-19
// project sempat INACTIVE). Pengganti workflow GitHub keepalive.yml, yang tidak
// bisa di-push karena token git tidak punya scope "workflow".
// Key di bawah = publishable/anon key (aman di publik — RLS yang menjaga data).
const SB_URL = "https://eilsoorniitbjcupzsci.supabase.co";
const SB_KEY = "sb_publishable_plxpWUiTL7VeIqhV1iYIzQ_shu05gdD";

export default {
  async fetch(request, env) {
    return env.ASSETS.fetch(request);
  },
  async scheduled(event, env, ctx) {
    ctx.waitUntil(
      fetch(SB_URL + "/rest/v1/sermons?select=id&limit=1", { headers: { apikey: SB_KEY } })
        .then((r) => console.log("keep-alive Supabase:", r.status))
        .catch((e) => console.log("keep-alive gagal:", e && e.message))
    );
  },
};
