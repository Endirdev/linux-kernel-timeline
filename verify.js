/* Screenshot + layout verification for the Linux kernel timeline. */
const path = require('path');
const fs = require('fs');
const puppeteer = require('puppeteer-core');

const ROOT = __dirname;
const OUT = path.join(ROOT, 'shots');
const URL = 'file://' + path.join(ROOT, 'index.html');
const sleep = (ms) => new Promise(r => setTimeout(r, ms));

(async () => {
  fs.mkdirSync(OUT, { recursive: true });
  const browser = await puppeteer.launch({
    executablePath: process.env.CHROME || '/usr/bin/google-chrome',
    headless: true,
    args: ['--no-sandbox', '--disable-gpu', '--force-color-profile=srgb', '--hide-scrollbars', '--font-render-hinting=none'],
  });
  const page = await browser.newPage();
  const errors = [];
  page.on('pageerror', e => errors.push('pageerror: ' + e.message));
  page.on('console', m => { if (m.type() === 'error') errors.push('console: ' + m.text()); });

  await page.setViewport({ width: 1920, height: 1080, deviceScaleFactor: 1 });
  await page.goto(URL, { waitUntil: 'networkidle0' });
  await page.evaluate(() => document.fonts.ready);
  await sleep(1400);

  /* ── layout assertions ── */
  const stats = await page.evaluate(() => window.__timeline.stats());
  const issues = await page.evaluate(() => window.__timeline.check());
  console.log('STATS ' + JSON.stringify(stats));
  console.log('ISSUES ' + (issues.length ? JSON.stringify(issues, null, 1) : 'none'));

  /* ── hero ── */
  await page.evaluate(() => window.__timeline.scrollLeft(0));
  await sleep(500);
  await page.screenshot({ path: path.join(OUT, '00-hero.png') });

  /* ── one shot per era ── */
  const shots = await page.evaluate(() => window.__timeline.eraShots());
  for (let i = 0; i < shots.length; i++) {
    await page.evaluate(x => window.__timeline.scrollLeft(x), shots[i]);
    await sleep(600);
    await page.screenshot({ path: path.join(OUT, `era-${i}.png`) });
  }

  /* ── dense clusters ── */
  const clusters = [
    ['dense-2008', 2008.6], ['dense-2019', 2019.3], ['dense-2025', 2025.4], ['dense-1991', 1991.6],
  ];
  for (const [name, yr] of clusters) {
    await page.evaluate((y) => window.__timeline.scrollLeft(window.__timeline.yearToScroll(y)), yr);
    await sleep(600);
    await page.screenshot({ path: path.join(OUT, `${name}.png`) });
  }

  /* ── drawer open ── */
  await page.evaluate(() => window.__timeline.scrollToMilestone('2.6'));
  await sleep(700);
  await page.evaluate(() => window.__timeline.openMilestone('2.6'));
  await sleep(800);
  await page.screenshot({ path: path.join(OUT, '40-drawer.png') });
  await page.keyboard.press('Escape');
  await sleep(600);

  /* ── keyboard nav ── */
  await page.evaluate(() => window.__timeline.scrollLeft(0));
  await sleep(300);
  await page.keyboard.press('ArrowRight');
  await sleep(400);
  const kb = await page.evaluate(() => document.getElementById('hscroll').scrollLeft);
  console.log('KEYNAV scrollLeft=' + kb);
  await page.screenshot({ path: path.join(OUT, '41-keyboard.png') });

  /* ── real click on a card (pointer capture regression test) ── */
  await page.evaluate(() => window.__timeline.scrollToMilestone('1.0'));
  await sleep(700);
  const cardId = await page.evaluate(() => {
    const m = window.__timeline.cards ? null : null;
    const el = [...document.querySelectorAll('.card')].find(c => c.querySelector('h3').textContent === 'Linux 1.0');
    el.scrollIntoView(); // horizontal scroll container: no-op vertically
    return el.getAttribute('data-id');
  });
  await sleep(400);
  await page.click(`.card[data-id="${cardId}"]`);
  await sleep(800);
  const drawerOpen = await page.evaluate(() => document.getElementById('drawer').classList.contains('open'));
  console.log('CARDCLICK drawer=' + drawerOpen);
  await page.screenshot({ path: path.join(OUT, '42-cardclick.png') });
  await page.keyboard.press('Escape');
  await sleep(600);

  /* ── end ── */
  await page.evaluate(() => window.__timeline.scrollLeft(Infinity));
  await sleep(700);
  await page.screenshot({ path: path.join(OUT, '50-end.png') });

  /* ── reduced motion ── */
  await page.emulateMediaFeatures([{ name: 'prefers-reduced-motion', value: 'reduce' }]);
  await page.reload({ waitUntil: 'networkidle0' });
  await sleep(900);
  await page.screenshot({ path: path.join(OUT, '60-reduced-motion.png') });

  /* ── smaller viewport spot check ── */
  await page.setViewport({ width: 1366, height: 768 });
  await sleep(1200);
  const issues2 = await page.evaluate(() => window.__timeline.check());
  console.log('ISSUES@1366 ' + (issues2.length ? JSON.stringify(issues2, null, 1) : 'none'));
  await page.screenshot({ path: path.join(OUT, '61-1366.png') });

  console.log('ERRORS ' + (errors.length ? JSON.stringify(errors) : 'none'));
  await browser.close();
})().catch(e => { console.error('FATAL', e); process.exit(1); });
