var bg1, bg2, bg3, bg4, prison, treasureFound; 
var key, keyImg, chest, chestImg, chestExplosionImg, map, button;
var boyRunning, boyJumping, boyAttack, boyDie, girlRunning, girlJumping, girlAttack, girlDie, zombie, blackGhost, ghost;   
var chooseGirl, chooseBoy, chooseGirl1, chooseBoy1, button1; 
var gameState = "choose"; 
var choose = null; 
var counter=1;
var score = "0"

function preload(){
    bg1 = loadImage("img/bg1.jpg");
    bg2 = loadImage("img/bg2.jpg");
    bg3 = loadImage("img/bg3.jpg");
    bg4 = loadImage("img/bg.png");
    map = loadImage("img/map.jpg");
    button = loadImage("img/button.png");
    button0 = loadImage("img/button0.png");
    gameOver = loadImage("img/gameOverBG.png")

    prison = loadImage("img/prison.jpg");
    treasureFound1 = loadImage("img/treasureFound.jpg");
    chooseBG = loadImage("img/chooseBG.png")
    directionsBG = loadImage("img/directionsBG.png")

    keyImg = loadAnimation("img/Key1.png", "img/Key2.png", "img/Key3.png", "img/Key4.png", "img/Key5.png", "img/Key6.png", "img/Key7.png", "img/Key8.png"); 
    chestImg = loadImage("img/chest.png"); 
    chestExplosionImg = loadAnimation("img/chestExplosion1.png", "img/chestExplosion2.png", "img/chestExplosion3.png"); 

    boyRunning = loadAnimation("img/boyRunning1.png","img/boyRunning2.png", "img/boyRunning3.png", "img/boyRunning4.png", "img/boyRunning5.png", "img/boyRunning6.png" ); 
    boyJumping = loadAnimation("img/boyJumping1.png", "img/boyJumping2.png", "img/boyJumping3.png", "img/boyJumping4.png", "img/boyJumping5.png", "img/boyJumping6.png", "img/boyJumping7.png", "img/boyJumping8.png", "img/boyJumping9.png", "img/boyJumping10.png");
    boyAttack = loadAnimation("img/boyAttack1.png","img/boyAttack2.png","img/boyAttack3.png","img/boyAttack4.png","img/boyAttack5.png","img/boyAttack6.png","img/boyAttack7.png");
    boyDie = loadImage("img/boyDie.png");
    boy = loadImage("img/boyRunning5.png")

    girlRunning = loadAnimation("img/girlRunning1.png", "img/girlRunning2.png", "img/girlRunning3.png", "img/girlRunning4.png", "img/girlRunning5.png", "img/girlRunning6.png",  );
    girlJumping = loadAnimation("img/girlJumping1.png", "img/girlJumping2.png", "img/girlJumping3.png"); 
    girlAttack = loadAnimation("img/girlAttack.png");
    girlDie = loadImage("img/girlDie.png"); 
    girl = loadImage("img/girlRunning1.png");

    gem = loadImage("img/gem.png"); 
    coins = loadAnimation("img/coin1.png","img/coin2.png","img/coin3.png","img/coin4.png","img/coin5.png","img/coin6.png")
    ghost = loadImage("img/ghost.png");
    blackGhost = loadImage("img/blackGhost.png"); 
    zombie = loadAnimation("img/zombie1.png","img/zombie2.png","img/zombie3.png","img/zombie4.png","img/zombie5.png","img/zombie6.png","img/zombie7.png","img/zombie8.png","img/zombie9.png")
}
function setup(){
    createCanvas(800,400);
    
    chooseGirl1 = createSprite(100,320,50,50);
    chooseGirl1.addAnimation("0", girl);
    chooseGirl1.scale =1.5; 

    chooseBoy1 = createSprite(250,330,50,50);
    chooseBoy1.addAnimation("1", boy);
    chooseBoy1.scale = 1.5; 

    chooseGirl1.visible=false;
    chooseBoy1.visible=false;

    button1 = createSprite(27,25,20,20);
    button1.addImage(button0);
    button1.scale = 2;
    button1.visible = false;
    button1.scale = 0.2;

    button2 = createSprite(710,380,20,20);
    button2.addImage(button);
    button2.scale = 2;
    button2.visible = false;
    button2.scale = 0.9;

    bg = createSprite (650,200,1700,400);
    bg.addImage("background", bg4);
    bg.x = bg.width /2;
    bg.scale = 2;
    bg.visible = false;

    player = createSprite(50,50,20,20);
    player.addAnimation("boyRunning", boyRunning);
    player.addAnimation("boyJumping", boyJumping);
    player.addAnimation("boyAttack", boyAttack);
    player.addAnimation("girlRunning", girlRunning);
    player.addAnimation("girlJumping", girlJumping);
    player.addAnimation("girlAttack", girlAttack);
    player.visible = false;

    obstaclesGroup = new Group(); 
    advantagesGroup = new Group();
    coinsGroup = new Group();  
    keysGroup = new Group();  
    gemsGroup = new Group();  
    goodGhostsGroup = new Group(); 
}

