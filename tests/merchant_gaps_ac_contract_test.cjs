const fs = require('fs');
const assert = require('assert');

const app = fs.readFileSync('merchant/merchant-app.js', 'utf8');
assert.match(app, /const canRequest = !openRequest && available > 0/, 'ต้องคำนวณสิทธิ์ยื่นคำขอ');
assert.match(app, /ยื่นคำขอได้เมื่อมียอดพร้อมถอนและไม่มีคำขอค้าง/, 'ฟอร์มถอนต้องบอกเหตุผลตอนกดไม่ได้');
assert.match(app, /id="passwordForm"/, 'ตั้งค่าต้องมีฟอร์มเปลี่ยนรหัสผ่าน');
assert.match(app, /M\.auth\.updatePassword\(next\)/, 'ต้องเรียก updatePassword');

const mpa = fs.readFileSync('shared/ap-service-mpa.js', 'utf8');
assert.match(mpa, /async function updatePassword\(password\)/, 'MPA ต้องมี updatePassword');
assert.match(mpa, /auth\/v1\/user/, 'ต้องยิง Auth API โดยตรง');
assert.match(mpa, /updatePassword, signOut/, 'ต้อง export updatePassword');

console.log('merchant gaps A+C contract: PASS');
