ERH ICON LAUNCHER V9
FIX CHÍNH:
- Sau khi đăng ký Service Worker, kiểm tra navigator.serviceWorker.controller.
- Nếu chưa control trang, tự reload đúng 1 lần.
- beforeinstallprompt được bắt ngay trong HEAD.
- Không chạy vòng qua nhiều manifest giả.
- Nếu Chrome có nút "Mở trong ứng dụng", app có thể đã được cài nên Chrome không phát beforeinstallprompt.
