let playerAttack;
let enemyAttack;
let playerLifes = 3;
let enemyLifes = 3


function main() {
    let buttonPet = document.getElementById("btn-pet");
    buttonPet.addEventListener('click', selectPetPlayer);

    let buttonWater = document.getElementById("btn-water");
    buttonWater.addEventListener('click', attackTypeWater);

    let buttonFire = document.getElementById("btn-fire");
    buttonFire.addEventListener('click', attackTypeFire);

    let buttonPlant = document.getElementById("btn-plant");
    buttonPlant.addEventListener('click', attackTypePlant);
    
    let buttonReboot = document.getElementById("reboot");
    buttonReboot.addEventListener('click', rebootLocation);
}

function selectPetPlayer() {
    let inputHipodogue = document.getElementById('hipodogue');
    let inputCapipepo = document.getElementById('capipepo');
    let inputRatigueya = document.getElementById('ratigueya');    
    let spanPetPlayer = document.getElementById('player-pet');    


    if (inputHipodogue.checked) {
        spanPetPlayer.innerHTML = 'Hipodogue';
    } else if (inputCapipepo.checked) {
        spanPetPlayer.innerHTML = 'Capipepo';
    } else if (inputRatigueya.checked) {  
        spanPetPlayer.innerHTML = 'Ratigueya';
    } else {
        alert("No hay selección");
        return;
    }

    selectPetEnemy();

}

function selectPetEnemy() {

    let spanPetEnemy = document.getElementById('enemy-pet');    
    let enemyPet = aleatorio(1,3);

    if (enemyPet == 1) {
        spanPetEnemy.innerHTML = 'Hipodogue';
    } else if (enemyPet == 2) {
        spanPetEnemy.innerHTML = 'Capipepo';
    } else {
        spanPetEnemy.innerHTML = 'Ratigueya';
    }

}

function attackTypeWater() {
    playerAttack = 'WATER';
    attackRandomEnemy();
}

function attackTypeFire() {
    playerAttack = 'FIRE';
    attackRandomEnemy();
}

function attackTypePlant() {
    playerAttack = 'PLANT';
    attackRandomEnemy();
}

function attackRandomEnemy() {    
    let attackNumberEnemy = aleatorio(1,3);

    if (attackNumberEnemy == 1) {
        enemyAttack = 'WATER';
    } else if (attackNumberEnemy == 2) {
        enemyAttack = 'FIRE';
    } else {
        enemyAttack = 'PLANT';
    }

    battle();    
}

function battle(){
    let spanLifesPet = document.getElementById('pet-lifes');
    let spanLifesPetEnemy = document.getElementById('enemy-pet-lifes');
    if (playerAttack == enemyAttack) {
        messagesAttack("Empate");
      } else if (playerAttack == 'FIRE' && enemyAttack == 'PLANT') {
        messagesAttack("Ganaste");
        enemyLifes--;
        spanLifesPetEnemy.innerHTML = enemyLifes;
      } else if (playerAttack == 'WATER' && enemyAttack == 'FIRE') {
        messagesAttack("Ganaste");
        enemyLifes--;
        spanLifesPetEnemy.innerHTML = enemyLifes;
      } else if (playerAttack == 'PLANT' && enemyAttack == 'WATER') {
        messagesAttack("Ganaste");
        enemyLifes--;
        spanLifesPetEnemy.innerHTML = enemyLifes;
      } else {
        messagesAttack("Perdiste");
        playerLifes--;
        spanLifesPet.innerHTML = playerLifes;
      }

      gameAnalysis();
}

function gameAnalysis() {
    if (playerLifes == 0) {
        messageFinal ("Vuelve a intentarlo, perdiste");
    } else if (enemyLifes == 0) {
        messageFinal ("Felicidades! Ganaste! ");
    }
}

function messagesAttack(result) {
    let sectionMessage = document.getElementById('messages');

    let descriptionAttack = document.createElement('p');
    descriptionAttack.innerHTML = 'Tu mascota atacó con '+ playerAttack +', la mascota del enemigo atacó con '+ enemyAttack +' ---\n '+ result;

    sectionMessage.appendChild(descriptionAttack);

}

function messageFinal(resultFinal) {
    let sectionMessage = document.getElementById('messages');

    let descriptionAttack = document.createElement('p');
    descriptionAttack.innerHTML = resultFinal;

    sectionMessage.appendChild(descriptionAttack);

    let buttonWater = document.getElementById("btn-water");
    buttonWater.disabled = true;

    let buttonFire = document.getElementById("btn-fire");
    buttonFire.disabled = true;

    let buttonPlant = document.getElementById("btn-plant");
    buttonPlant.disabled = true;
}

function aleatorio(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
}

function rebootLocation(){
    location.reload();
}

window.addEventListener('load', main);



