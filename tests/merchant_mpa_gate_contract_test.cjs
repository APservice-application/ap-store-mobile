const assert = require('node:assert/strict');
const fs = require('node:fs');

const source = fs.readFileSync('merchant/merchant-app.js', 'utf8');
assert.match(source, /requireRole\('store_owner', \{ loginUrl: 'login\.html', container: \$\('\[data-page-content\]'\), renderLoading: false \}\)/, 'Merchant gate must retain page DOM while checking role access');
assert.match(source, /const MERCHANT_APP_BUILD = '\d{4}\.\d{2}\.\d{2}\.\d{2}'/, 'Merchant app must expose a visible build number for cache detection');
assert.match(source, /merchant-build-badge/, 'Build badge must sit next to the merchant brand');
console.log('merchant_mpa_gate_contract_test: PASS');
