const nickname = document.querySelector('#nome');
const pts = document.querySelector('#pontos');
const ranking = document.querySelector('.podio');
var nick = localStorage.getItem('nick')
var nome = localStorage.getItem('player');
var pontuacao = localStorage.getItem('total-pts');


nickname.innerHTML = `Parabéns ${nick}!`;
pts.innerHTML = `${pontuacao} pontos`;


const primeiro = localStorage.getItem('0');
const segundo = localStorage.getItem('1');
const terceiro = localStorage.getItem('2');
const quarto = localStorage.getItem('3');
const quinto = localStorage.getItem('4');

if (pts > primeiro) {
    localStorage.setItem('0', nome);
    localStorage.removeItem('player');
  } else if(pts > segundo){
    localStorage.removeItem('player');
    localStorage.setItem('1', nome);
  }else if(pts > terceiro){
    localStorage.removeItem('player');
    localStorage.setItem('2', nome);
  }else if(pts > quarto){
    localStorage.removeItem('player');
    localStorage.setItem('3', nome);
  }else if(pts > quinto){
    localStorage.removeItem('player');
    localStorage.setItem('4', nome);
  }


ranking.innerHTML = `
    <h2><img src="./assets/1-place.svg" alt="icon1"> ${primeiro}</h2>
    <h2><img src="./assets/2-place.svg" alt="icon2"> ${segundo}</h2>
    <h2><img src="./assets/3-place.svg" alt="icon3"> ${terceiro}</h2>
    <h2><img src="./assets/places.svg" alt="icon4"> ${quarto}</h2>
    <h2><img src="./assets/places.svg" alt="icon4"> ${quinto}</h2>
                
`