const fs = require('fs');
const assert = require('assert');

const mod = fs.readFileSync('merchant/order-chat.js', 'utf8');
assert.match(mod, /APOrderChat/, 'ต้องมีโมดูล APOrderChat');
assert.match(mod, /function mount/, 'ต้องมี mount');
assert.match(mod, /function openDialog/, 'ต้องมี openDialog');
assert.match(mod, /MediaRecorder/, 'ต้องอัดเสียงได้');
assert.match(mod, /chat-voice/, 'เสียงต้องเก็บใน bucket chat-voice');
assert.match(mod, /setInterval\(load/, 'ต้องโหลดข้อความอัตโนมัติ');
assert.match(mod, /ลบอัตโนมัติ/, 'ต้องบอกผู้ใช้ว่าประวัติลบอัตโนมัติ');

const app = fs.readFileSync('merchant/merchant-app.js', 'utf8');
assert.match(app, /APOrderChat\?\.openDialog\(\{ M, orderId: button\.dataset\.chatOrder, selfRole: 'store_owner'/, 'การ์ดออร์เดอร์ต้องเปิดแชท');
assert.match(app, /data-chat-order/, 'การ์ดออร์เดอร์ต้องมีปุ่มแชท');

const html = fs.readFileSync('merchant/orders.html', 'utf8');
assert.match(html, /order-chat\.js/, 'orders.html ต้องโหลดโมดูลแชท');

console.log('merchant order chat UI contract: PASS');
