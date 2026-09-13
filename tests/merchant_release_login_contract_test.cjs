const assert = require('assert');
const fs = require('fs');
const path = require('path');

const app = fs.readFileSync(path.join(__dirname, '../merchant/merchant-app.js'), 'utf8');

assert.ok(app.includes('กรุณากรอกชื่อผู้ใช้และรหัสผ่านให้ครบ'), 'Merchant Login ต้องตรวจข้อมูลก่อน sign-in');
assert.ok(app.includes('ชื่อผู้ใช้หรือรหัสผ่านไม่ถูกต้อง กรุณาตรวจสอบแล้วลองใหม่'), 'Merchant Login ต้อง map credential error เป็นภาษาไทย');
assert.ok(app.includes('เข้าสู่ระบบ Merchant ไม่สำเร็จ กรุณาลองใหม่อีกครั้ง'), 'Merchant Login ต้องมีข้อความ fallback ปลอดภัย');
assert.ok(!app.includes('ตาม RLS ปัจจุบัน'), 'หน้าร้านค้าต้องไม่แสดงศัพท์ implementation');

console.log('Merchant release-login contract: PASS');
