let player;
let trackName;
let pontos = 60;
let ptsValendo = 15;
let chances = 0;

const alert1 = document.querySelector('#alert-play');
alert1.innerHTML = `<h2>Toque no play!</h2>`;

const alert2 = document.querySelector('#alert-pts');
const alert3 = document.querySelector('#alert-resposta-errada');
const alert4 = document.querySelector('#alert-ultima-chance');
const alert5 = document.querySelector('#alert-erro');

if (chances == 1){
  alerts(alert4);
  alert4.innerHTML = `
  <h2>Atenção, essa é sua útima chance!</h2>
  <button id="btn-continuar2">Continuar</button>`

  document.getElementById("btn-continuar2").addEventListener('click', function() {
    alerts(alert4);
  })
}else if(chances == 0){
  localStorage.setItem('total-pts', pontos);
  window.location.href='./end.html';
}

function alerts(alert){
  let teste = alert.classList;
  if (teste.contains('hidden')){
    teste.remove('hidden');
  } else{
    teste.add('hidden');
  }
}

function proximaMusica(){
  player.nextTrack();
        ptsValendo = 15;
        setTimeout(() => {
        player.pause();
        }, 5000);
}

document.getElementById("play-music").addEventListener('click',() => {

    player.togglePlay();
    setTimeout(() => {
      player.pause();
    }, 5000);

    const gif = document.getElementById('gif');
    console.log(gif);
    
    
    alert1.classList.add('hidden')
    alert2.innerHTML = `<h2>Valendo ${ptsValendo} pontos!</h2>`;
    alerts(alert2);
    if (alert2.classList.contains('hidden')){
      ptsValendo = ptsValendo - 5;
    }
    if (ptsValendo == 0) {
      proximaMusica();
    }
  });

window.onSpotifyWebPlaybackSDKReady = () => {
  //Trocar o token abaixo a cada hora, precisa estar logado, através do link https://developer.spotify.com/documentation/web-playback-sdk/tutorials/getting-started 
  const token =""
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
        trackName = 'teste'//track_window.current_track.album.name;
        trackName = trackName.toLowerCase();
        console.log('Current Track:', trackName);
      });})}
    connect_to_device();
  });

  
//botão resposta para verificar se a resposta está correta apagar a resposta e mudar a musica do play-music para a proxima
 document.getElementById("btn-check").addEventListener('click',(event) => {
  event.preventDefault();
  document.querySelector('.pontos').innerHTML = `<h2>${pontos}</h2>`;

  if (pontos == 0){
    alert3.innerHTML = `
    <h2>Cuidado, se sua resposta estiver errada você perderá 5 pontos!</h2>
    <button id="btn-continuar">Continuar</button>`;
    alerts(alert3);

    document.getElementById("btn-continuar").addEventListener('click', function() {
      alerts(alert3);

      let resposta = document.getElementById("answer").value;
      resposta = resposta.toLowerCase();
      if (trackName.includes(resposta)) {
        alert("Você Acertou, Parabéns!");
        document.getElementById("answer").value = "";
            
            proximaMusica();
            pontos = pontos + ptsValendo;
          } else {
            alerts(alert5);
            pontos = pontos - 5;
            chances = chances--;
          }
        });
      player.connect();  

      }else{
       
          let resposta = document.getElementById("answer").value;
          resposta = resposta.toLowerCase();
          if (trackName.includes(resposta)) {
            alert("Você Acertou, Parabéns!");
            document.getElementById("answer").value = "";
                proximaMusica();
                pontos = pontos + ptsValendo;
              } else {
                alerts(alert5);
                pontos = pontos - 5;
                chances = chances--;
            }
            player.connect();  
          
          };
        
    
 })

};

//ranking

var nome = localStorage.getItem('nick');
localStorage.setItem('player', `${nome}: ${pontos.toString()} Pontos`);
