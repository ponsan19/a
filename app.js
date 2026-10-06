const urlInput = document.querySelector('#url');
const checkBtn = document.querySelector('#check');
const statusEl = document.querySelector('#status');
const preview = document.querySelector('#preview');
const actions = document.querySelector('#actions');
const downloadLink = document.querySelector('#download');
const openLink = document.querySelector('#open');

const allowedExtensions = ['.mp4', '.webm', '.mov', '.m4v', '.ogg', '.ogv'];

function clean() {
  preview.hidden = true;
  preview.removeAttribute('src');
  actions.hidden = true;
  statusEl.className = 'status';
}

function looksLikeDirectVideo(url) {
  try {
    const u = new URL(url);
    return allowedExtensions.some(ext => u.pathname.toLowerCase().endsWith(ext));
  } catch {
    return false;
  }
}

checkBtn.addEventListener('click', () => {
  clean();
  const url = urlInput.value.trim();

  if (!url) {
    statusEl.textContent = 'URLを入力してください。';
    statusEl.classList.add('err');
    return;
  }

  if (!looksLikeDirectVideo(url)) {
    statusEl.textContent =
      '動画ファイルの直リンクとして判定できません。ページURLではなく、.mp4 / .webm などの直接URLを入力してください。';
    statusEl.classList.add('err');
    return;
  }

  statusEl.textContent = '直接動画URLとして読み込みます。';
  statusEl.classList.add('ok');

  preview.src = url;
  preview.hidden = false;

  downloadLink.href = url;
  openLink.href = url;
  actions.hidden = false;
});

urlInput.addEventListener('keydown', e => {
  if (e.key === 'Enter') checkBtn.click();
});
