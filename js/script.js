(function () {
  'use strict';
  var C = window.WEDDING || {};
  var $ = function (s, r) { return (r || document).querySelector(s); };
  var $$ = function (s, r) { return Array.prototype.slice.call((r || document).querySelectorAll(s)); };
  function esc(s) {
    return String(s == null ? '' : s).replace(/[&<>"']/g, function (c) {
      return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c];
    });
  }
  function get(path) {
    return path.split('.').reduce(function (o, k) { return o == null ? o : o[k]; }, C);
  }

  /* ---------- Binding data statis ---------- */
  $$('[data-t]').forEach(function (el) { var v = get(el.getAttribute('data-t')); if (v != null) el.textContent = v; });
  $$('[data-href]').forEach(function (el) { var v = get(el.getAttribute('data-href')); if (v) el.href = v; else el.removeAttribute('href'); });
  $$('[data-bg]').forEach(function (el) { var v = get(el.getAttribute('data-bg')); if (v) el.style.backgroundImage = 'url("' + v + '")'; });

  var groomNick = (C.groom && C.groom.nick) || '', brideNick = (C.bride && C.bride.nick) || '';
  document.title = 'The Wedding of ' + groomNick + ' & ' + brideNick;

  /* ---------- Nama tamu dari ?to= ---------- */
  var to = new URLSearchParams(location.search).get('to');
  if (to) $('#guestName').textContent = to.slice(0, 60);

  /* ---------- Buka undangan + musik ---------- */
  var audio = $('#bgm'), musicBtn = $('#musicBtn'), cover = $('#cover');
  if (C.music) {
    audio.src = C.music;
    audio.addEventListener('error', function () { musicBtn.hidden = true; });
  }
  function setPlaying(on) { musicBtn.classList.toggle('on', on); }
  audio.addEventListener('play', function () { setPlaying(true); });
  audio.addEventListener('pause', function () { setPlaying(false); });
  musicBtn.addEventListener('click', function () { audio.paused ? audio.play().catch(function () {}) : audio.pause(); });

  $('#openBtn').addEventListener('click', function () {
    document.body.classList.remove('locked');
    cover.classList.add('open');
    window.scrollTo(0, 0);
    if (C.music) { musicBtn.hidden = false; audio.play().catch(function () {}); }
    setTimeout(function () { cover.style.display = 'none'; }, 1100);
  });

  /* ---------- Acara ---------- */
  var evBox = $('#events');
  (C.events || []).forEach(function (e) {
    var a = document.createElement('article');
    a.className = 'event';
    a.innerHTML =
      '<h3>' + esc(e.title) + '</h3>' +
      '<div class="event__date"><span class="dow">' + esc(e.dow) + '</span><span class="day">' + esc(e.day) + '</span><span class="mon">' + esc(e.month) + '</span></div>' +
      '<p class="time">' + esc(e.time) + '</p>' +
      '<p class="place"><strong>' + esc(e.place) + '</strong><br>' + esc(e.address) + '</p>' +
      (e.maps ? '<a class="btn btn--ghost" href="' + esc(e.maps) + '" target="_blank" rel="noopener">Lihat Maps</a>' : '');
    evBox.appendChild(a);
  });
  if (C.mapEmbed) $('#mapFrame').src = C.mapEmbed; else $('#mapBox').remove();

  /* ---------- Countdown ---------- */
  var target = new Date(C.countdownTo).getTime();
  function pad(n) { return String(n).padStart(2, '0'); }
  var timer;
  function tick() {
    var d = target - Date.now();
    if (isNaN(target)) return;
    if (d <= 0) { $('#count').hidden = true; $('#countDone').hidden = false; clearInterval(timer); return; }
    $('#cd-d').textContent = pad(Math.floor(d / 864e5));
    $('#cd-h').textContent = pad(Math.floor(d % 864e5 / 36e5));
    $('#cd-m').textContent = pad(Math.floor(d % 36e5 / 6e4));
    $('#cd-s').textContent = pad(Math.floor(d % 6e4 / 1e3));
  }
  timer = setInterval(tick, 1000); tick();

  /* ---------- Love story ---------- */
  var tl = $('#timeline');
  (C.story || []).forEach(function (s) {
    var li = document.createElement('li');
    li.innerHTML = '<h3>' + esc(s.title) + '</h3><p>' + esc(s.text) + '</p>';
    tl.appendChild(li);
  });

  /* ---------- Galeri + lightbox ---------- */
  var grid = $('#galleryGrid'), photos = [], lbIndex = 0;
  (C.gallery || []).forEach(function (src) {
    var fig = document.createElement('figure');
    var im = new Image();
    im.alt = 'Foto galeri'; im.loading = 'lazy'; im.src = src;
    im.addEventListener('error', function () { fig.remove(); photos = photos.filter(function (p) { return p !== src; }); });
    fig.appendChild(im);
    fig.addEventListener('click', function () { openLb(photos.indexOf(src)); });
    grid.appendChild(fig);
    photos.push(src);
  });
  var lb = $('#lightbox'), lbImg = $('#lbImg');
  function openLb(i) { if (!photos.length) return; lbIndex = (i + photos.length) % photos.length; lbImg.src = photos[lbIndex]; lb.hidden = false; }
  function closeLb() { lb.hidden = true; }
  $('#lbClose').addEventListener('click', closeLb);
  $('#lbPrev').addEventListener('click', function () { openLb(lbIndex - 1); });
  $('#lbNext').addEventListener('click', function () { openLb(lbIndex + 1); });
  lb.addEventListener('click', function (e) { if (e.target === lb) closeLb(); });
  document.addEventListener('keydown', function (e) {
    if (lb.hidden) return;
    if (e.key === 'Escape') closeLb();
    if (e.key === 'ArrowLeft') openLb(lbIndex - 1);
    if (e.key === 'ArrowRight') openLb(lbIndex + 1);
  });

  /* ---------- Hadiah ---------- */
  function copyText(text, btn) {
    function done() { var o = btn.textContent; btn.textContent = 'Tersalin'; setTimeout(function () { btn.textContent = o; }, 1600); }
    function legacy() {
      var t = document.createElement('textarea'); t.value = text; t.style.position = 'fixed'; t.style.opacity = '0';
      document.body.appendChild(t); t.select();
      try { document.execCommand('copy'); done(); } catch (e) {}
      t.remove();
    }
    if (navigator.clipboard && window.isSecureContext) navigator.clipboard.writeText(text).then(done, legacy); else legacy();
  }
  var gBox = $('#gifts');
  function giftRow(label, name, value) {
    var row = document.createElement('div');
    row.className = 'gift';
    row.innerHTML = '<div><strong>' + esc(label) + '</strong>' + (name ? '<span>' + esc(name) + '</span>' : '') + '<code>' + esc(value) + '</code></div><button type="button" class="btn btn--ghost">Salin</button>';
    $('button', row).addEventListener('click', function () { copyText(value, this); });
    gBox.appendChild(row);
  }
  (C.gifts || []).forEach(function (g) { giftRow(g.bank, g.name, g.number); });
  if (C.giftAddress) giftRow('Kirim Hadiah', '', C.giftAddress);

  /* ---------- Ucapan & RSVP ---------- */
  var list = [], mode = 'api', shown = 5;
  var LS = 'wd_comments_v1';
  var labelMap = { hadir: 'Hadir', tidak: 'Tidak hadir', ragu: 'Masih ragu' };

  function ago(ts) {
    var s = Math.max(1, Math.floor((Date.now() - ts) / 1000));
    if (s < 60) return 'baru saja';
    var m = Math.floor(s / 60); if (m < 60) return m + ' menit lalu';
    var h = Math.floor(m / 60); if (h < 24) return h + ' jam lalu';
    var d = Math.floor(h / 24); if (d < 30) return d + ' hari lalu';
    return new Date(ts).toLocaleDateString('id-ID', { day: 'numeric', month: 'short', year: 'numeric' });
  }
  function render() {
    var c = { hadir: 0, tidak: 0, ragu: 0 };
    list.forEach(function (x) { if (c[x.attendance] != null) c[x.attendance]++; });
    $('#st-hadir').textContent = c.hadir; $('#st-tidak').textContent = c.tidak; $('#st-ragu').textContent = c.ragu;

    var box = $('#wishList'); box.innerHTML = '';
    if (!list.length) { box.innerHTML = '<p class="empty">Belum ada ucapan. Jadilah yang pertama.</p>'; }
    list.slice(0, shown).forEach(function (x) {
      var el = document.createElement('article');
      el.className = 'wish wish--' + esc(x.attendance);
      el.innerHTML =
        '<div class="wish__av" aria-hidden="true">' + esc((x.name || '?').trim().charAt(0).toUpperCase()) + '</div>' +
        '<div><h4>' + esc(x.name) + ' <small>' + esc(labelMap[x.attendance] || '') + '</small></h4>' +
        '<p>' + esc(x.message) + '</p><time>' + esc(ago(x.at)) + '</time></div>';
      box.appendChild(el);
    });
    $('#moreBtn').hidden = list.length <= shown;
  }
  $('#moreBtn').addEventListener('click', function () { shown += 5; render(); });

  function localLoad() { try { return JSON.parse(localStorage.getItem(LS) || '[]'); } catch (e) { return []; } }
  function load() {
    fetch(C.apiUrl, { headers: { Accept: 'application/json' } })
      .then(function (r) { if (!r.ok) throw new Error('api'); return r.json(); })
      .then(function (d) { list = d.comments || []; mode = 'api'; render(); })
      .catch(function () {
        mode = 'local'; list = localLoad(); render();
        var h = location.hostname;
        if (h === 'localhost' || h === '127.0.0.1' || h === '' || location.protocol === 'file:') $('#demoNote').hidden = false;
      });
  }
  load();

  var form = $('#wishForm'), status = $('#fStatus'), sendBtn = $('#fSend');
  try { var savedName = localStorage.getItem('wd_name'); if (savedName) $('#fName').value = savedName; } catch (e) {}
  if (to && !$('#fName').value) $('#fName').value = to.slice(0, 40);

  form.addEventListener('submit', function (e) {
    e.preventDefault();
    var data = {
      name: $('#fName').value.trim(),
      message: $('#fMsg').value.trim(),
      attendance: (form.querySelector('input[name="attendance"]:checked') || {}).value,
      website: form.website.value
    };
    status.className = 'form__msg';
    if (data.name.length < 2 || data.message.length < 2) { status.textContent = 'Isi nama dan ucapan minimal 2 karakter.'; status.classList.add('err'); return; }
    sendBtn.disabled = true; status.textContent = 'Mengirim…';

    function ok(entry) {
      list.unshift(entry); render();
      $('#fMsg').value = ''; status.textContent = 'Terima kasih, ucapan Anda terkirim.';
      try { localStorage.setItem('wd_name', data.name); } catch (e) {}
      sendBtn.disabled = false;
    }
    if (mode === 'local') {
      var entry = { id: String(Date.now()), name: data.name, message: data.message, attendance: data.attendance, at: Date.now() };
      var arr = localLoad(); arr.unshift(entry);
      try { localStorage.setItem(LS, JSON.stringify(arr.slice(0, 200))); } catch (e) {}
      ok(entry); return;
    }
    fetch(C.apiUrl, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(data) })
      .then(function (r) { return r.json().then(function (j) { return { r: r, j: j }; }); })
      .then(function (x) {
        if (!x.r.ok) throw new Error(x.j.error || 'Gagal mengirim');
        if (x.j.comment) ok(x.j.comment); else { status.textContent = 'Terima kasih.'; sendBtn.disabled = false; }
      })
      .catch(function (err) { status.textContent = err.message || 'Gagal mengirim. Coba lagi.'; status.classList.add('err'); sendBtn.disabled = false; });
  });
})();
