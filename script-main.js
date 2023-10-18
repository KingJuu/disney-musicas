let player;
let trackName;
let pontos = 0;
let ptsValendo = 15;
let chances = 3;

const alert1 = document.querySelector('#alert-play');
alert1.innerHTML = `<h2>Toque no play!</h2>`;

const alert2 = document.querySelector('#alert-pts');
const alert3 = document.querySelector('#alert-resposta-errada');
const alert4 = document.querySelector('#alert-ultima-chance');
const alert5 = document.querySelector('#alert-erro');
const alert6 = document.querySelector('#alert-acerto2');


if (chances == 1){
  alerts(alert4);
  alert4.innerHTML = `
  <h2>Atenção, essa é sua útima chance!</h2>
  <button id="btn-continuar2">Continuar</button>`

  document.getElementById("btn-continuar2").addEventListener('click', function() {
    alerts(alert4);
  })
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
        }, 15000);
        player.connect();  
}

window.onSpotifyWebPlaybackSDKReady = () => {
  //Trocar o token abaixo a cada hora, precisa estar logado, através do link https://developer.spotify.com/documentation/web-playback-sdk/tutorials/getting-started 
  const token ="BQBxnWODXHSqzwfgby8UHx4j_uWKW5TBhgX1-c6DufPnTJYOKnSZH6S6DKj5MNyDr-XudhYCs_SDv140dnkuKYFaNX6aarwlmqusZcE-oLXDluJgAcOw1fJid1b2riXXbbWnKTXcqiMy0DV9kvxTBdnyDHUS52uIGwoi3VSDieDaejNO_OC9NVq567tEYUWcupwiK9b9pQehSbTHZsu8wPxAyw-P"
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
      });})}
    connect_to_device();
  });
  
document.getElementById("play-music").addEventListener('click',() => {
  player.connect();  
  player.togglePlay();
  console.log('teste');
  setTimeout(() => {
    player.pause();
  }, 15000);
  
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


  
//botão resposta para verificar se a resposta está correta apagar a resposta e mudar a musica do play-music para a proxima
 document.getElementById("btn-check").addEventListener('click',(event) => {
  event.preventDefault();
  player.pause();
  document.querySelector('.next-song').addEventListener('click', function(){
    console.log('testeeeeee')
      alerts(alert5);
      proximaMusica()
          })
    document.querySelector('.next-song2').addEventListener('click', function(){
      console.log('testeeeeee')
      alerts(alert6);
      proximaMusica();
    })

  if (pontos == 0){
    alert3.innerHTML = `
    <h2>Cuidado, se sua resposta estiver errada você perderá 5 pontos!</h2>
    <button id="btn-continuar">Continuar</button>`;
    alerts(alert3);

    document.getElementById("btn-continuar").addEventListener('click', function() {
      alerts(alert3);

      let resposta = document.getElementById("answer").value;
      resposta = resposta.toLowerCase();
      if (resposta!="" && trackName.includes(resposta)) {
        alerts(alert6);
       
        document.getElementById("answer").value = "";
        pontos = pontos + ptsValendo;
        document.querySelector('.pontos').innerHTML = `<h2>${pontos}</h2>`;
          } else {
            alerts(alert5);
            pontos = pontos - 5;
            chances = chances-1;
            if(chances == 0){
              localStorage.setItem('total-pts', pontos);
              var v_pontuacao = JSON.parse(localStorage.getItem('pontos_jogador')) || [];
                v_pontuacao.push(pontos);
                localStorage.setItem('pontos_jogador', JSON.stringify(v_pontuacao));
              window.location.href='./end.html';
            }
          }
        });

      }else{
        let resposta = document.getElementById("answer").value;
        resposta = resposta.toLowerCase();
        if (resposta!="" && trackName.includes(resposta)) {
          alerts(alert6);
         
          document.getElementById("answer").value = "";
          pontos = pontos + ptsValendo;
          document.querySelector('.pontos').innerHTML = `<h2>${pontos}</h2>`;
            } else {
              alerts(alert5);
              pontos = pontos - 5;
              chances = chances-1;
              if(chances == 0){
                localStorage.setItem('total-pts', pontos);
                var v_pontuacao = JSON.parse(localStorage.getItem('pontos_jogador')) || [];
                  v_pontuacao.push(pontos);
                  localStorage.setItem('pontos_jogador', JSON.stringify(v_pontuacao));
                window.location.href='./end.html';
              }
            }         
          };
 })
 
};