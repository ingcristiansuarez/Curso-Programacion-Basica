// main()
const cardContainer = document.getElementById('card-container');
const typesAttacks = document.getElementById('types-attacks');
const buttonPet = document.getElementById("btn-pet");
const sectionSelectReboot = document.getElementById("section-reboot");
const sectionSelectAttack = document.getElementById("select-attack");
const buttonReboot = document.getElementById("btn-reboot");

// selectPetPlayer
const sectionSelectPet = document.getElementById("select-pet");
const spanPetPlayer = document.getElementById('player-pet');

// selectPetEnemy
const spanPetEnemy = document.getElementById('enemy-pet');

// battle
const spanLifesPet = document.getElementById('pet-lifes');
const spanLifesPetEnemy = document.getElementById('enemy-pet-lifes');

// messagesAttack
const restulBattle = document.getElementById('result');
const playerAttackSelected = document.getElementById('player-attack');
const playerEnemySelected = document.getElementById('enemy-attack');

// canvas
const sectionMap = document.getElementById('view-map');
const map = document.getElementById('map');

const maximumMapwidth = 350;

let mokepons = [];
let buttonsAttacks = [];
let playerAttack = [];
let enemyAttack = [];
let enemyAttacks = [];
let playerWins = 0;
let enemyWins = 0;
let playerLifes = 3;
let enemyLifes = 3;
let optionMokepon;
let inputHipodogue;
let inputCapipepo;
let inputRatigueya;
let petPlayer;
let myMokepon;
let attacksMokepon;
let buttonFire;
let buttonPlant;
let buttonWater;
let indexPlayer;
let indexEnemy;
let canva = map.getContext("2d");
let intervalMokepon;
let backgroundMap = new Image();
backgroundMap.src = './assets/mokemap.png';
let heightMap;
let widthMap = window.innerWidth - 20;

if (widthMap > maximumMapwidth) {
    widthMap = maximumMapwidth - 20;
}

heightMap = widthMap * 600 / 800;

map.width = widthMap;
map.height = heightMap;


class Mokepon {
    constructor(name, photo, life, pictureMap) {
        this.name = name;
        this.photo = photo;
        this.life = life;
        this.attacks = [];
        this.width = 40;
        this.height = 40;
        this.x = aleatorio(0, map.width - this.width);
        this.y = aleatorio(0, map.height - this.height);
        this.mapPhoto = new Image();
        this.mapPhoto.src = pictureMap;
        this.speedX = 0;
        this.speedY = 0;
    }

    paintMokepon() {
        canva.drawImage(
            this.mapPhoto,
            this.x,
            this.y,
            this.width,
            this.height
        )
    }
}

let hipodogue = new Mokepon('hipodogue', './assets/mokepons_mokepon_hipodoge_attack.png', 5, './assets/hipodoge.png');
let capipepo = new Mokepon('capipepo', './assets/mokepons_mokepon_capipepo_attack.png', 5, './assets/capipepo.png');
let ratigueya = new Mokepon('ratigueya', './assets/mokepons_mokepon_ratigueya_attack.png', 5, './assets/ratigueya.png');

let hipodogueEnemy = new Mokepon('hipodogue', './assets/mokepons_mokepon_hipodoge_attack.png', 5, './assets/hipodoge.png');
let capipepoEnemy = new Mokepon('capipepo', './assets/mokepons_mokepon_capipepo_attack.png', 5, './assets/capipepo.png');
let ratigueyaEnemy = new Mokepon('ratigueya', './assets/mokepons_mokepon_ratigueya_attack.png', 5, './assets/ratigueya.png');

hipodogue.attacks.push(
    { name: '💧', id: 'btn-water' },
    { name: '💧', id: 'btn-water' },
    { name: '💧', id: 'btn-water' },
    { name: '🔥', id: 'btn-fire' },
    { name: '🌿', id: 'btn-plant' },
);

hipodogueEnemy.attacks.push(
    { name: '💧', id: 'btn-water' },
    { name: '💧', id: 'btn-water' },
    { name: '💧', id: 'btn-water' },
    { name: '🔥', id: 'btn-fire' },
    { name: '🌿', id: 'btn-plant' },
);

capipepo.attacks.push(
    { name: '🌿', id: 'btn-plant' },
    { name: '🌿', id: 'btn-plant' },
    { name: '🌿', id: 'btn-plant' },
    { name: '💧', id: 'btn-water' },
    { name: '🔥', id: 'btn-fire' },
);

capipepoEnemy.attacks.push(
    { name: '🌿', id: 'btn-plant' },
    { name: '🌿', id: 'btn-plant' },
    { name: '🌿', id: 'btn-plant' },
    { name: '💧', id: 'btn-water' },
    { name: '🔥', id: 'btn-fire' },
);

ratigueya.attacks.push(
    { name: '🔥', id: 'btn-fire' },
    { name: '🔥', id: 'btn-fire' },
    { name: '🔥', id: 'btn-fire' },
    { name: '💧', id: 'btn-water' },
    { name: '🌿', id: 'btn-plant' },
);

