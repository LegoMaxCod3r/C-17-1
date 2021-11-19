var trex, trex_running, trex_collided;
var jumpSound, dieSound, checkPointSound;
var ground, invisibleGround, groundImage;
var cloud, cloudImage;
var obstacle1, obstacle2,obstacle3,obstacle4,obstacle5,obstacle6;
var obstaclesGroup, cloudsGroup;
var gameOver,reStart;


var PLAY = 1;
var END = 0;
var gameState=PLAY;
var score=0;


function preload(){
  trex_running = loadAnimation("trex1.png","trex2.png","trex3.png");
  trex_collided = loadImage("trex_collided.png");
  gameOverImg = loadImage("gameOver.png");
  reStartImg = loadImage("restart.png");

  jumpSound = loadSound("jump.mp3");
  dieSound = loadSound("die.mp3");
  checkPointSound = loadSound("checkpoint.mp3");

  groundImage = loadImage("ground2.png");
  
  cloudImage = loadImage("cloud.png");
 
  obstacle1 = loadImage("obstacle1.png");
  obstacle2 = loadImage("obstacle2.png");
  obstacle3 = loadImage("obstacle3.png");
  obstacle4 = loadImage("obstacle4.png");
  obstacle5 = loadImage("obstacle5.png");
  obstacle6 = loadImage("obstacle6.png");



}

function setup() {

  createCanvas(600,200)
  

  //crear sprite de trex
  trex = createSprite(50,160,20,50);
  trex.addAnimation("running", trex_running);
  trex.addAnimation("collided", trex_collided);
  trex.scale = 0.5;
  
  //crear sprite de suelo
  ground = createSprite(200,180,400,20);
  ground.addImage("ground",groundImage);
  ground.x = ground.width /2;
  ground.velocityX = -4;
  
  //console.log("hello"+"World");

  gameOver=createSprite(300,100);
  gameOver.addImage(gameOverImg);
  reStart=createSprite(300,140);
  reStart.addImage(reStartImg);
  gameOver.visible=false;
  reStart.visible=false;


  gameOver.scale=2;
  reStart.scale=.5;

  //crear sprite de suelo invisible
  invisibleGround = createSprite(200,190,400,10);
  invisibleGround.visible = false;
  
  //generar números aleatorios
  //var rand =  Math.round(random(1,100))
  //console.log(rand)

  obstaclesGroup=new Group();
  cloudsGroup=new Group();

}

function draw() {
  //establecer color de fondo
  background(180);
  
  trex.setCollider("circle", 0,0,35);
  //trex.debug=true;
  //console.log(gameState);


  text("score: " + score, 500, 50)
  

  if(score>0 && score%100===0){

    checkPointSound.play();


  }
  //console.log(trex.y)
  
  

  if(gameState===PLAY){
    //hacer que el trex salte al presionar la barra espaciadora
    if(keyDown("space")&& trex.y >= 160) {
      trex.velocityY = -10;
      jumpSound.play();
    
    }
    score = score+Math.round(getFrameRate(30));
    trex.velocityY = trex.velocityY + 0.8
    if (ground.x < 0){
      ground.x = ground.width/2;
    }
      //aparecer nubes
      spawnClouds();

      spawnObstacles();

      if(obstaclesGroup.isTouching(trex)){
        //trex.velocityY=-12;
        //jumpSound.play();
        gameState=END;
        dieSound.play();

        //console.log("choco")
      }

  }
  else if(gameState===END){
    ground.velocityX=0;
    trex.velocityY=0;
    obstaclesGroup.setVelocityXEach(0);
    cloudsGroup.setVelocityXEach(0);
    obstaclesGroup.setLifetimeEach(-1);
    cloudsGroup.setLifetimeEach(-1);
    //Cambiar animacion
    trex.changeAnimation("collided", trex_collided);
    
    
    gameOver.visible=true;
    reStart.visible=true;
    
  }
  

  //evitar que el trex caiga
  trex.collide(invisibleGround);
  if(gameState===END){
    if(mousePressedOver(reStart)){
      reset();
      
      //console.log("Reinicio De Juego");
    }
    

  }
  
  

  
  
  drawSprites();
}

function reset(){
  gameState=PLAY;
  gameOver.visible=false;
  reStart.visible=false;
  obstaclesGroup.destroyEach();
  cloudsGroup.destroyEach();
  trex.changeAnimation("running", trex_running);
  score=0;

}

function spawnObstacles() {
  var obstacle;
  if(frameCount%60===0){

    obstacle = createSprite(600,160,10,40);
    obstacle.velocityX= -6;
    
    ground.velocityX=-(4+3*score/1000);
    obstacle.velocityX=-(6+score/1000);


    var rand = Math.round(random(1,6));

    switch(rand){

      case 1:
        obstacle.addImage(obstacle1);
        break;

      case 2:
        obstacle.addImage(obstacle2);
        break;

      case 3:
         obstacle.addImage(obstacle3);
         break;

      case 4:
          obstacle.addImage(obstacle4);
          break;

      case 5:
         obstacle.addImage(obstacle5);
         break;
   
      case 6:
        obstacle.addImage(obstacle6);
         break;


    }

    
    obstacle.scale=0.5;
    
    obstacle.depth=trex.depth;
    trex.depth=trex.depth+1;
  
    obstacle.lifetime=300;

    obstaclesGroup.add(obstacle);
  }



}



//función para aparecer las nubes
function spawnClouds(){
 //escribir aquí el código 
 


 if(frameCount%60===0){
  //console.log(frameCount);


  cloud = createSprite(600,100,40,10);
  cloud.velocityX= -3;

  cloud.addImage(cloudImage);
  cloud.scale=Math.random(0.5,1);
  cloud.y=Math.round(random(10,100));
  cloud.depth=trex.depth;
  trex.depth=trex.depth+1;

  cloud.lifetime=200;

  console.log(trex.depth);
  console.log(cloud.depth);

  cloudsGroup.add(cloud);

 }


}




