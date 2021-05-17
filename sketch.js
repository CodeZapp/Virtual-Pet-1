//Create variables here
var dog, happyDog, database, foodS, foodStock;

function preload()
{
  //load images here
  dog = loadImage("images/Dog.png");
  happyDog = loadImage("images/happyDog.png");
}

function setup() {
	createCanvas(500, 500);
  database = firebase.database();
  foodStock = database.ref('Food');
  foodStock.on("value", readStock);
  Dog = createSprite(250, 300, 50, 50);
  Dog.addImage(dog);
  Dog.scale = 0.15;
}


function draw() {  
  background(46, 139, 87);
  if (keyWentDown(UP_ARROW)) {
    writeStock(foodS);
    Dog.addImage(happyDog);
  }
  drawSprites();
  //add styles here
  fill(255, 255, 255);
  stroke(10);
  text("Note: Press UP_ARROW Key To Feed Milk To The Dog.", 10, 20);
}

//Function to read values from DB
function readStock(data){
  foodS = data.val();
}

//Function to write values from DB
function writeStock(x){
  if (x <= 0) {
    x = 0;
  } else {
    x = x - 1;
  }
  database.ref('/').update({
    Food: x
  })
}