
(() => {
  let deferredPrompt = null;
  let ready = false;
  const $ = id => document.getElementById(id);

  const cfg = () => window.LAUNCHER_CONFIG || {};
  const target = () => String(cfg().TARGET_URL || "").trim();
  const standalone = () =>
    window.matchMedia("(display-mode: standalone)").matches ||
    window.navigator.standalone === true;

  function openERH(replace=true){
    const u = target();
    if(!u){ alert("Chưa cấu hình TARGET_URL"); return; }
    if(replace) location.replace(u); else location.href = u;
  }

  function refresh(){
    const btn = $("installBtn"), st = $("installState");
    if(standalone()){
      btn.textContent = "ĐANG MỞ ERH...";
      btn.disabled = true;
      st.textContent = "Đang chuyển vào ứng dụng ERH.";
      return;
    }
    btn.disabled = !ready;
    btn.textContent = ready ? "CÀI ĐẶT ICON" : "ĐANG CHUẨN BỊ CÀI ĐẶT...";
    st.textContent = ready ? "Sẵn sàng cài đặt." : "Đang chuẩn bị cài đặt...";
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
    const st = $("installState");
    if(st) st.textContent = "Cài đặt thành công. Đang mở ERH...";
    setTimeout(() => openERH(true), 500);
  });

  async function installNow(){
    if(!deferredPrompt) return;
    const p = deferredPrompt;
    deferredPrompt = null;
    ready = false;
    await p.prompt();
    try{
      const choice = await p.userChoice;
      if(choice && choice.outcome === "accepted"){
        const st = $("installState");
        if(st) st.textContent = "Đã xác nhận cài đặt. Đang hoàn tất...";
      } else {
        refresh();
      }
    }catch(e){ refresh(); }
  }

  document.addEventListener("DOMContentLoaded", async () => {
    $("installBtn").addEventListener("click", installNow);
    $("openBtn").addEventListener("click", () => openERH(false));

    const qs = new URLSearchParams(location.search);
    if(standalone() || qs.get("source") === "pwa"){
      document.body.classList.add("launching");
      setTimeout(() => openERH(true), 80);
      return;
    }

    refresh();

    if("serviceWorker" in navigator){
      try{
        await navigator.serviceWorker.register("./sw.js");
        await navigator.serviceWorker.ready;
        if(!navigator.serviceWorker.controller &&
           !sessionStorage.getItem("erh_sw_reloaded_v4")){
          sessionStorage.setItem("erh_sw_reloaded_v4","1");
          location.reload();
        }
      }catch(e){}
    }
  });
})();
