const inputSong = document.querySelector('#input-musica');
const buttonEnd = document.querySelector('#btn-fim');
const buttonStart = document.querySelector('#btn-inicio');
const buttonRemoveSong = document.querySelector('#btn-remover');
const messageSong = document.querySelector('#mensagem');
const firstSong = document.querySelector('#primeira-musica');
const lastSong = document.querySelector('#ultima-musica');
const songCount = document.querySelector('#quantidade-musicas');
const playlistList = document.querySelector('#lista-playlist');
const playlistText = document.querySelector('#playlist-texto');

const playlist = ['Tempo Perdido', 'Lanterna dos Afogados'];

function renderPlaylist() {
    playlistList.innerHTML = '';

    playlist.forEach(function(song) {
        playlistList.innerHTML += `<li>${song}</li>`;
    });

    firstSong.textContent = playlist.length > 0 ? playlist[0] : 'Nenhuma';
    lastSong.textContent = playlist.length > 0 ? playlist[playlist.length - 1] : 'Nenhuma';
    songCount.textContent = playlist.length;
    playlistText.textContent = playlist.length > 0 ? playlist.join(' | ') : 'Nenhuma música na playlist.';
}

function getSongName() {
    return inputSong.value.trim();
}

buttonEnd.addEventListener('click', function() {
    const song = getSongName();

    if (song === '') {
        messageSong.textContent = 'Digite o nome de uma música.';
        inputSong.focus();
        return;
    }

    playlist.push(song);
    messageSong.textContent = `${song} foi adicionada ao fim da playlist.`;
    inputSong.value = '';
    inputSong.focus();
    renderPlaylist();
});

buttonStart.addEventListener('click', function() {
    const song = getSongName();

    if (song === '') {
        messageSong.textContent = 'Digite o nome de uma música.';
        inputSong.focus();
        return;
    }

    playlist.unshift(song);
    messageSong.textContent = `${song} foi adicionada ao início da playlist.`;
    inputSong.value = '';
    inputSong.focus();
    renderPlaylist();
});

buttonRemoveSong.addEventListener('click', function() {
    const song = getSongName();

    if (song === '') {
        messageSong.textContent = 'Digite o nome da música que deseja remover.';
        inputSong.focus();
        return;
    }

    const position = playlist.indexOf(song);

    if (position === -1) {
        messageSong.textContent = 'A música não foi encontrada na playlist.';
        return;
    }

    playlist.splice(position, 1);
    messageSong.textContent = `${song} foi removida da playlist.`;
    inputSong.value = '';
    inputSong.focus();
    renderPlaylist();
});

renderPlaylist();