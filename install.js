
(() => {
  let deferredPrompt = null;
  let ready = false;
  const $ = id => document.getElementById(id);

  const standalone = () =>
    window.matchMedia("(display-mode: standalone)").matches ||
    window.navigator.standalone === true;

  function refresh() {
    const btn = $("installBtn");
    const st = $("installState");
    if (standalone()) {
      btn.textContent = "ĐÃ CÀI ỨNG DỤNG";
      btn.disabled = true;
      st.textContent = "Ứng dụng đã được cài.";
      return;
    }
    btn.disabled = !ready;
    btn.textContent = ready ? "CÀI ĐẶT ICON" : "ĐANG CHUẨN BỊ CÀI ĐẶT...";
    st.textContent = ready ? "Sẵn sàng cài đặt." : "Đang chờ trình duyệt xác nhận ứng dụng có thể cài.";
  }

  window.addEventListener("beforeinstallprompt", e => {
    e.preventDefault();
    deferredPrompt = e;
    ready = true;
    refresh();
  });

  window.addEventListener("appinstalled", () => {
    deferredPrompt = null;
    ready = false;
    refresh();
  });

  async function installNow() {
    if (!deferredPrompt) return;
    const p = deferredPrompt;
    deferredPrompt = null;
    ready = false;
    await p.prompt();
    try { await p.userChoice; } catch(e) {}
    refresh();
  }

  document.addEventListener("DOMContentLoaded", async () => {
    $("installBtn").addEventListener("click", installNow);
    refresh();

    if ("serviceWorker" in navigator) {
      try {
        await navigator.serviceWorker.register("./sw.js");
        await navigator.serviceWorker.ready;
        if (!navigator.serviceWorker.controller &&
            !sessionStorage.getItem("erh_sw_reloaded")) {
          sessionStorage.setItem("erh_sw_reloaded", "1");
          location.reload();
        }
      } catch(e) {}
    }
  });
})();
