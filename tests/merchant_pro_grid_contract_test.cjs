const fs = require('fs');
const assert = require('assert');

const css = fs.readFileSync('merchant/merchant-pro-grid.css', 'utf8');
assert.match(css, /\.mpa-order-grid\s*\{[^}]*auto-fill/, 'กริดออร์เดอร์ต้องใช้ auto-fill');
assert.match(css, /\.mpa-order-card\s*\{[^}]*flex-direction: column/, 'การ์ดออร์เดอร์ต้องเป็น flex column');
assert.match(css, /\.mpa-order-card__foot\s*\{[^}]*margin-top: auto/, 'ท้ายการ์ดต้องชิดล่าง');
assert.match(css, /\[data-menu-archive\][^{]*\{[^}]*margin-top: auto/, 'ปุ่มเก็บเมนูต้องชิดล่าง');
assert.match(css, /tabular-nums/, 'ตัวเลขต้องใช้ tabular-nums');
assert.match(css, /\.mpa-nav\s*\{[^}]*overflow-x: auto/, 'เมนูบนต้องสกรอลล์แนวนอนได้');
assert.match(css, /prefers-reduced-motion/, 'ต้องเคารพ reduced-motion');
const opens = (css.match(/\{/g) || []).length;
const closes = (css.match(/\}/g) || []).length;
assert.strictEqual(opens, closes, `วงเล็บ CSS ต้องสมดุล (เปิด ${opens} ปิด ${closes})`);

const app = fs.readFileSync('merchant/merchant-app.js', 'utf8');
assert.match(app, /merchant-pro-grid-style/, 'ต้องฉีด CSS ใหม่ทุกหน้า');
assert.match(app, /MERCHANT_APP_BUILD = '2026\.09\.13\.04'/, 'ต้อง bump build');

console.log('merchant pro grid contract: PASS');
