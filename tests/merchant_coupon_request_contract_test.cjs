const fs = require('fs');
const assert = require('assert');

const store = fs.readFileSync('store.html', 'utf8');

assert.match(store, /data-store-page="coupons"/, 'เมนูร้านต้องมีหน้าคูปอง');
assert.match(store, /id="storePage-coupons"/, 'ต้องมี section หน้าคูปอง');
assert.match(store, /const StoreCoupons = \{/, 'ต้องมีโมดูลคูปองร้านค้า');
assert.match(store, /merchant_coupon_requests\?select=\*&store_id=eq\./, 'ต้องดึงคำขอเฉพาะร้านตัวเอง');
assert.match(store, /merchant_coupon_requests', \{ method: 'POST'/, 'ต้องส่งคำขอคูปองใหม่ให้แอดมินได้');
assert.match(store, /status: 'cancelled'/, 'ต้องยกเลิกคำขอที่รอตรวจสอบได้');
assert.match(store, /coupons\?select=.*owner_store_id=eq\./, 'ต้องแสดงคูปองของร้านที่อนุมัติแล้ว');
assert.match(store, /storeCouponRender|StoreCoupons\.load\(\)/, 'ต้องโหลดข้อมูลคูปองพร้อมหน้าอื่น');

console.log('merchant coupon request contract: PASS');
