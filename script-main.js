let player;
let trackName;

document.getElementById("play-music").addEventListener('click',() => {
    player.togglePlay();
    setTimeout(() => {
      player.pause();
    }, 13000);

    const gif = document.getElementById('gif');
    console.log(gif);
    
    
  });

window.onSpotifyWebPlaybackSDKReady = () => {
  //Trocar o token abaixo a cada hora, precisa estar logado, através do link https://developer.spotify.com/documentation/web-playback-sdk/tutorials/getting-started 
  const token ="BQCpo7txBadyT9beQohDByvAuj9hX8Gpfm6LZ7JbnJPC-JMkTmPOOGRrj8G5pvziMt_3wKqTqNqxFfTXFb9p6Pmw9_-rF1NMVIBCdvUF4AQPW93Qn5LdATS2dqBxqQqkj6hi2OGGBX6Sn7RHXrzZ0SUZdchqV4qmBJhbZ_Kj7PkXfJM-5XdNKDiMkd1aT1Pfuweg2T6g98ZyyXnrH-R875NTqEL9"
    player = new Spotify.Player({
    name: "Web Playback SDK Quick Start Player",
    getOAuthToken: (cb) => {
      cb(token);
    },
    volume: 0.5,
  });
  player.addListener('ready', ({ device_id }) => {
    console.log('Ready with Device ID', device_id);
    const connect_to_device = () => {
      let album_uri = "spotify:playlist:5vhhP79Cxqi9ZEfJ3DoFcp"
      fetch(`https://api.spotify.com/v1/me/player/play?device_id=${device_id}`, {
        method: "PUT",
        body: JSON.stringify({
          context_uri: album_uri,
          play: false,
        }),
        headers: new Headers({
            "Authorization": "Bearer " + token,
        }),
    }).then(response => console.log(response))
    .then(data => {
      // Adicionar listener para o evento de mudança de estado de reprodução
      player.addListener('player_state_changed', ({
        track_window
      }) => {
        trackName = track_window.current_track.album.name;
        trackName = trackName.toLowerCase();
        console.log('Current Track:', trackName);
      });})}
    connect_to_device();
  });

//botão play music para tocar a musica por 13 segundos
document.getElementById("play-music").addEventListener('click',() => {
    player.togglePlay();
    setTimeout(() => {
      player.pause();
    }, 13000);   
    
  });
  
//botão resposta para verificar se a resposta está correta apagar a resposta e mudar a musica do play-music para a proxima
 document.getElementById("btn-check").addEventListener('click',(event) => {
  event.preventDefault();
  let resposta = document.getElementById("answer").value;
  resposta = resposta.toLowerCase();
  if (trackName.includes('resposta')) {
    alert("Você Acertou, Parabéns!");
    document.getElementById("answer").value = "";
        player.nextTrack();
        setTimeout(() => {
        player.pause();
        }, 1300);
      } else {
        alert("Você errou, tente novamente!");
      }
    });
  player.connect();  
};