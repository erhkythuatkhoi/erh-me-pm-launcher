ERH ICON LAUNCHER - MODULE RIÊNG

Mục đích:
- Không sửa app ERH KỸ THUẬT KHỐI – M&E PM.
- Dùng logo/icon riêng để cài ra màn hình điện thoại.
- Khi link Web App thay đổi, chỉ sửa 1 dòng TARGET_URL.

CÁCH ĐỔI LINK:
1. Mở file launcher-config.js
2. Tìm TARGET_URL
3. Thay link mới
4. Lưu / upload lại
5. Không cần sửa index.html, manifest.json hay sw.js

LƯU Ý:
- Module này độc lập với mã nguồn ERH.
- Do TARGET_URL là domain script.google.com, một số thiết bị có thể mở URL đích bằng trình duyệt khi chuyển sang domain khác. Đây là giới hạn PWA/scope của trình duyệt.
