// Contract: settings hub + no duplicate upload buttons (merchant UI v.07).
const fs = require('fs');
const path = require('path');
const root = path.join(__dirname, '..');
const app = fs.readFileSync(path.join(root, 'merchant/merchant-app.js'), 'utf8');
const mpa = fs.readFileSync(path.join(root, 'shared/ap-service-mpa.js'), 'utf8');
const cssPath = path.join(root, 'merchant/merchant-beauty.css');
let n = 0;
const ok = (cond, label) => { n += 1; if (!cond) { console.error(`FAIL #${n}: ${label}`); process.exit(1); } console.log(`ok #${n}: ${label}`); };

// 1. top nav: 6 items, no store link (store lives in settings hub)
ok(!app.includes("['store', 'ข้อมูลร้าน']"), 'top nav drops store link');
ok(app.includes("['dashboard', 'ภาพรวม'], ['orders', 'ออร์เดอร์'], ['menu', 'เมนู'], ['finance', 'การเงิน'], ['notifications', 'แจ้งเตือน'], ['settings', 'ตั้งค่า']"), 'top nav has 6 items');

// 2. settings hub menu + deep links
ok(app.includes('mbeauty-menu'), 'settings renders hub menu');
ok(app.includes('href="store.html"'), 'hub links store profile');
ok(app.includes('href="store.html#storeOperations"'), 'hub deep-links hours/status');
ok(app.includes('href="store.html#payoutSection"'), 'hub deep-links payout');
ok(app.includes('<details') && app.includes('เปลี่ยนรหัสผ่าน'), 'password change collapsible');

// 3. store page anchors for deep links
ok(app.includes('id="payoutSection"'), 'payout section has anchor id');
ok(app.includes('scrollIntoView'), 'store page scrolls to hash anchor');

// 4. dedup guard: shared enhancer must skip merchant-owned picker labels
for (const label of ['เลือกจากคลัง', 'ถ่ายจากกล้อง', 'ถ่ายรูป', 'ถ่ายรูปใหม่', 'เปลี่ยนจากคลัง']) {
  ok(mpa.includes(label), `enhancer skip-regex knows "${label}"`);
}

// 5. beauty stylesheet shipped + injected
ok(fs.existsSync(cssPath), 'merchant-beauty.css exists');
ok(app.includes('merchant-beauty.css'), 'beauty stylesheet injected');
ok(app.includes("MERCHANT_APP_BUILD = '2026.09.13.07'"), 'build bumped to .07');

console.log(`PASS merchant hub contract (${n} assertions)`);
