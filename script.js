

const playGame = document.querySelector('.game__start-btn');

playGame.addEventListener('click',(e)=>{
    e.preventDefault();
    document.querySelector('.game__start').style.display ='none';
    document.querySelector('.game__section').style.display ='flex';
})
console.log('Hi')


const menuAnimation = document.getElementById('game__start-bg');

const numberOfColorBoxes = 400;

for (let i = 0; i < numberOfColorBoxes; i++){
    const colorBox = document.createElement('div');
    colorBox.classList.add('colorBox');
    menuAnimation.append(colorBox);

}

// ====
// let c = document.querySelector('line');
// console.log(c.getTotalLength())
// =====
const game = document.querySelector('.game');
const res = document.querySelector('.res');
const totalX = document.querySelector('.res__total-x');
const totalO = document.querySelector('.res__total-o');
const btnGame = document.querySelector('.new-game');
const fields = document.querySelectorAll('.field');
let step = false;
let count = 0;
let countX = 0;
let countO = 0;

let circle = `<svg class="circle">
<circle r="45" cx="58" cy="58" stroke="#A84DB4" stroke-width="10" fill="none" stroke-linecap="round"/>
</svg> `;

let cross = `<svg class="cross">
<line class="first" x1="15" y1="15" x2="100" y2="100" stroke="#01F0FD" stroke-width="10" stroke-linecap="round"/>
<line class="second" x1="100" y1="15" x2="15" y2="100" stroke="#01F0FD" stroke-width="10" stroke-linecap="round"/>
</svg> `;


function stepCross(target){
    if(target.tagName == 'svg' || target.tagName == 'line' || target.tagName == 'circle') {
		return;
	}
    target.innerHTML = cross;
    target.classList.add('cr-x');
    let crossAudio  = new Audio('audio/sound-1.mp3');
    crossAudio.play();
    count++;

}


function stepZero(target){
    if(target.tagName == 'svg' || target.tagName == 'line' || target.tagName == 'circle') {
		return;
	}
    target.innerHTML = circle;
    target.classList.add('ci-o');
    let circleAudio  = new Audio('audio/sound-2.mp3');
    circleAudio.play();
    count++;
}

function init(e){

    if(!step){
        stepCross(e.target);
    } else {
        stepZero(e.target);
        
    }
    step = !step;
    win();

}

function newGame(){
    step = false;
    count = 0;
    res.innerText = '';
    fields.forEach(item =>{
        item.innerHTML ='';
        item.classList.remove('cr-x', 'ci-o', 'active');
    })
    game.addEventListener('click', init)
}

function win(){
    let combination = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
    ];

    // Запускаем для проверки
    for(let i = 0; i < combination.length; i++){
        // Берём из нулевого элемента  нулевое значения( проверяем выйграшные комбинаций)
        if(fields[combination[i][0]].classList.contains('cr-x') &&
           fields[combination[i][1]].classList.contains('cr-x')&&
           fields[combination[i][2]].classList.contains('cr-x')){
                setTimeout(() =>{
                    fields[combination[i][0]].classList.add('active');
                    fields[combination[i][1]].classList.add('active');
                    fields[combination[i][2]].classList.add('active');
                    res.innerHTML = 'Winner X';
                    countX ++;
                    totalX.innerHTML = countX;
                   

                    
                },1500);
                game.removeEventListener('click', init);


         } else if(fields[combination[i][0]].classList.contains('ci-o') &&
                fields[combination[i][1]].classList.contains('ci-o')&&
                fields[combination[i][2]].classList.contains('ci-o')){
                        setTimeout(() =>{
                            fields[combination[i][0]].classList.add('active');
                            fields[combination[i][1]].classList.add('active');
                            fields[combination[i][2]].classList.add('active');
                            res.innerHTML = 'Winner 0'
                            countO ++;
                            totalO.innerHTML = countO;
                        },1500);
              game.removeEventListener('click', init);

       } else if (count == 9){
            setTimeout(()=>{
                res.innerHTML = 'Ничея';
            },1500)
            
            game.removeEventListener('click', init);

       }
    }
}
btnGame.addEventListener('click', newGame);
game.addEventListener('click', init);


let quoteSet = [
    "In the digital age, don't be a byte out of place.",
    "Navigating the cyberspace requires a byte of knowledge and a terabyte of caution.",
    "In a world of ones and zeros, be the exception.",
    "The beauty of the cyber universe lies in its infinite possibilities and constant evolution.",
    "In cyberspace, every click leaves a trace. Be mindful of your digital footprint.",
    "Embrace the virtual reality, but don't lose touch with your real identity.",
    "In the realm of cyber, innovation is the currency, and adaptation is the key.",
    "In a world coded with possibilities, write your own algorithm of success.",
    "The cyber frontier is vast; explore it with curiosity, navigate it with wisdom.",
    "In the cyber realm, ideas are the code, and innovation is the program.",
    "In the world of web design, every pixel tells a story. Make sure yours is worth reading.",
    "Frontend development is the art of turning imagination into pixels and pixels into an immersive experience.",
    "Design is not just what it looks like, but how it works. The same goes for a well-crafted website.",
    "A good frontend developer is like a magician – turning code into captivating user experiences.",
    "Web design is not just about creating pretty visuals; it's about crafting seamless journeys for the user.",
    "In the realm of frontend development, attention to detail is the secret sauce for a flawless user interface.",
    "Coding is the brush, and the browser is the canvas. Paint the web with your creativity.",
    "The best websites are not just seen; they are experienced. Create experiences that leave a lasting impression.",
    "Frontend development is a dance between creativity and functionality, and a good developer has the perfect choreography.",
    "Web design is the silent ambassador of your brand. Ensure it speaks volumes about your style and innovation."
];
let quote = document.querySelector('q');

setInterval(()=>{
    quote.innerHTML = quoteSet[Math.floor(Math.random() * quoteSet.length)];
},5000)

