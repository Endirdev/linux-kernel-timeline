/* ── Linux kernel timeline · layout, scroll, ambient, interactions ───── */
(function () {
  'use strict';

  const ERAS = window.__ERAS__;
  const DATA = window.__MILESTONES__;
  const T0 = 1991.4, T1 = 2027.2, PPY = 780;        // px per year
  const CARD_W = 252, MIN_GAP = CARD_W + 42;

  const hscroll = document.getElementById('hscroll');
  const track = document.getElementById('track');
  const timelineEl = document.getElementById('timeline');
  const canvas = document.getElementById('ambient');
  const ctx = canvas.getContext('2d');

  const state = { heroW: 0, tlX: 0, tlW: 0, trackW: 0, spineY: 0, maxScroll: 1, items: [], eraShots: [] };
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)');

  /* ── helpers ─────────────────────────────────────────────────────────── */
  const clamp = (v, a, b) => Math.min(b, Math.max(a, v));
  function yearOf(date) {
    const [y, m, d] = date.split('-').map(Number);
    return y + (((m - 1) * 30.4) + (d || 15)) / 365.25;
  }
  function fmtDate(date) {
    const [y, m, d] = date.split('-').map(Number);
    const names = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    return `${names[m - 1]} ${d}, ${y}`;
  }
  const xOfYear = (y) => state.tlX + (y - T0) * PPY;

  /* ── build ───────────────────────────────────────────────────────────── */
  function build() {
    const vw = window.innerWidth, vh = window.innerHeight;
    state.heroW = vw; state.tlX = vw; state.spineY = Math.round(vh * 0.52);
    state.tlW = (T1 - T0) * PPY;
    state.trackW = state.heroW + state.tlW + vw;
    state.maxScroll = state.trackW - vw;
    track.style.width = state.trackW + 'px';
    const heroCount = document.getElementById('heroCount');
    if (heroCount) heroCount.textContent = DATA.length;

    timelineEl.innerHTML = '';

    /* era bands + spine segments */
    for (const era of ERAS) {
      const x0 = xOfYear(era.y0), x1 = xOfYear(era.y1);
      const band = document.createElement('div');
      band.className = 'era-band';
      band.style.left = x0 + 'px';
      band.style.width = (x1 - x0) + 'px';
      band.style.setProperty('--c-bg', hexA(era.color, 0.05));
      band.innerHTML = `
        <div class="bg"></div>
        <div class="label" style="--c:${era.color}">
          <span class="nm">${era.name}</span><span class="yrs">${Math.floor(era.y0)} – ${Math.floor(era.y1)}</span>
          <span class="tag">${era.tagline}</span>
        </div>`;
      timelineEl.appendChild(band);

      const seg = document.createElement('div');
      seg.className = 'spine-seg';
      seg.style.left = x0 + 'px';
      seg.style.width = (x1 - x0) + 'px';
      seg.style.top = (state.spineY - 1) + 'px';
      seg.style.background = hexA(era.color, 0.55);
      timelineEl.appendChild(seg);
    }
    /* thin spine base under colored segments */
    const spine = document.createElement('div');
    spine.className = 'spine-seg';
    spine.style.cssText = `left:${state.tlX}px;width:${state.tlW}px;top:${state.spineY - 1}px;background:var(--hair);height:1px;`;
    timelineEl.appendChild(spine);

    /* year ticks */
    for (let y = Math.ceil(T0); y <= Math.floor(T1); y++) {
      const x = xOfYear(y);
      const major = y % 5 === 0;
      const t = document.createElement('div');
      t.className = 'yearmark' + (major ? ' major' : '');
      t.style.left = x + 'px';
      t.style.top = (state.spineY - (major ? 15 : 10)) + 'px';
      t.style.height = (major ? 15 : 10) + 'px';
      if (major || y % 2 === 0) {
        t.innerHTML = `<span class="y">${y}</span>`;
        timelineEl.appendChild(t);
      }
    }

    /* milestones: greedy side/tier layout to avoid same-tier collisions */
    const aboveT2 = clamp(Math.min(152, state.spineY - 60 - 196), 40, 152);
    const belowT2 = clamp(Math.min(152, vh - state.spineY - 64 - 196), 40, 152);
    const GAP_UP = [46, aboveT2], GAP_DOWN = [46, belowT2];
    const last = [[-1e9, -1e9], [-1e9, -1e9]];   // [side][tier] last x
    const cnt = [0, 0];
    state.items = DATA.map((d, i) => ({
      d, i, x: xOfYear(yearOf(d.date)), year: yearOf(d.date),
      era: ERAS.find(e => e.id === d.era),
      side: 0, tier: 0,
    })).sort((a, b) => a.x - b.x);

    for (const m of state.items) {
      const prefer = cnt[0] <= cnt[1] ? 0 : 1;
      const cands = [
        [prefer, cnt[prefer] % 2],
        [1 - prefer, cnt[1 - prefer] % 2],
        [prefer, (cnt[prefer] + 1) % 2],
        [1 - prefer, (cnt[1 - prefer] + 1) % 2],
      ];
      let chosen = cands[0];
      for (const c of cands) {
        if (Math.abs(m.x - last[c[0]][c[1]]) >= MIN_GAP) { chosen = c; break; }
      }
      m.side = chosen[0]; m.tier = chosen[1];
      cnt[m.side]++;
      last[m.side][m.tier] = m.x;
      renderMilestone(m, vh, m.side ? GAP_DOWN : GAP_UP);
    }

    /* era screenshot positions for the verifier */
    state.eraShots = ERAS.map(e => clamp(xOfYear(e.y0) + 300 - vw / 2, 0, state.maxScroll));

    /* drop era labels into the spine strip when a card would cover them */
    for (const b of timelineEl.querySelectorAll('.era-band')) {
      const label = b.querySelector('.label');
      const lr = label.getBoundingClientRect();
      const hits = state.items.some(m => {
        const cr = m.el.querySelector('.card').getBoundingClientRect();
        return !(cr.right < lr.left || cr.left > lr.right || cr.bottom < lr.top - 30 || cr.top > lr.bottom + 30);
      });
      if (hits) {
        label.classList.add('strip');
        label.style.top = (state.spineY - 44) + 'px';
      }
    }

    /* reveal observer */
    io.disconnect();
    for (const m of state.items) {
      if (m.x - state.tlX < vw * 1.2) m.el.classList.add('on');
      io.observe(m.el);
    }
    document.documentElement.style.setProperty('--vh', vh + 'px');

    refineLayout(vw, vh);
  }

  /* push same-side cards apart vertically when their x-ranges overlap across tiers */
  function refineLayout(vw, vh) {
    const CARD_H = 200;                       // safe upper bound before measurement
    for (const m of state.items) {
      const r = m.el.querySelector('.card').getBoundingClientRect();
      m.h = r.height || CARD_H;
    }
    for (const side of [0, 1]) {
      const col = state.items.filter(m => m.side === side).sort((a, b) => a.x - b.x);
      for (let i = 1; i < col.length; i++) {
        const prev = col[i - 1], cur = col[i];
        const xOverlap = Math.min(prev.x + CARD_W / 2, cur.x + CARD_W / 2) - Math.max(prev.x - CARD_W / 2, cur.x - CARD_W / 2);
        if (xOverlap <= 12) continue;
        const need = prev.gap + prev.h + 26;
        const maxGap = side
          ? vh - 64 - cur.h - state.spineY
          : state.spineY - 58 - cur.h;
        if (cur.gap < need && need <= maxGap) setGap(cur, need);
      }
    }
  }

  function setGap(m, gap) {
    m.gap = gap;
    m.el.style.setProperty('--gap', gap + 'px');
    if (m.side) m.el.style.top = (state.spineY + gap) + 'px';
    else m.el.style.bottom = (window.innerHeight - state.spineY + gap) + 'px';
    const conn = m.el.querySelector('.conn');
    conn.style[m.side ? 'bottom' : 'top'] = '100%';
    conn.style.height = (gap + 1) + 'px';
  }

  function renderMilestone(m, vh, gaps) {
    const li = document.createElement('li');
    li.className = `milestone side-${m.side ? 'down' : 'up'}`;
    li.style.left = (m.x - CARD_W / 2) + 'px';
    li.style.setProperty('--c', m.era.color);
    const gap = gaps[m.tier];
    m.gap = gap;
    li.style.setProperty('--gap', gap + 'px');
    if (m.side) li.style.top = (state.spineY + gap) + 'px';
    else li.style.bottom = (vh - state.spineY + gap) + 'px';

    const tag = m.d.kind === 'release'
      ? `<span class="v">v${m.d.version}</span>`
      : `<span class="v" style="font-size:10px;letter-spacing:.14em">MOMENT</span>`;

    li.innerHTML = `
      <button class="card" data-id="${m.i}" aria-haspopup="dialog">
        <p class="kind">${m.d.kind === 'release' ? 'Kernel' : 'Moment'}${m.d.version ? tag : ''}</p>
        <p class="when">${fmtDate(m.d.date)}</p>
        <h3>${m.d.title}</h3>
        <p class="blurb">${m.d.summary}</p>
      </button>
      <span class="conn" style="${m.side ? `bottom:100%;height:${gap + 1}px` : `top:100%;height:${gap + 1}px`}"></span>
      <span class="dot"></span>`;
    timelineEl.appendChild(li);
    m.el = li;
    li.querySelector('.card').addEventListener('click', () => openDrawer(m));
  }

  const io = new IntersectionObserver((entries) => {
    for (const e of entries) if (e.isIntersecting) {
      e.target.classList.add('on');
      io.unobserve(e.target);
    }
  }, { root: hscroll, rootMargin: '0px 260px 0px 260px' });

  function hexA(hex, a) {
    const n = parseInt(hex.slice(1), 16);
    return `rgba(${(n >> 16) & 255},${(n >> 8) & 255},${n & 255},${a})`;
  }

  /* ── scroll wiring ───────────────────────────────────────────────────── */
  const go = (x) => {
    wheel.target = clamp(x, 0, state.maxScroll);
    hscroll.scrollLeft = wheel.target;
  };

  /* wheel: accumulate into a target and glide toward it */
  const wheel = { target: 0, raf: 0 };
  window.addEventListener('wheel', (e) => {
    /* wheel over an open drawer scrolls the drawer; chain to the timeline at its edges */
    if (!drawer.hidden && (e.target === drawer || drawer.contains(e.target))) {
      const atTop = drawer.scrollTop <= 0 && e.deltaY < 0;
      const atBottom = drawer.scrollTop + drawer.clientHeight >= drawer.scrollHeight - 1 && e.deltaY > 0;
      if (!atTop && !atBottom) return;
    }
    e.preventDefault();
    const d = Math.abs(e.deltaY) >= Math.abs(e.deltaX) ? e.deltaY : e.deltaX;
    wheel.target = clamp(wheel.target + d, 0, state.maxScroll);
    if (!wheel.raf) wheel.raf = requestAnimationFrame(wheelStep);
  }, { passive: false });
  function wheelStep() {
    const diff = wheel.target - hscroll.scrollLeft;
    if (Math.abs(diff) < 1) { hscroll.scrollLeft = wheel.target; wheel.raf = 0; return; }
    hscroll.scrollLeft += diff * 0.14;
    wheel.raf = requestAnimationFrame(wheelStep);
  }

  window.addEventListener('keydown', (e) => {
    const step = { ArrowRight: window.innerWidth * 0.38, ArrowLeft: -window.innerWidth * 0.38, PageDown: window.innerWidth * 0.9, PageUp: -window.innerWidth * 0.9 }[e.key];
    if (step !== undefined) { e.preventDefault(); go(hscroll.scrollLeft + step); }
    else if (e.key === 'Home') { e.preventDefault(); go(0); }
    else if (e.key === 'End') { e.preventDefault(); go(state.maxScroll); }
    else if (e.key === 'Escape') closeDrawer();
  });

  /* drag to pan (mouse) — capture only after a move threshold so plain clicks land on cards */
  let drag = null;
  hscroll.addEventListener('pointerdown', (e) => {
    if (e.pointerType !== 'mouse') return;
    drag = { x: e.clientX, sl: hscroll.scrollLeft, moved: 0, id: e.pointerId, captured: false };
  });
  hscroll.addEventListener('pointermove', (e) => {
    if (!drag) return;
    const dx = e.clientX - drag.x;
    drag.moved = Math.max(drag.moved, Math.abs(dx));
    if (drag.moved > 5 && !drag.captured) {
      drag.captured = true;
      hscroll.setPointerCapture(drag.id);
      hscroll.classList.add('dragging');
    }
    if (drag.captured) go(drag.sl - dx);
  });
  const endDrag = () => { drag = null; hscroll.classList.remove('dragging'); };
  hscroll.addEventListener('pointerup', endDrag);
  hscroll.addEventListener('pointercancel', endDrag);
  hscroll.addEventListener('click', (e) => { if (drag && drag.moved > 5) { e.preventDefault(); e.stopPropagation(); } }, true);

  /* ── progress / era readout / scrubber ───────────────────────────────── */
  const scrub = document.getElementById('scrubber');
  const fill = document.getElementById('scrubFill');
  const thumb = document.getElementById('scrubThumb');
  const eraDot = document.getElementById('eraDot');
  const eraName = document.getElementById('eraName');
  const yearNow = document.getElementById('yearNow');

  function buildScrubSegments() {
    scrub.querySelectorAll('.seg').forEach(s => s.remove());
    for (const era of ERAS) {
      const s0 = clamp(xOfYear(era.y0) - state.heroW, 0, state.maxScroll);
      const s1 = clamp(xOfYear(era.y1) - state.heroW, 0, state.maxScroll);
      const seg = document.createElement('div');
      seg.className = 'seg';
      seg.style.cssText = `left:${(s0 / state.maxScroll) * 100}%;width:${((s1 - s0) / state.maxScroll) * 100}%;color:${era.color}`;
      scrub.querySelector('.rail').appendChild(seg);
    }
  }

  let ticking = false;
  hscroll.addEventListener('scroll', () => {
    if (!wheel.raf) wheel.target = hscroll.scrollLeft;
    if (ticking) return;
    ticking = true;
    requestAnimationFrame(() => { update(); ticking = false; });
  }, { passive: true });

  let lastEra = null;
  function update() {
    paraTarget = hscroll.scrollLeft;
    const f = clamp(hscroll.scrollLeft / state.maxScroll, 0, 1);
    fill.style.width = (f * 100) + '%';
    thumb.style.left = (f * 100) + '%';
    const year = clamp(T0 + (hscroll.scrollLeft + window.innerWidth / 2 - state.tlX) / PPY, T0, T1 - 0.01);
    let era = ERAS[ERAS.length - 1];
    for (const e of ERAS) { if (year < e.y1) { era = e; break; } }
    yearNow.textContent = Math.floor(year);
    if (era !== lastEra) {
      lastEra = era;
      eraName.textContent = era.name;
      document.documentElement.style.setProperty('--era', era.color);
    }
  }

  /* scrubber interaction */
  function scrubTo(clientX) {
    const r = scrub.getBoundingClientRect();
    go(((clientX - r.left) / r.width) * state.maxScroll);
  }
  let scrubbing = false;
  scrub.addEventListener('pointerdown', (e) => {
    scrubbing = true; scrub.classList.add('active');
    scrub.setPointerCapture(e.pointerId); scrubTo(e.clientX);
  });
  scrub.addEventListener('pointermove', (e) => { if (scrubbing) scrubTo(e.clientX); });
  scrub.addEventListener('pointerup', () => { scrubbing = false; scrub.classList.remove('active'); });

  /* ── drawer ──────────────────────────────────────────────────────────── */
  const drawer = document.getElementById('drawer');
  const backdrop = document.getElementById('backdrop');
  function openDrawer(m) {
    const d = m.d;
    document.getElementById('drawerKind').innerHTML =
      (d.kind === 'release' ? `Kernel release` : 'Moment') +
      (d.version ? ` &nbsp;·&nbsp; <span style="color:${m.era.color}">v${d.version}</span>` : '');
    document.getElementById('drawerTitle').textContent = d.title;
    document.getElementById('drawerDate').textContent = fmtDate(d.date) + ' · ' + m.era.name;
    document.getElementById('drawerSummary').textContent = d.summary;
    document.documentElement.style.setProperty('--dc', m.era.color);

    const ul = document.getElementById('drawerFacts');
    ul.innerHTML = '';
    for (const f of d.facts) {
      const li = document.createElement('li');
      li.textContent = f;
      ul.appendChild(li);
    }

    const moreEl = document.getElementById('drawerMore');
    moreEl.innerHTML = '';
    for (const p of (d.more || [])) {
      const para = document.createElement('p');
      para.textContent = p;
      moreEl.appendChild(para);
    }
    document.getElementById('moreWrap').hidden = !(d.more && d.more.length);

    const linksEl = document.getElementById('drawerLinks');
    linksEl.innerHTML = '';
    for (const [label, href] of (d.links || [])) {
      const li = document.createElement('li');
      const a = document.createElement('a');
      a.href = href; a.textContent = label; a.target = '_blank'; a.rel = 'noopener';
      li.appendChild(a);
      linksEl.appendChild(li);
    }
    document.getElementById('linksWrap').hidden = !(d.links && d.links.length);

    drawer.hidden = false; backdrop.hidden = false;
    drawer.scrollTop = 0;
    requestAnimationFrame(() => { drawer.classList.add('open'); backdrop.classList.add('show'); });
    document.getElementById('drawerClose').focus();
  }
  function closeDrawer() {
    if (drawer.hidden) return;
    drawer.classList.remove('open'); backdrop.classList.remove('show');
    setTimeout(() => { drawer.hidden = true; backdrop.hidden = true; }, 460);
  }
  document.getElementById('drawerClose').addEventListener('click', closeDrawer);
  backdrop.addEventListener('click', closeDrawer);

  /* ── ambient canvas: bokeh blobs + slow ribbons ──────────────────────── */
  const PASTELS = ['#8fbf9d', '#dfbe7d', '#9cbbe2', '#dba398', '#bda3e0', '#8ecbcb', '#a7b1dd', '#dfa884'];
  const rand = (a, b) => a + Math.random() * (b - a);
  const blobs = Array.from({ length: 14 }, () => ({
    x: Math.random(), y: Math.random(), r: rand(90, 240),
    c: PASTELS[Math.floor(Math.random() * PASTELS.length)],
    a: rand(0.09, 0.15),
    vx: rand(-0.00012, 0.00012), vy: rand(-0.00008, 0.00008),   // per-frame @60fps → screen crossing in minutes
    ph: rand(0, Math.PI * 2), sp: rand(0.0001, 0.00024),
  }));
  const ribbons = Array.from({ length: 3 }, (_, i) => ({
    y: 0.24 + i * 0.27, h: rand(130, 250), c: PASTELS[(i * 3 + 2) % PASTELS.length],
    a: 0.05, ph: i * 2.1, sp: 0.00004 + i * 0.00002,
  }));

  let t0 = performance.now(), scrollParallax = 0, paraTarget = 0, running = true;
  document.addEventListener('visibilitychange', () => { running = !document.hidden; if (running) { t0 = performance.now(); raf(); } });

  function frame(now) {
    const t = now;
    /* ease the parallax offset so panning never teleports the bokeh */
    scrollParallax += (paraTarget - scrollParallax) * 0.03;
    const W = canvas.width / DPR, H = canvas.height / DPR;
    ctx.clearRect(0, 0, W, H);

    /* ribbons */
    for (const rb of ribbons) {
      const yBase = rb.y * H + Math.sin(t * 0.000012 + rb.ph) * 40;
      const g = ctx.createLinearGradient(0, yBase - rb.h / 2, 0, yBase + rb.h / 2);
      g.addColorStop(0, 'rgba(255,255,255,0)');
      g.addColorStop(0.5, hexA(rb.c, rb.a));
      g.addColorStop(1, 'rgba(255,255,255,0)');
      ctx.fillStyle = g;
      ctx.beginPath();
      const wob = Math.sin(t * 0.000016 + rb.ph) * 26;
      ctx.moveTo(-40, yBase + wob);
      ctx.bezierCurveTo(W * 0.3, yBase - 46 + wob, W * 0.7, yBase + 46 - wob, W + 40, yBase - wob);
      ctx.bezierCurveTo(W * 0.7, yBase + rb.h / 2 - wob, W * 0.3, yBase + rb.h / 2 + wob, -40, yBase + rb.h / 2 + wob);
      ctx.closePath();
      ctx.fill();
    }

    /* bokeh blobs (with slow parallax against scroll) */
    const paraOff = (scrollParallax / state.maxScroll) * 0.25;   // ¼ screen drift across the whole timeline
    for (const b of blobs) {
      b.x += b.vx; b.y += b.vy;
      const wob = Math.sin(t * b.sp + b.ph) * 0.015;
      let px = ((b.x + wob - paraOff) % 1.3 + 1.6) % 1.3 - 0.15;      // wrap in [-0.15, 1.15]
      const py = ((b.y + Math.cos(t * b.sp + b.ph) * 0.02) % 1.2 + 1.2) % 1.2 - 0.1;
      const r = b.r * (1 + Math.sin(t * b.sp * 1.5 + b.ph) * 0.06);
      const x = px * W, y = py * H;
      if (x < -r - 60 || x > W + r + 60) continue;
      const g = ctx.createRadialGradient(x, y, 0, x, y, r);
      g.addColorStop(0, hexA(b.c, b.a));
      g.addColorStop(0.55, hexA(b.c, b.a * 0.85));
      g.addColorStop(1, hexA(b.c, 0));
      ctx.fillStyle = g;
      ctx.beginPath();
      ctx.arc(x, y, r, 0, Math.PI * 2);
      ctx.fill();
    }
  }

  let DPR = 1;
  function resizeCanvas() {
    DPR = Math.min(window.devicePixelRatio || 1, 2);
    canvas.width = window.innerWidth * DPR;
    canvas.height = window.innerHeight * DPR;
    canvas.style.width = window.innerWidth + 'px';
    canvas.style.height = window.innerHeight + 'px';
    ctx.setTransform(DPR, 0, 0, DPR, 0, 0);
  }

  function raf() {
    if (!running) return;
    frame(performance.now());
    if (!reduceMotion.matches) requestAnimationFrame(raf);
  }
  reduceMotion.addEventListener?.('change', () => { if (!reduceMotion.matches) raf(); });

  /* ── boot / resize ───────────────────────────────────────────────────── */
  let rt;
  window.addEventListener('resize', () => {
    clearTimeout(rt);
    rt = setTimeout(() => {
      const f = hscroll.scrollLeft / state.maxScroll;
      resizeCanvas(); build();
      buildScrubSegments();
      go(f * state.maxScroll);
    }, 150);
  });

  resizeCanvas(); build(); buildScrubSegments(); update();
  raf();

  /* ── debug API for the verifier ──────────────────────────────────────── */
  window.__timeline = {
    stats: () => ({ trackW: state.trackW, maxScroll: state.maxScroll, count: state.items.length, spineY: state.spineY }),
    eraShots: () => state.eraShots,
    scrollLeft: (x) => { go(x === Infinity ? state.maxScroll : x); },
    yearToScroll: (y) => clamp(xOfYear(y) - window.innerWidth / 2, 0, state.maxScroll),
    scrollToX: (trackX) => { go(trackX - window.innerWidth / 2); },
    scrollToMilestone: (needle) => {
      const m = state.items.find(it => (it.d.version === needle || it.d.title.toLowerCase().includes(needle.toLowerCase())));
      if (m) go(m.x - window.innerWidth / 2);
      return m ? m.d.title : null;
    },
    openMilestone: (needle) => {
      const m = state.items.find(it => (it.d.version === needle || it.d.title.toLowerCase().includes(needle.toLowerCase())));
      if (m) openDrawer(m);
      return m ? m.d.title : null;
    },
    check: () => {
      const issues = [];
      const groups = {};
      for (const m of state.items) {
        const r = m.el.querySelector('.card').getBoundingClientRect();
        const g = m.side + ':' + m.tier;
        (groups[g] = groups[g] || []).push({ m, r });
        if (r.top < 58) issues.push(`top clipped: ${m.d.title} (top=${Math.round(r.top)})`);
        if (r.bottom > window.innerHeight - 64) issues.push(`bottom clipped: ${m.d.title} (bottom=${Math.round(r.bottom)})`);
        if (r.width !== CARD_W) issues.push(`card width: ${m.d.title} w=${r.width}`);
        /* era band label collision */
        const label = m.el.closest('#timeline').querySelectorAll('.era-band .label');
        /* cheap: only check the band this milestone belongs to */
        const band = [...document.querySelectorAll('.era-band')].find(b => {
          const bl = parseFloat(b.style.left), bw = parseFloat(b.style.width);
          return m.x >= bl && m.x <= bl + bw;
        });
        if (band) {
          const lb = band.querySelector('.label').getBoundingClientRect();
          if (!(r.right < lb.left || r.left > lb.right || r.bottom < lb.top || r.top > lb.bottom)) {
            issues.push(`era label collision: ${m.d.title}`);
          }
        }
      }
      for (const [g, arr] of Object.entries(groups)) {
        arr.sort((a, b) => a.r.left - b.r.left);
        for (let i = 1; i < arr.length; i++) {
          const gapPx = arr[i].r.left - arr[i - 1].r.right;
          if (gapPx < 4) issues.push(`overlap [${g}]: "${arr[i - 1].m.d.title}" ↔ "${arr[i].m.d.title}" (${Math.round(gapPx)}px)`);
        }
      }
      /* cross-tier overlap on the same side */
      for (const side of [0, 1]) {
        const col = state.items.filter(m => m.side === side).sort((a, b) => a.x - b.x);
        for (let i = 1; i < col.length; i++) {
          for (let j = i + 1; j < col.length; j++) {
            const a = col[i - 1], b = col[j];
            const xo = Math.min(a.x + 126, b.x + 126) - Math.max(a.x - 126, b.x - 126);
            if (xo <= 8) break;
            const ra = a.el.querySelector('.card').getBoundingClientRect();
            const rb = b.el.querySelector('.card').getBoundingClientRect();
            const yo = Math.min(ra.bottom, rb.bottom) - Math.max(ra.top, rb.top);
            if (xo > 8 && yo > 8) issues.push(`cross-tier overlap: "${a.d.title}" ↔ "${b.d.title}" (${Math.round(xo)}×${Math.round(yo)})`);
            break;
          }
        }
      }
      return issues;
    },
  };
})();
