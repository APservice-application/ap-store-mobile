const fs = require('fs');
const assert = require('assert');

const store = fs.readFileSync('store.html', 'utf8');

assert.match(store, /\.toast\{position:fixed;inset:0;margin:auto;height:fit-content;[^}]*z-index:100000/, 'แจ้งเตือนร้านต้องอยู่กลางจอเลเยอร์หน้าสุด');
assert.match(store, /\.toast\.is-error\{background:linear-gradient\(135deg,#a63c47/, 'ผิดพลาดต้องเป็นสีแดง');
assert.match(store, /\.toast\.is-warning\{background:linear-gradient\(135deg,#b06a12/, 'เตือนต้องเป็นสีส้ม');
assert.match(store, /@keyframes store-toast-in/, 'ร้านต้องมีอนิเมชันเข้าแบบของตัวเอง');
assert.match(store, /@keyframes store-toast-ring/, 'ร้านต้องมีวงแหวนพัลส์รอบการ์ด');
assert.match(store, /toast=\(t,kind\)/, 'toast ต้องรับระดับความรุนแรงได้โดยเรียกแบบเดิมยังใช้ได้');
assert.match(store, /dataset\.tone/, 'ระดับที่ระบุต้องชนะการเดาจากข้อความ');

console.log('merchant notice center contract: PASS');
