const assert = require('node:assert/strict');
const fs = require('node:fs');

const source = fs.readFileSync('merchant/merchant-app.js', 'utf8');
assert.match(source, /const newEntityId = prefix =>/, 'Merchant UI must generate client-side text IDs where the table has no default');
assert.match(source, /item: \{ id: newEntityId\('menu'\)/, 'New menu payload must include an id before insert');
assert.doesNotMatch(source, /merchant_menu_write[\s\S]{0,400}store_id: ctx\.store\.id/, 'Client must not dictate store_id; server forces ownership');
console.log('merchant_menu_identifier_contract_test: PASS');
