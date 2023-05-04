var bg, bgImg
var bottomGround
var topGround
var boy, boyImg
var ob1,ob2,ob3,z2,z1
var PLAY=1;
var END=0;
var gameState = PLAY;
var deadImg
var score=0
var bg_sound
var dead_sound
var jump_sound

function preload(){
bgImg = loadImage("assets/background.jpg");
boyImg = loadAnimation("assets/run1.png","assets/run2.png","assets/run3.png","assets/run4.png","assets/run5.png");
deadImg = loadAnimation("assets/dead.png");
zImg=loadImage("assets/Big zombie.png");
zImg2=loadImage("assets/Zombie.png");
obImg2=loadImage("assets/cactus.png");
obImg3=loadImage("assets/obs.png");

bg_sound = loadSound("assets/bg.mp3");
jump_sound = loadSound("assets/jump.mp3")
dead_sound = loadSound("assets/dead.mp3")


gameOverImg=loadImage("assets/gameOver.png");
restartImg=loadImage("assets/restart.png");
}

function setup(){

  createCanvas(700,700)
//background image
bg = createSprite(185,355);
bg.addImage(bgImg);
bg.scale = 2

//creating top and bottom grounds
bottomGround = createSprite(200,600,800,20);
bottomGround.visible = false;

gameOver = createSprite(350,350);
gameOver.addImage(gameOverImg)
gameOver.visible = false;

restart = createSprite(350,450);
restart.addImage(restartImg)
restart.visible = false;

//creating boy     
boy = createSprite(100,600,20,200);
boy.addAnimation("boy",boyImg);
boy.addAnimation("dead",deadImg);
boy.scale = 0.3;
//boy.debug=true
boy.setCollider("circle",0,0,30)


obstacleGroup = new Group();

score=0

}

function draw() {
  
  background("black");
 
if(gameState===PLAY){
  score = score + Math.round(getFrameRate()/60);
  bg.velocityX=-5
  if(bg.x<100){
    bg.x=bg.width/2
    bg_sound.play()
     }
    obstacle()
  if(keyDown("space")&& boy.y>570){
          boy.velocityY=-15;
          jump_sound.play();
          }
  boy.velocityY=boy.velocityY+0.8
  boy.collide(bottomGround)

  if(obstacleGroup.isTouching(boy)){
    gameState=END
  }
}
else if(gameState===END){
bg.velocityX=0
gameOver.visible=true;
restart.visible=true;
obstacleGroup.setVelocityXEach(0);
boy.velocityX=0
boy.velocityY=0
boy.changeAnimation("dead",deadImg)
dead_sound.play()

}

if(mousePressedOver(restart)){
  reset();
}

        drawSprites();
        text("score:"+ score,500,50);
        
}
function obstacle(){
  if(frameCount % 60===0){
    var obstacles =createSprite(600,600,10,40)
    obstacles.velocityX=-5
    obstacles.scale=0.5
    //obstacles.debug=true
    obstacle.velocityX=-(6+3*score/100);

    obstacles.setCollider("circle",0,0,55)
    var rand=Math.round(random(1,2));
    switch (rand){
        case 1: obstacles.addImage("c2",obImg2);
        break;
        case 2: obstacles.addImage(obImg3);
        break;
    }
    obstacleGroup.add(obstacles)


  }
}

function reset(){
  gameState=PLAY;
  gameOver.visible=false
  restart.visible=false

  obstacleGroup.destroyEach();
  
  boy.changeAnimation("boy",boyImg);
  
  score=0
}