ratigueyaEnemy.attacks.push(
    { name: '🔥', id: 'btn-fire' },
    { name: '🔥', id: 'btn-fire' },
    { name: '🔥', id: 'btn-fire' },
    { name: '💧', id: 'btn-water' },
    { name: '🌿', id: 'btn-plant' },
);

mokepons.push(hipodogue, capipepo, ratigueya);

function main() {
    sectionSelectAttack.style.display = 'none';
    sectionMap.style.display = 'none';
    mokepons.forEach((mokepon) => {
        optionMokepon = `
        <input type="radio" name="pet" id=${mokepon.name} />
        <label class="mokepon_card" for=${mokepon.name}>
            <p>${mokepon.name}</p>
                <img src=${mokepon.photo} alt=${mokepon.name}>
        </label>
        `;
        cardContainer.innerHTML += optionMokepon;
        inputHipodogue = document.getElementById('hipodogue');
        inputCapipepo = document.getElementById('capipepo');
        inputRatigueya = document.getElementById('ratigueya');
    });
    sectionSelectReboot.style.display = 'none';
    buttonPet.addEventListener('click', selectPetPlayer);
    buttonReboot.addEventListener('click', rebootLocation);

}

function selectPetPlayer() {
    sectionSelectPet.style.display = 'none';
    //sectionSelectAttack.style.display = 'flex';
    //canva.fillRect(5, 15, 20, 40);
    if (inputHipodogue.checked) {
        spanPetPlayer.innerHTML = inputHipodogue.id;
        petPlayer = inputHipodogue.id;
    } else if (inputCapipepo.checked) {
        spanPetPlayer.innerHTML = inputCapipepo.id;
        petPlayer = inputCapipepo.id;
    } else if (inputRatigueya.checked) {
        spanPetPlayer.innerHTML = inputRatigueya.id;
        petPlayer = inputRatigueya.id;
    } else {
        alert("No hay selección");
        //return;
        location.reload();
    }
    extractAttacks(petPlayer);
    sectionMap.style.display = 'flex';
    startMap();
}

function extractAttacks(petPlayer) {
    let attacks;
    for (let i = 0; i < mokepons.length; i++) {
        if (petPlayer === mokepons[i].name) {
            attacks = mokepons[i].attacks;
        }
    }
    showAttacks(attacks);
}

function showAttacks(attacks) {
    attacks.forEach((attack) => {
        attacksMokepon = `<button id="${attack.id}" class="btn_attack bAttack">${attack.name}</button> `
        typesAttacks.innerHTML += attacksMokepon;
    })
    buttonFire = document.getElementById("btn-fire");
    buttonPlant = document.getElementById("btn-plant");
    buttonWater = document.getElementById("btn-water");
    buttonsAttacks = document.querySelectorAll('.bAttack');
}

function attackSequence() {
    buttonsAttacks.forEach((buttonAttack) => {
        buttonAttack.addEventListener('click', (e) => {
            if (e.target.textContent === '🔥') {
                playerAttack.push('FIRE');
                buttonAttack.style.background = '#112f58';
                buttonAttack.disabled = true;
                console.log(playerAttack);
            } else if (e.target.textContent === '💧') {
                playerAttack.push('WATER');
                buttonAttack.style.background = '#112f58';
                buttonAttack.disabled = true;
                console.log(playerAttack);
            } else if (e.target.textContent === '🌿') {
                playerAttack.push('PLANT');
                buttonAttack.style.background = '#112f58';
                buttonAttack.disabled = true;
                console.log(playerAttack);
            }
            attackRandomEnemy();
        })
    });
}

function selectPetEnemy(enemyPet) {
    console.log("Mascota enemiga: " + enemyPet);
    spanPetEnemy.innerHTML = enemyPet.name;
    enemyAttacks = enemyPet.attacks;
    attackSequence();
}

function attackRandomEnemy() {
    let attackNumberEnemy = aleatorio(0, enemyAttacks.length - 1);

    if (attackNumberEnemy == 0 || attackNumberEnemy == 1) {
        enemyAttack.push('WATER');
    } else if (attackNumberEnemy == 2 || attackNumberEnemy == 3) {
        enemyAttack.push('FIRE');
    } else {
        enemyAttack.push('PLANT');
    }
    startBattle();
}

function startBattle() {
    if (playerAttack.length === 5) {
        battle();
    }
}

function indexPlayerAndEnemy(player, enemy) {
    indexPlayer = playerAttack[player];
    indexEnemy = enemyAttack[enemy];
}

