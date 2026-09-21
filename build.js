/* Builds a fully self-contained linux-timeline.html — all CSS, JS and fonts
   inlined as data URIs — so double-clicking the file works in every browser,
   including ones with strict file:// security policies (e.g. Firefox). */
const fs = require('fs');
const path = require('path');

const root = __dirname;
const read = (f) => fs.readFileSync(path.join(root, f), 'utf8');

let html = read('index.html');

/* fonts: rewrite each url(*.woff2) in fonts.css to a base64 data URI */
let fontsCss = read('fonts/fonts.css');
fontsCss = fontsCss.replace(/url\(([^)]+\.woff2)\)/g, (_, file) => {
  const b64 = fs.readFileSync(path.join(root, 'fonts', file.trim())).toString('base64');
  return `url(data:font/woff2;base64,${b64})`;
});
html = html.replace(/<link rel="stylesheet" href="fonts\/fonts.css">/, `<style>${fontsCss}</style>`);

/* main stylesheet */
html = html.replace(/<link rel="stylesheet" href="styles.css">/, `<style>${read('styles.css')}</style>`);

/* scripts */
html = html.replace(/<script src="data.js"><\/script>/, `<script>${read('data.js')}</script>`);
html = html.replace(/<script src="app.js"><\/script>/, `<script>${read('app.js')}</script>`);

const out = path.join(root, 'linux-timeline.html');
fs.writeFileSync(out, html);
console.log(`wrote ${path.basename(out)} (${(fs.statSync(out).size / 1024).toFixed(0)} KB)`);
