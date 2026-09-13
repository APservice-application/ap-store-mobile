const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');

const root = path.resolve(__dirname, '..');
const app = fs.readFileSync(path.join(root, 'merchant', 'merchant-app.js'), 'utf8');
const media = fs.readFileSync(path.join(root, 'shared', 'ap-service-media.js'), 'utf8');
const menuRoute = fs.readFileSync(path.join(root, 'merchant', 'menu.html'), 'utf8');
const ordersRoute = fs.readFileSync(path.join(root, 'merchant', 'orders.html'), 'utf8');

assert.match(app, /async function orders\(\)/, 'orders route must remain available');
assert.match(app, /data-order-group="\$\{section\.key\}"/, 'orders must be grouped for new, active, and history work');
assert.match(app, /C\.order\.canTransition/, 'status choices must remain governed by Shared Core');
assert.match(app, /merchant-orders:\$\{ctx\.store\.id\}/, 'orders must retain scoped refresh cache');
assert.match(app, /action: 'merchant_menu_list'/, 'menu must read items and categories through the owner-scoped server action');
assert.match(app, /data-menu-edit/, 'menu cards must expose an edit workflow');
assert.match(app, /data-menu-available/, 'menu cards must retain sale availability control');
assert.match(app, /uploadPublicCatalogImage/, 'menu image upload must reuse shared media pipeline');
assert.match(app, /mediaType: 'PRODUCT_IMAGE'/, 'menu images must declare the product media profile');
assert.doesNotMatch(app, /type="url"/, 'menu must not expose URL image input');
assert.match(menuRoute, /ap-service-media\.js\?v=shared-media-v5/, 'menu route must load media pipeline before app code');
assert.match(menuRoute, /merchant-app\.js\?v=merchant-ui-v3-admin-release/, 'menu route must bust the previous app cache');
assert.match(ordersRoute, /merchant-app\.js\?v=merchant-ui-v3-admin-release/, 'orders route must bust the previous app cache');
assert.match(media, /DEFAULT_MAX_DIMENSION = 1200/, 'media max dimension must be 1200px');
assert.match(media, /PRODUCT_IMAGE: Object\.freeze\(\{ maxDimension: 1200/, 'product uploads must use 1200px profile');
assert.match(media, /let quality = 0\.82/, 'media compression must start at JPEG quality 0.82');
assert.match(media, /const type = 'image\/jpeg';/, 'all image uploads must be encoded as JPEG');

assert.match(app, /releasedOrdersOnly\(\)/, 'orders และ dashboard ต้องกรองเฉพาะออเดอร์ที่แอดมินปล่อยแล้ว');
assert.match(app, /status=not\.in\.\(/, 'คำขอออเดอร์ร้านต้องตัดสถานะก่อนปล่อยออกที่ฝั่งเซิร์ฟเวอร์');
assert.match(app, /S\.ADMIN_REVIEW \|\| 'รอแอดมินตรวจสอบ'/, 'ร้านค้าต้องไม่เห็นออเดอร์ที่รอแอดมินตรวจสอบ');
assert.match(app, /S\.PAYMENT_REVIEW \|\| 'รอตรวจสอบการชำระเงิน'/, 'ร้านค้าต้องไม่เห็นออเดอร์ที่รอตรวจสอบการชำระเงิน');
assert.match(app, /delivery_order_items\?select=order_id,name,emoji,unit_price,quantity/, 'การ์ดออร์เดอร์ต้องดึงรายการอาหารมาแสดงให้ร้านเห็นว่าต้องทำอะไร');
assert.match(app, /mpa-order-card__items/, 'การ์ดออร์เดอร์ต้อง render รายการอาหารในแต่ละบิล');
assert.match(app, /action: 'merchant_menu_write'/, 'เมนูต้องบันทึกผ่าน server action ที่มีสิทธิ์เจ้าของร้าน');
assert.match(app, /action: 'merchant_update_store'/, 'ข้อมูลร้านต้องบันทึกผ่าน server action ที่มีสิทธิ์เจ้าของร้าน');
assert.doesNotMatch(app, /M\.request\(`menu_items\?/, 'ห้ามเขียนเมนูผ่าน REST ตรงที่ RLS บล็อก');
console.log('merchant_orders_menu_contract_test: passed');
