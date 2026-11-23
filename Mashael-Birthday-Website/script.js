const pages = {
  envelope: document.getElementById('envelopePage'),
  birthday: document.getElementById('birthdayPage'),
  notes: document.getElementById('notesPage')
};

function showPage(pageName) {
  Object.values(pages).forEach(page => page.classList.remove('active'));
  pages[pageName].classList.add('active');
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

// Amplop dibuka, lalu masuk ke halaman ucapan
document.getElementById('openEnvelope').addEventListener('click', () => {
  const envelope = document.getElementById('openEnvelope');
  envelope.classList.add('open');
  setTimeout(() => showPage('birthday'), 450);
});

document.getElementById('toNotes').addEventListener('click', () => showPage('notes'));
document.getElementById('backToBirthday').addEventListener('click', () => showPage('birthday'));

// Pemutar musik selalu ada di layar. Pengguna menekan tombol untuk memulai musik.
const audio = document.getElementById('birthdayMusic');
const musicButton = document.getElementById('musicButton');

musicButton.addEventListener('click', async () => {
  if (audio.paused) {
    try {
      await audio.play();
      musicButton.textContent = 'Ⅱ';
      musicButton.setAttribute('aria-label', 'Jeda musik');
    } catch (error) {
      alert('Musik belum bisa diputar. Pastikan file lagu.mp3 ada di folder yang sama dengan index.html.');
    }
  } else {
    audio.pause();
    musicButton.textContent = '▶';
    musicButton.setAttribute('aria-label', 'Putar musik');
  }
});

// Botol menampilkan satu pesan acak setiap kali disentuh
const notes = [
  'Semoga hari-harimu selalu punya alasan untuk tersenyum. ♡',
  'Jangan lupa bangga pada dirimu sendiri dan semua hal yang sudah kamu lewati.',
  'Semoga satu per satu impianmu menemukan jalannya.',
  'Terima kasih sudah menjadi bagian dari cerita dan kenangan indah.',
  'You deserve kind people, peaceful days, and lovely surprises.',
  'Tetap jadi Mashael yang unik. Dunia lebih seru dengan warna khasmu!',
  'Semoga persahabatan kita terus punya banyak cerita untuk dikenang.'
];

function getRandomNote() {
  const result = document.getElementById('noteResult');
  const note = notes[Math.floor(Math.random() * notes.length)];
  result.textContent = note;
  result.animate(
    [{ opacity: 0, transform: 'translateY(7px)' }, { opacity: 1, transform: 'translateY(0)' }],
    { duration: 300, easing: 'ease-out' }
  );
}

document.getElementById('getNote').addEventListener('click', getRandomNote);
document.getElementById('messageBottle').addEventListener('click', getRandomNote);
document.getElementById('messageBottle').addEventListener('keydown', event => {
  if (event.key === 'Enter' || event.key === ' ') {
    event.preventDefault();
    getRandomNote();
  }
});
