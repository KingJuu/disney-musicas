//btn-start
document.querySelector('#btn-start').addEventListener('click', function(){
    //local storage - armazenar nickname
    localStorage.removeItem('nick');
    var nickname = document.getElementById('nickname').value;
    localStorage.setItem('nick', nickname);

    //jogar
    if (nickname == ''){
        alert('Insira seu NickName para continuar');
    }else{
        window.location.href='./main.html';
    }
});

