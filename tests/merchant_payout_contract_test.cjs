const fs = require('fs');
const assert = require('assert');

const app = fs.readFileSync('merchant/merchant-app.js', 'utf8');
assert.match(app, /id="payoutMethod"/, 'หน้าข้อมูลร้านต้องมีช่องวิธีรับเงิน');
assert.match(app, /id="payoutNumber"/, 'หน้าข้อมูลร้านต้องมีช่องเลขบัญชี');
assert.match(app, /payout_account_number: \$\('#payoutNumber'\)\.value/, 'ต้องส่งเลขบัญชีไป edge');
assert(!/กรุณาติดต่อแอดมิน/.test(app), 'ต้องไม่บอกให้ติดต่อแอดมินเรื่องบัญชีแล้ว');

console.log('merchant payout UI contract: PASS');