function battle() {
    for (let i = 0; i < playerAttack.length; i++) {
        if (playerAttack[i] === enemyAttack[i]) {
            indexPlayerAndEnemy(i, i);
            messagesAttack("Empate", "#FFFFFF", "#FFFFFF");
        } else if (playerAttack[i] == 'FIRE' && enemyAttack[i] == 'PLANT') {
            indexPlayerAndEnemy(i, i);
            messagesAttack("Ganaste", "#27F54D", "#F52727");
            playerWins++;
            spanLifesPet.innerHTML = playerWins;
        } else if (playerAttack[i] == 'WATER' && enemyAttack[i] == 'FIRE') {
            indexPlayerAndEnemy(i, i);
            messagesAttack("Ganaste", "#27F54D", "#F52727");
            playerWins++;
            spanLifesPet.innerHTML = playerWins;
        } else if (playerAttack[i] == 'PLANT' && enemyAttack[i] == 'WATER') {
            indexPlayerAndEnemy(i, i);
            messagesAttack("Ganaste", "#27F54D", "#F52727");
            playerWins++;
            spanLifesPet.innerHTML = playerWins;
        } else {
            indexPlayerAndEnemy(i, i);
            messagesAttack("Perdiste", "#F52727", "#27F54D");
            enemyWins++;
            spanLifesPetEnemy.innerHTML = enemyWins;
        }
    }
    gameAnalysis();
}

function gameAnalysis() {
    if (playerWins === enemyWins) {
        messageFinal("Esto fue un empate");
    } else if (playerWins > enemyWins) {
        messageFinal("Felicidades! Ganaste! ");
    } else if (enemyWins > playerWins) {
        messageFinal("Lo siento, perdiste :(");
    }
}

function messagesAttack(result, colorPlayer, colorEnemy) {
    let selectedAttackPlayer = document.createElement('p');
    let selectedEnemyPlayer = document.createElement('p');

    restulBattle.innerHTML = result;
    selectedAttackPlayer.innerHTML = indexPlayer;
    selectedAttackPlayer.style.color = colorPlayer;
    selectedEnemyPlayer.innerHTML = indexEnemy;
    selectedEnemyPlayer.style.color = colorEnemy;

    playerAttackSelected.appendChild(selectedAttackPlayer);
    playerEnemySelected.appendChild(selectedEnemyPlayer);

    // descriptionAttack.innerHTML = 'Tu mascota atacó con '+ playerAttack +', la mascota del enemigo atacó con '+ enemyAttack +' ---\n '+ result;

    // sectionMessage.appendChild(descriptionAttack);

}

function messageFinal(resultFinal) {
    restulBattle.innerHTML = resultFinal;
    sectionSelectReboot.style.display = 'block';
}

function aleatorio(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
}

function rebootLocation() {
    location.reload();
}

function paintCanvas() {
    myMokepon.x = myMokepon.x + myMokepon.speedX;
    myMokepon.y = myMokepon.y + myMokepon.speedY;
    canva.clearRect(0, 0, map.width, map.height);
    canva.drawImage(
        backgroundMap,
        0,
        0,
        map.width,
        map.height
    );

    myMokepon.paintMokepon();
    hipodogueEnemy.paintMokepon();
    capipepoEnemy.paintMokepon();
    ratigueyaEnemy.paintMokepon();

    if (myMokepon.speedX !== 0 || myMokepon.speedY !== 0) {
        checkCollision(hipodogueEnemy);
        checkCollision(capipepoEnemy);
        checkCollision(ratigueyaEnemy);
    }
}

function moveRight() {
    myMokepon.speedX = 5;
}

function moveLeft() {
    myMokepon.speedX = -5;
}

function moveUp() {
    myMokepon = getMokepon();
    myMokepon.speedY = -5;
}

function moveDown() {
    myMokepon.speedY = 5;
}

function stopMove() {
    myMokepon.speedX = 0;
    myMokepon.speedY = 0;
}

function pressKey(event) {
    switch (event.key) {
        case 'ArrowUp':
            moveUp();
            break;
        case 'ArrowDown':
            moveDown();
            break;
        case 'ArrowLeft':
            moveLeft();
            break;
        case 'ArrowRight':
            moveRight();
            break;
        default:
            break;
    }
}

function startMap() {
    myMokepon = getMokepon(petPlayer);
    intervalMokepon = setInterval(paintCanvas, 50);

    window.addEventListener('keydown', pressKey);
    window.addEventListener('keyup', stopMove);
}

function getMokepon() {
    for (let i = 0; i < mokepons.length; i++) {
        if (petPlayer === mokepons[i].name) {
            return mokepons[i];
        }
    }
}

function checkCollision(enemy) {
    const enemyTop = enemy.y;
    const enemyBottom = enemy.y + enemy.height;
    const enemyLeft = enemy.x;
    const enemyRight = enemy.x + enemy.width;

    const myMokeponTop = myMokepon.y;
    const myMokeponBottom = myMokepon.y + myMokepon.height;
    const myMokeponLeft = myMokepon.x;
    const myMokeponRight = myMokepon.x + myMokepon.width;

    if (
        myMokeponBottom < enemyTop ||
        myMokeponTop > enemyBottom ||
        myMokeponRight < enemyLeft ||
        myMokeponLeft > enemyRight
    ) {
        return;
    }
    stopMove();
    clearInterval(intervalMokepon);
    console.log("Se detectó una colisión con " + enemy.name);
    sectionMap.style.display = 'none';
    sectionSelectAttack.style.display = 'flex';
    selectPetEnemy(enemy);
}

window.addEventListener('load', main);