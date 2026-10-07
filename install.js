
let deferredPrompt = null;

function isStandalone(){
  return window.matchMedia("(display-mode: standalone)").matches ||
         window.navigator.standalone === true;
}

function detectDevice(){
  const ua = navigator.userAgent || "";
  const p = navigator.platform || "";
  const ios = /iPhone|iPad|iPod/i.test(ua) || (p === "MacIntel" && navigator.maxTouchPoints > 1);
  if (ios) return "ios";
  if (/Android/i.test(ua)) return "android";
  if (/Windows/i.test(ua)) return "windows";
  if (/Macintosh|Mac OS X/i.test(ua)) return "mac";
  return "other";
}

function showGuide(title, steps){
  document.getElementById("guideTitle").textContent = title;
  const ol = document.getElementById("guideSteps");
  ol.innerHTML = "";
  steps.forEach(x => {
    const li = document.createElement("li");
    li.textContent = x;
    ol.appendChild(li);
  });
  document.getElementById("guide").hidden = false;
}

async function installApp(){
  if (isStandalone()) {
    alert("ERH M&E PM đã được cài trên thiết bị này.");
    return;
  }

  if (deferredPrompt) {
    deferredPrompt.prompt();
    await deferredPrompt.userChoice;
    deferredPrompt = null;
    return;
  }

  const d = detectDevice();

  if (d === "ios") {
    showGuide("Cài trên iPhone / iPad", [
      "Mở trang bằng Safari.",
      "Bấm nút Chia sẻ.",
      "Chọn “Thêm vào Màn hình chính”.",
      "Bấm “Thêm”."
    ]);
  } else if (d === "android") {
    showGuide("Cài trên Android", [
      "Mở trang bằng Chrome hoặc Samsung Internet.",
      "Mở menu trình duyệt.",
      "Chọn “Cài đặt ứng dụng” hoặc “Thêm vào Màn hình chính”.",
      "Xác nhận cài đặt."
    ]);
  } else {
    showGuide("Cài trên máy tính", [
      "Mở trang bằng Chrome hoặc Microsoft Edge.",
      "Bấm biểu tượng Cài đặt ở thanh địa chỉ hoặc menu trình duyệt.",
      "Chọn “Cài đặt ERH M&E PM”.",
      "Xác nhận cài đặt."
    ]);
  }
}

window.addEventListener("beforeinstallprompt", e => {
  e.preventDefault();
  deferredPrompt = e;
  const btn = document.getElementById("installBtn");
  if (btn) btn.textContent = "CÀI ĐẶT ICON";
});

window.addEventListener("appinstalled", () => {
  const btn = document.getElementById("installBtn");
  if (btn) {
    btn.textContent = "ĐÃ CÀI ỨNG DỤNG";
    btn.disabled = true;
  }
});

document.addEventListener("DOMContentLoaded", () => {
  const names = {ios:"iPhone / iPad", android:"Android", windows:"Windows", mac:"macOS", other:"Thiết bị hiện tại"};
  document.getElementById("deviceInfo").textContent = "Đã nhận diện: " + names[detectDevice()];
  if (isStandalone()) {
    const btn = document.getElementById("installBtn");
    btn.textContent = "ĐÃ CÀI ỨNG DỤNG";
    btn.disabled = true;
  }
  document.getElementById("installBtn").addEventListener("click", installApp);
  document.getElementById("closeGuide").addEventListener("click", () => {
    document.getElementById("guide").hidden = true;
  });
});
