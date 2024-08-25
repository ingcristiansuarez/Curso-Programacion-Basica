function main(){
    let buttonPet = document.getElementById("btn-pet");
    buttonPet.addEventListener('click', selectPetPlayer);
}


function aleatorio(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
}

function selectPetPlayer(){
    let gameStarted = true;
    let inputHipodogue = document.getElementById('hipodogue');
    let inputCapipepo = document.getElementById('capipepo');
    let inputRatigueya = document.getElementById('ratigueya');    
    let spanPetPlayer = document.getElementById('player-pet');
    let spanPetEnemy = document.getElementById('enemy-pet');


    if (inputHipodogue.checked) {
        spanPetPlayer.innerHTML = 'Hipodogue';
    } else if (inputCapipepo.checked) {
        spanPetPlayer.innerHTML = 'Capipepo';
    } else if (inputRatigueya.checked) {  
        spanPetPlayer.innerHTML = 'Ratigueya';
    } else {
        alert("No hay selección");
        gameStarted= false;
    }

    if (gameStarted) {
        let enemyAttack = aleatorio(1,3);
        if (enemyAttack == 1) {
            spanPetEnemy.innerHTML = 'Hipodogue';
        } else if (enemyAttack == 2) {
            spanPetEnemy.innerHTML = 'Capipepo';
        } else {
            spanPetEnemy.innerHTML = 'Ratigueya';
        }
    }
    
}


window.addEventListener('load', main);