function draw(){
    background(0);
    playerChoosing();
    map1(); 
    directions();
    play();
    end();
    drawSprites();
    almostThere(); 
    caught();
    textSize(35);
    fill(255);
    text("Score: $" + score, 600,50);
}

function playerChoosing(){
    if(gameState === "choose"){
        background(chooseBG);
        fill(255);
        textSize(30);
        text("Choose your character:", 20,230); 
        chooseGirl1.visible=true;
        chooseBoy1.visible=true;
    }
    if(mousePressedOver(chooseGirl1)){
        gameState = "Map"
        player.changeAnimation("girlRunning",girlRunning);
        chooseGirl1.destroy();
        chooseBoy1.destroy();
        choose = "girl";
    }
    if(mousePressedOver(chooseBoy1)){
        gameState = "Map"
        player.changeAnimation("boyRunning",boyRunning);
        chooseGirl1.destroy();
        chooseBoy1.destroy();
        choose = "boy";
    }
}
function map1(){
    if(gameState === "Map"){
        background(map);
        button1.visible=true;
    }
    if(mousePressedOver(button1)){
        gameState = "directions"
        button1.destroy(); 
    }
}
function directions(){
    if(gameState === "directions"){
        background(directionsBG);
        button2.visible = true; 
    }
    if(mousePressedOver(button2)){
        gameState = "play"
        button2.destroy();  
    }
}
function play(){
    if(gameState === "play") {
        bg.visible = true;
        player.visible = true;
        player.scale = 1.5;
        player.x=70;
        player.y=315;
        bg.velocityX = -8
        if (bg.x < 0) {
            bg.x = bg.width/2;
        }
        if (keyDown("space") && choose==="boy" /*&& player.y >= height - 70*/) {
            player.velocityY = -10;
            console.log(player.velocityY);
            player.changeAnimation("boyJumping",boyJumping);
        } else  if(keyDown("space") && choose === "girl"){
            player.velocityY = -10;
            player.changeAnimation("girlJumping",girlJumping);
        } else{
            if(choose === "boy"){
                player.changeAnimation("boyRunning",boyRunning);
            } else  
            if(choose === "girl"){
                player.changeAnimation("girlRunning",girlRunning);
            }
        }
        player.velocityY = player.velocityY + 0.8
      if(keyDown("a")){
            if(choose === "boy"){
                player.changeAnimation("boyAttack",boyAttack);
            } else  
            if(choose === "girl"){
                player.changeAnimation("girlAttack", girlAttack);
            }
            obstaclesGroup.destroyEach(); 
            bg.velocityX = 0; 
        }  else{
            if(choose === "boy"){
                player.changeAnimation("boyRunning",boyRunning);
            } else  
            if(choose === "girl"){
                player.changeAnimation("girlRunning",girlRunning);
            }
        }
        spawnObstacles(); 
        spawnGems();
        spawnCoins();
        spawnGoodGhosts(); 
        spawnKeys(); 
        if(obstaclesGroup.isTouching(player)){
            gameState = "caught";
            obstaclesGroup.destroyEach();
            coinsGroup.destroyEach();
            advantagesGroup.destroyEach();
            coinsGroup.destroyEach();
        }   
        if(keysGroup.isTouching(player)){
            gameState = "almostThere";
            obstaclesGroup.destroyEach();
            coinsGroup.destroyEach();
            advantagesGroup.destroyEach();
            coinsGroup.destroyEach();
        }  
        if(coinsGroup.isTouching(player)){
            coinsGroup.destroyEach();
            score++;
        }     
        if(gemsGroup.isTouching(player)){
            gemsGroup.destroyEach();
            score = score + 50;
        } 
    }  
}
function spawnObstacles() {
    if(frameCount % 160 === 0) {
      var obstacle = createSprite(width-20,height-80,10,40);
      obstacle.velocityX = -10;
      
      //generate random obstacles
      var rand = Math.round(random(1,2));
      switch(rand) {
        case 1: obstacle.addAnimation("1", zombie);
                break;
        case 2: obstacle.addImage(blackGhost);
                break;
        default: break;
      }         
      obstacle.scale = 2;
      obstacle.lifetime = (width/obstacle.velocityX);
      obstaclesGroup.add(obstacle);
    }
  }
  function spawnGems(){
    if(frameCount % 500 === 0){
        var advantage = createSprite(width-20,height-80,10,40);
        advantage.velocityX = -10;
        advantage.addImage(gem);
        advantage.lifetime = (width/advantage.velocityX);
        gemsGroup.add(advantage);
    }
}
function spawnGoodGhosts(){
    if(frameCount % 1200 === 0){
        var advantage = createSprite(width-20,height-80,10,40);
        advantage.velocityX = -10;
        advantage.addImage(ghost); 
        advantage.lifetime = (width/advantage.velocityX);
        goodGhostsGroup.add(advantage);
    }
}
function spawnCoins(){
    if(frameCount % 150 === 0){
        var coin = createSprite(width-20,height-80,10,40);
        coin.addAnimation("0", coins);
        coin.velocityX = -10;
        coin.lifetime = (width/coin.velocityX);
        coinsGroup.add(coin);
    }
}
function caught(){
    if(gameState === "caught"){
     background(prison);
     fill(255);
     bg.visible = false;
     textSize(25);
     text("Type in the correct password in to escape!", 250,50);
     textSize(15);
     
        if(counter===1){
            text("Hint: From my reflection, you will see your complexion.", 250, 100);
            } else if (counter===2){
                text("Hint: I have cities, but no houses. I have mountains, but no trees. I have water, but no fish. What am I?",50, 100) ;
            } else if(counter===3){
              text("Hint: What disappears as soon as you say its name?", 250, 100);
            } else if(counter===4){
                  text("Hint: I have keys, but cannot unlock anything. What am I?", 250, 100); 
            }
     var input = createInput("Password");
     input.position(500,150);
     password = input.value();
     var button = createButton("Submit");
     button.position(560,175);
     button.mousePressed(function(){
       if(input.value() === "mirror" || input.value() ==="MIRROR" ||input.value() === "Mirror" ||input.value() === "silence" || input.value() ==="Silence" ||input.value() === "SILENCE" ||input.value() ==="map" ||input.value() === "MAP" || input.value() ==="Map" ||input.value() === "piano" || input.value() ==="PIANO" ||input.value() === "Piano"){
       input.hide();
       button.hide();
       gameState = "play"; 
       } else {
           fill(255);
           textSize(15); 
           text("Uh oh! That's the wrong password!" , 20, 200); 
           text("You have one more chance before your stuck!", 20, 250); 
       }
     }); 
    }
    if(counter > 4){
        counter = 1; 
    }
}
function almostThere(){
    if(gameState === "almostThere"){
     fill(255);
     textSize(25);
     bg.visible = false; 
     text("Type in the correct password in to get the Treasure!", 10,100);
     textSize(15); 
    if(counter===1){
        text("Hint: What is it that given one, you'll have either two or none?", 250, 100);
    } else if (counter===2){
        text("Hint: What can you break, even if you never pick it up or touch it?",50, 100) ;
    } else if(counter===3){
        text("Hint: The more of this there is, the less you see. What is it?", 250, 100);
    } else if(counter===4){
        text("Hint: Where does today come before yesterday?", 250, 100); 
    } 
     background(bg2);
     var input = createInput("Password");
     input.position(500,150);
     treasurePassword = input.value();
     var buttons = createButton("Submit");
     buttons.position(560,175);
     buttons.mousePressed(function(){
       if(input.value() === "a choice" || input.value() ==="A CHOICE" ||input.value() === "A choice" || input.value() === "Darkness" || input.value() ==="darkness" ||input.value() === "DARKNESS"||input.value() === "choice" || input.value() ==="CHOICE" ||input.value() === "Choice" ||input.value() ==="a promise" ||input.value() === "A PROMISE" || input.value() ==="A promise" ||input.value() === "promise" || input.value() ==="PROMISE" ||input.value() === "Promise"||input.value() === "dictionary" || input.value() ==="Dictionary" ||input.value() === "DICTIONARY"){
       input.hide();
       button.hide();
       gameState = "treasureFound"; 
       } else {
           fill(255);
           textSize(15); 
           text("Uh oh! That's the wrong password!" , 20, 200); 
           text("You have one more chance before you die!", 20, 250); 
       }
     }); 
    }
    treasureFound();
    if(counter > 4){
        counter = 1; 
    }
}
function treasureFound(){
    if(gameState === "treasureFound"){
    background(treasureFound1); 
    }
}
function end(){
    if(gameState === "end"){
        bg.visible = false;
        player.visible = false;
        obstaclesGroup.destroyEach();
        advantagesGroup.destroyEach(); 
        background(gameOver);
    }
}
function spawnKeys(){
    var rand = Math.round(random(1000,10000))
    if(frameCount % rand === 0){
        var key = createSprite(width-20,height-80,10,40);
        key.addAnimation("0", keyImg);
        key.velocityX = -30;
        key.y = Math.round(random(50,350)); 
        keysGroup.add(key)
    }
}