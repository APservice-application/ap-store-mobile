const fs = require('fs');
const assert = require('assert');

const app = fs.readFileSync('merchant/merchant-app.js', 'utf8');
assert.match(app, /MERCHANT_APP_BUILD = '2026\.09\.13\.06'/, 'ต้อง bump build .06');
assert.match(app, /profile_pct,profile_exempt,profile_missing&owner_id=eq/, 'ownStore ต้องดึงฟิลด์ onboarding');
assert.match(app, /pickup_address,open_time,close_time,emergency_closed,emergency_note/, 'ownStore ต้องดึงที่อยู่/เวลา/สถานะฉุกเฉิน');
assert.match(app, /ONBOARDING_LABELS/, 'ต้องมี label เช็กลิสต์ภาษาไทย');
assert.match(app, /data-onboarding-card/, 'ต้องมีการ์ด % บน dashboard');
assert.match(app, /onboardingCard\(ctx\.store\)/, 'dashboard ต้องเรนเดอร์การ์ด %');
assert.match(app, /เปิดร้านได้เมื่อครบ 100%/, 'การ์ดต้องบอกเงื่อนไขเปิดร้าน');
assert.match(app, /id="pickupAddress"/, 'หน้าข้อมูลร้านต้องมีช่องที่อยู่ร้าน');
assert.match(app, /pickup_address: \$\('#pickupAddress'\)\.value\.trim\(\)/, 'บันทึกต้องส่งที่อยู่ร้าน');
assert.match(app, /onboardingGateNote/, 'ฟอร์มเปิด-ปิดต้องมีโน้ตเตือน %');
assert.match(app, /paintGateNote\(\)/, 'ต้องรีเฟรชโน้ตหลังบันทึก');

console.log('merchant onboarding contract: PASS');
