let canvas = document.getElementById('snake');
let context = canvas.getContext('2d');
let box = 32; //tamanho do pixel da cobrinha
let snake = [];

snake[0] = {
    x: 8 * box,
    y: 8 * box
}

let direction = "right";

let food = {
    x: Math.floor(Math.random() * 15 + 1) * box,
    y: Math.floor(Math.random() * 15 + 1) * box
}

function criarBG(){
    context.fillStyle = "rgb(56, 2, 87)";
    context.fillRect(0, 0, 16 * box, 16 * box); //posicao de x, posicao de y, largura e altura
}

function criarCobrinha(){
    for(i = 0 ; i < snake.length ; i++){
        context.fillStyle = "rgb(180, 133, 223)";
        context.fillRect(snake[i].x, snake[i].y, box, box);
    }
}

function drawFood(){
    context.fillStyle = "rgb(240, 119, 49)";
    context.fillRect(food.x, food.y, box, box)
}

//adicionando o comando do teclado com as setas para que o jogo funcione
document.addEventListener('keydown', update);

function update(event){
    //se o botao for 37 e a direcao nao for pra direita, ele vai pra esquerda
    if(event.keyCode == 37 && direction != 'right') direction = 'left';
    if(event.keyCode == 38 && direction != 'down') direction = 'up';
    if(event.keyCode == 39 && direction != 'left') direction = 'right';
    if(event.keyCode == 40 && direction != 'up') direction = 'down';
}

function iniciarJogo(){

    if(snake[0].x >15 * box && direction == "right") snake[0].x = 0;
    if(snake[0].x < 0 && direction == "left") snake[0].x = 16 * box;
    if(snake[0].y > 15 * box && direction =="down") snake[0].y = 0;
    if(snake[0].y < 0 && direction == "up") snake[0].y = 16 * box;

    for(i = 1 ; i < snake.length ; i++){
        if(snake[0].x == snake[i].x && snake[0].y == snake[i].y){
            clearInterval(jogo);
            alert('Game Over :(');
        }
    }

    criarBG();
    criarCobrinha();
    drawFood();

    //setar posiçao inicial da cobrinha pra ter ponto de partida
    let snakeX = snake[0].x;
    let snakeY = snake[0].y;

    //condicionais pra acrescentar ou excluir quadradinhos da cobrinha assim que ela se movimentar
    if(direction == "right") snakeX += box;
    if(direction == "left") snakeX -= box;
    if(direction == "up") snakeY -= box;
    if(direction == "down") snakeY += box;

    if(snakeX != food.x || snakeY != food.y){
        snake.pop(); //retira o ultimo valor do array
    }else{
        food.x = Math.floor(Math.random() * 15 + 1) * box;
        food.y = Math.floor(Math.random() * 15 + 1) * box;
    }

    

    let newHead = {
        x: snakeX,
        y: snakeY
    }

    snake.unshift(newHead); //acrescenta um valor à frente no array
}

let jogo = setInterval(iniciarJogo, 100);

