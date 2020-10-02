var START = 1;
var PLAY = 2;
var END = 0;
var gameState =START;

var harryPotter,harryPotterImg;
var dementor,dementorImg,dementorGroup;
var hocrux,hocrux1Img,hocrux2Img,hocrux3Img,
    hocrux4Img,hocrux5Img,hocrux6Img,hocruxGroup;
var gameOver,gameOverImg,restart,restartImg;

var castleImg,castleMusic,forestImg,forest;

var invisibleBlock1,invisibleBlock2;

var score = 0;

function preload(){

  //loading images and sounds
  castleMusic = loadSound("harry.mp3");
  
  harryPotterImg = loadImage("harry potter.png");
  dementorImg = loadImage("dementors.png");
  hocrux1Img = loadImage("diadem.png");
  hocrux2Img = loadImage("cup.png");
  hocrux3Img = loadImage("locket.png");
  hocrux4Img = loadImage("nagini.png");
  hocrux5Img = loadImage("ring.png");
  hocrux6Img = loadImage("tom riddle's diary.png");
  gameOverImg = loadImage("game over.png");
  restartImg = loadImage("restart.png");
  castleImg = loadImage("hogwarts image.jpg");
  forestImg = loadImage("forbidden forest.jpg");
    
  //creating groups
  dementorGroup = new Group();
  hocruxGroup = new Group();

}

function setup(){
  createCanvas(600,400);
    
  //creating sprites for forest,harryPotter,gameOver,restart
  forest = createSprite(300,200);
  forest.addImage("forest",forestImg);
  forest.velocityX = -(4+score/2);
  forest.scale = 1.5;
  
  harryPotter = createSprite(50,200,20,20);
  harryPotter.addImage("harryPotter",harryPotterImg);
  harryPotter.scale = 0.4;
  
  gameOver = createSprite(280,200,20,20);
  gameOver.addImage("gameOver",gameOverImg);
  gameOver.scale = 0.6;
  
  restart = createSprite(300,240,20,20);
  restart.addImage("restart",restartImg);
  restart.scale = 0.3;
  
  //creating sprites for topEdge and bottomEdge
  invisibleBlock1 = createSprite(300,2,1000,2);
  invisibleBlock2 = createSprite(300,398,1000,2);
  
  //playing music
  castleMusic.loop();
}

function draw(){
  
  if (gameState === START)
  {
    background(castleImg);
    
    //making the sprites invisible
    forest.visible = false;
    gameOver.visible = false;
    restart.visible = false;
    harryPotter.visible = false;
    invisibleBlock1.visible = false;
    invisibleBlock2.visible = false;
    
    //writing instructions
    textSize(20);
    fill("white")
    text("Help Save Harry Potter From The Dementors", 140,200);     
    text("And Collect The Hocruxes",200,240);
    text("Use The Arrow Keys To Move Harry",170,280);
    text("Press Spacebar To Start",200,320);
    
    //changing gamestate to PLAY
    if(keyDown("space"))
    {
      gameState = PLAY;
    }
  }
  if(gameState === PLAY)
  {
    //making the sprites invisible
    invisibleBlock1.visible = false;
    invisibleBlock2.visible = false;
    
    //making the forest visible
    forest.visible = true;
    
    //assigning velocity
    forest.velocityX = -(4+score/5);
    
    //makin the forest continuous
    if(forest.x < 50)
    {
      forest.x = 300;
    }
    
    //making harry potter visible
    harryPotter.visible = true;
      
    //calling the functions
    spawnDementor();
    spawnHocruxes();
    
    //making harry bounce from invisible blocks
    harryPotter.bounceOff(invisibleBlock1);
    harryPotter.bounceOff(invisibleBlock2);
    
    //making harry follow the arrow keys
    if(keyDown("up_arrow"))
    {
      harryPotter.velocityY = -4;
    }
    
     if(keyDown("down_arrow"))
    {
      harryPotter.velocityY = 4;
    }
    
    //adding points
    if (hocruxGroup.isTouching(harryPotter))
    {
      score = score+1;
      hocruxGroup.destroyEach();
    }
    
    //changing gamestate to END
    if (dementorGroup.isTouching(harryPotter))
    {
      gameState = END;
    }
  }
  
  if(gameState === END)
  {
    //making the sprites invisible
    invisibleBlock1.visible = false;
    invisibleBlock2.visible = false;
    
    //making the sprites stop
    hocruxGroup.setVelocityXEach(0);
    dementorGroup.setVelocityXEach(0);
    
    //setting -1 liftime so that they are not destroyed
    dementorGroup.setLifetimeEach(-1);
    hocruxGroup.setLifetimeEach(-1);
    
    //making harry and the forest to stop
    forest.velocityX = 0;
    harryPotter.velocityY  = 0;
        
    //making the game Over and restart visible
    gameOver.visible = true;
    restart.visible = true    
    
  }
  
  //resetting the game
  if(keyDown("R"))
    {
      reset();
    }
  
  //drawing sprites
  drawSprites();
  
  //number of hocruxes collected
  textSize(20);
  fill("white");
  text ("Hocruxes = "+score,100,50);
}

function reset()
{
  //destoying the groups
  dementorGroup.destroyEach();
  hocruxGroup.destroyEach(); 
  //changing gamestate to START
  gameState = START;
  //resetting score
  score = 0;

}

function spawnDementor()
{
  if(frameCount%260===0)
  {
    //creating dementor sprite
    var dementor = createSprite(400,250,20,20);
    //adding image
    dementor.addImage("dementor",dementorImg);
    //scaling the dementor
    dementor.scale = 0.7;
    //adding velocity
    dementor.velocityX = -(4 + score/5);
    //adding lifetime
    dementor.lifetime = 400;
    //adding to the group
    dementorGroup.add(dementor);
  }
}
function spawnHocruxes()
{
  if(frameCount%300===0)
  {
    //creating hocrux sprite
    var hocrux = createSprite(400,250,20,20);
    //adding velocity
    hocrux.velocityX = -(4 + score/5);  
    //scaling
    hocrux.scale = 0.1; 
    //making random hocruxes appear
    var rand = Math.round(random(1,6));
    switch(rand)
    {
       case 1: hocrux.addImage(hocrux1Img);
              break;
       case 2: hocrux.addImage(hocrux2Img);
              break;   
       case 3: hocrux.addImage(hocrux3Img);
              break;
       case 4: hocrux.addImage(hocrux4Img);
              break; 
       case 5: hocrux.addImage(hocrux5Img);
              break; 
       case 6: hocrux.addImage(hocrux6Img);
              break;       
    }
    //adding lifetime
    hocrux.lifetime = 400;
    //adding to the group
    hocruxGroup.add(hocrux);
  }
}