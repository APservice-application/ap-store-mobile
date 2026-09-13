const fs = require('fs');
const assert = require('assert');

const app = fs.readFileSync('merchant/merchant-app.js', 'utf8');
assert.match(app, /async function registerMerchant/, 'ต้องมีหน้าสมัครร้าน');
assert.match(app, /register: registerMerchant/, 'router ต้องรู้จักหน้าสมัคร');
assert.match(app, /merchant_apply/, 'ต้องเรียก edge สมัครร้าน');
assert.match(app, /register\.html">สมัครเปิดร้านใหม่/, 'หน้า login ต้องมีลิงก์สมัคร');

const html = fs.readFileSync('merchant/register.html', 'utf8');
assert.match(html, /data-page="register"/, 'register.html ต้องมี data-page');

console.log('merchant register contract: PASS');
