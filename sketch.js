//creatin global variables

var ground;
var deer,deerJump,deerDown,deadDear,deerImg;
var lion,lionImg;
var bg,bgbg;
var start,startImg;
var skip,skipImg
var wood,woodImg,woodGroup;
var mount,mountImg,mountGroup;
var reset,resetImg;
var score = 0;
var food = 0;
var gameState = "home";

function preload(){

  //loading pictures

  jungleImg = loadImage("Jungle-Image.jpg")
  deerImg = loadImage("deer.png")
  lionImg = loadImage("cheetah.png");
  bgbg = loadImage("gameforest.jpg")
  woodImg = loadImage("wood.png")
  startImg = loadImage("green-start-button-png-2.png")
  mountImg = loadImage("Mountain.png")
  stoneImg = loadImage("obstacle[1].png")
  deerDown =loadImage("deer head down.png")
  deerJump = loadImage("Deer jump.jpg")
  deadDeer = loadImage("dead deer.png")
  skipImg = loadImage("Skip.png")
  resetImg = loadImage("restart.png")
}

function setup() {
  //canvas

  createCanvas(1500,750);
  
  //creating background
  bg = createSprite(500,500,10,10);
  bg.addImage("bgbg",jungleImg);
  bg.addImage("djjd",bgbg);
  bg.scale = 1.355;
  bg.velocityX = 0;
  
  //creating ground;
  ground = createSprite(600,700,1000,10);
  ground.visible = false;
  
  //creating deer
  deer = createSprite(600,500,20,20);
  deer.addImage("deerii",deerImg);
  deer.addImage("kd",deerDown);
  deer.addImage("d",deerJump);
  deer.addImage("dd",deadDeer)
  deer.scale = 0.15;
  //deer.debug = true;
  
  //creating start button
  start = createSprite(500,500,20,20);
  start.addImage("jj",startImg);
  start.scale = 0.2;
  
  //creating skip button
  skip = createSprite(1095,673,20,20);
  skip.addImage("ss",skipImg);
  skip.scale = 0.5;
  
  //creating restart button
  reset = createSprite(750,375,20,20);
  reset.addImage("re",resetImg);
  reset.scale = 0.5;

  //creating lion
  lion = createSprite(150,500,20,20);
  lion.addImage("lionii",lionImg);
  lion.scale = 0.6;
 // lion.debug = true;
  lion.setCollider("rectangle",0,0,400,100);

  //new Groups
  woodGroup = new Group();
  stoneGroup = new Group();  
  mountGroup = new Group();
}

