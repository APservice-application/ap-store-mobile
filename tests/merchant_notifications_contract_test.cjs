const fs = require('fs');
const assert = require('assert');

const page = fs.readFileSync('merchant/notifications.html', 'utf8');
const app = fs.readFileSync('merchant/merchant-app.js', 'utf8');

assert.match(page, /data-page="notifications"/, 'หน้าร้านต้องประกาศ data-page notifications');
assert.match(page, /merchant-app\.js/, 'หน้าต้องโหลด merchant-app.js');
assert.match(app, /async function notifications/, 'ต้องมีฟังก์ชัน notifications');
assert.match(app, /mobile_notifications\?select=/, 'ต้องอ่านกล่องข้อความของร้าน');
assert.match(app, /startBackgroundSync/, 'ต้องรีเฟรชอัตโนมัติโดยไม่ต้องกดรีเฟรชเอง');
assert.match(app, /intervalMs: 30_000/, 'รอบรีเฟรชต้อง 30 วินาทีเท่าฝั่งลูกค้า/ไรเดอร์');
assert.match(app, /data-mark-merchant-notification/, 'ต้องทำเครื่องหมายอ่านแล้วได้');
assert.match(app, /notifications, settings/, 'router ต้องรู้จักหน้า notifications');
assert.match(app, /\['notifications', 'แจ้งเตือน'\]/, 'เมนูร้านต้องมีลิงก์แจ้งเตือน');

console.log('merchant notifications contract: PASS');