function draw() {
  background("pink");
  drawSprites();
  console.log(gameState);
  //gameState is home
  if(gameState === "home"){
    //visibility
    lion.visible = false;
    deer.visible = false;
    bg.visible = true;
    start.visible = true;
    skip.visible = false;
    reset.visible = false;
    //creating story state
    if(mousePressedOver(start)){
      gameState = "story";
    }
  }

  //gameState is story
  if(gameState === "story"){
    bg.visible = false;
    deer.visible = false;
    lion.visible = false;
    bg.visible = false;
    start.visible = false;
    skip.visible = true;
    reset.visible = false;
    textSize(30);
    textFont("lucida");
    stroke("white");
    strokeWeight(10);
    fill("red");
    text("FURIOUS FOREST",700,50);
    textSize(20);
    stroke("white");
    strokeWeight(5);
    fill("green");
    text("A cheeta named Spoty is chasing a deer named Goldy . Spoty is a cunning,dangerous and cruel cheeta , it has been killing animals and now it is trying to kill goldy",20,153);
    text("While Goldy is hard-working and good . She doesn't hurt anyone . One day Spoty saw Goldy and started chasing Goldy . Goldy got scared and started running away",20,200);
    text("Goldy runs very fast, but you that forests are full of stones and mountains and Goldy is a young deer she doest know much about the forest.So can you help her cross",20,247);
    text(" the obstacles . Here's what you need to do :",20,310);
    text("1) Stones come at different heights and intervals so when a stone comes over Goldy press down arrow to head down and press up arrow to jump over small stones ",20,357);
    text("2) Mountains are big and high objects so to jump over a mountain press space",20,403);
    text("3) Goldy needs energy to run in the forest as he runs his energy level decreses so to increase his energy level he needs to eat some grass so press space/up arrow",20,440);
    text(" to collect grass",30,480);
    text("4) If Goldy touches the stones or mountains or if  Spoty eats Goldy and you will lose to play again press r",20,510)
    text("5) Click on skip to start playing ",20,555)
    if(mousePressedOver(skip)){
      gameState = "start";
    }
  }

  //gameState is start
  if(gameState ==="start"){
    //changes in background
    bg.visible = true;
    bg.changeImage("djjd",bgbg);
    bg.scale = 6.7;  
    bg.velocityX =-( 5 + 3*score/250);
    if(bg.x<0){
      bg.x = bg.width/2; 
    }
  //visibility
    deer.visible = true;
    lion.visible = true;
    start.visible = false;
    skip.visible = false;
    //score
    score = Math.round(frameCount/2);
    stroke("yellow");
    fill("red");
    textSize(20);
    text("Score : "+ score,1250,100);
    //MOVEMENTS OF THE DEER
    if(keyDown("space")){
      deer.velocityY = -15
      deer.changeAnimation("d",deerJump);
      deer.scale = 0.30;
    }
    if(keyDown("UP_ARROW")){
      deer.velocityY = -8
      deer.changeAnimation("d",deerJump);
      deer.scale = 0.30;
    }
    if(keyDown("DOWN_ARROW")){
      deer.changeAnimation("kd",deerDown);
      deer.scale = 0.18;
    }
   //gravity
    deer.velocityY = deer.velocityY + 0.8;
    lion.velocityY = lion.velocityY + 0.8;
    //artificial intelligence to lion
    if(lion.isTouching(stoneGroup)){
      lion.velocityY = -15;
    }
    //Spawningfunctions;
    spawnStone(); 
    spawnMountain();
    spawnWood();

    //contact with ground
  if(deer.isTouching(ground)){
    deer.changeImage("deerii",deerImg);
    deer.scale = 0.15;
  }
  //food
  if(deer.isTouching(woodGroup))
  {
    food = food + 10
    woodGroup.destroyEach();
  }
  stroke("yellow");
  fill("red");
  textSize(20);
  text("Food"+":"+food,1250,150);

  if(deer.isTouching(stoneGroup) || deer.isTouching(mountGroup)){
    gameState = "end";
  }
  if(gameState === "end"){
    bg.visible =  false;
    bg.velocityX =0;
    deer.changeImage("dd",deadDeer);
    deer.scale = 1;
    deer.x = 800;
    deer.velocityY = 0;
    lion.velocityY = 0;
    lion.x = 500;
    lion.y = 700;
    reset.visible = true;
    fill("red");
    stroke("white");
    strokeWeight(5);
    textSize(20);
    text("I am sorry , Spoty killed goldy ",710,185);
    text("Better luck next time",710,200);
    text("Press on reset to play again",710,215);
    stoneGroup.destroyEach();
    mountGroup.destroyEach();
    woodGroup.destroyEach();
    //restarting the game
    if(mousePressedOver(reset)){
      //everything should start from play
      gameState = "play"
    }
  }
}

   //collide with ground
  lion.collide(ground);
  deer.collide(ground);
         
  text(mouseX+","+mouseY,mouseX,mouseY);
  //console.log(frameCount);
}

//SPAWNING WOOD
function spawnWood(){
  if(frameCount%167===0){
    wood = createSprite(1200,800,20,20);
    wood.addImage("wo",woodImg);
    wood.scale = 0.08;
    wood.y = Math.round(random(150,400));
    wood.velocityX =-( 2 + 3*score/250);
    wood.lifetime = 1500/2; 
    //wood.debug = true;
    woodGroup.add(wood);
  }
}
//SPAWNING MOUNTAIN
function spawnMountain(){
  if(frameCount%473===0){
    mount = createSprite(1200,800,20,20);
    mount.addImage("moo",mountImg);
    mount.scale = 0.65;
    mount.y = Math.round(random(550,730));
    mount.velocityX =-( 2 + 3*score/250);
    mount.lifetime = 1500/2; 
    mountGroup.add(mount);
  }
}
//SPWNING STONE
function spawnStone(){
  if(frameCount%117===0){
    stone = createSprite(1200,600,20,20);
    stone.addImage("sooo",stoneImg);
    stone.y = Math.round(random(550,730));
    stone.scale = 0.2;
    stone.velocityX =-( 2 + 3*score/250);
    stone.lifetime = 1500/2; 
    stoneGroup.add(stone);
  }
}