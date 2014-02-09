/**
 * Main Javascript file for initializing the Taco King Saga app
 * Load all resources here then launch the main program
 *
 * @type {}
 */

// Create a canvas to work on; this is the main game window
// Get a context to draw with and
var canvas = document.createElement("canvas");
var ctx = canvas.getContext("2d");

// Display lists and data
var imageResources = [], displayList = [], spriteList = [];

// State data
var gameState = STATEENUM.loadingscreen,
    tacoButton, now, dt, last, SCREENCENTERX, SCREENCENTERY,
    mouseX = 0, mouseY = 0, clicked = false;

//TODO: Create a loader that reacts to this event
function onImagesLoaded(callValue) {
    imageResources = callValue;
    tacoButton = new TacoButton(imageResources[1], imageResources[2], "  START");
    tacoButton.setPosition(SCREENCENTERX - tacoButton.width / 2, SCREENCENTERY + 120);
    loadMainMenu();
    loadSprites();
}

// Initialization
function initialize() {
    canvas.addEventListener('click', handleClicks, false);
    //canvas.addEventListener('onmousemove', handleMoves, false);
    last = getTime();
    loadImages(IMAGES, onImagesLoaded);
    ctx.canvas.width = 854;
    ctx.canvas.height = 480;
    SCREENCENTERX = ctx.canvas.width / 2;
    SCREENCENTERY = ctx.canvas.height / 2;
    document.body.appendChild(canvas);
}

// Whether a click has happened since last frame, update mouse position
//TODO mouse position should be updated when mouse is moved, not when clicked.
function handleClicks(evt) {
    clicked = true;
    var mousePos = getMousePos(canvas, evt);
    mouseX = mousePos.x;
    mouseY = mousePos.y;
}

// Draw function, draw based on current state
function draw() {
    ctx.fillStyle = '#A8A8A8';
    ctx.fillRect(0, 0, 854, 480);
    switch (gameState) {
        case STATEENUM.loadingscreen:
            ctx.drawImage(imageResources[0], SCREENCENTERX - imageResources[0].width / 2, 0);
            tacoButton.draw(ctx);
            break;
        case STATEENUM.mainmenu:
            renderDisplayList(displayList, ctx);
            ctx.fillText("X: " + mouseX + ", Y: " + mouseY, 600, 100);
            break;
        case STATEENUM.battlescreen:
            //renderDisplayList(spriteList, ctx);
            break;
    }
}

function loadMainMenu() {
    displayList.push(new TacoButton(imageResources[1], imageResources[2], "HIPSTER"));
    displayList[0].setPosition(SCREENCENTERX - 30 - imageResources[1].width, 30);
    displayList.push(new TacoButton(imageResources[1], imageResources[2], "   JOCK"));
    displayList[1].setPosition(SCREENCENTERX - 30 - imageResources[1].width, 110);
    displayList.push(new TacoButton(imageResources[1], imageResources[2], "   GEEK"));
    displayList[2].setPosition(SCREENCENTERX - 30 - imageResources[1].width, 190);
    displayList.push(new TacoButton(imageResources[1], imageResources[2], " HERMIT"));
    displayList[3].setPosition(SCREENCENTERX - 30 - imageResources[1].width, 270);
    displayList.push(new TacoButton(imageResources[1], imageResources[2], " SOCIAL"));
    displayList[4].setPosition(SCREENCENTERX - 30 - imageResources[1].width, 350);
}

function loadSprites() {
    spriteList.push(new AnimatedSprite(imageResources[6], 210, 210, 2));
    spriteList[0].setPosition( new Vector( 0,0 ) );
    spriteList[0].maxTime = 50;
    spriteList[0].rotRate = 0.2;
    spriteList.push(new AnimatedSprite(imageResources[5], 210, 210, 2));
    spriteList[1].setPosition( new Vector( 220,0 ) );
    spriteList[1].maxTime = 100;
    spriteList.push(new AnimatedSprite(imageResources[4], 210, 210, 2));
    spriteList[2].setPosition( new Vector( 440,0 ) );
    spriteList[2].maxTime = 30;
}

function buttonStates(blist) {
    for (var i = 0; i < blist.length; i++) {
        if (blist[i].inBounds(mouseX, mouseY)) {
            return blist[i].text;
        }
    }
    return "NULL";
}

// Update game logic
function update() {
    if (clicked === true) {
        switch (gameState) {
            case STATEENUM.loadingscreen:
                if (tacoButton.inBounds(mouseX, mouseY)) {
                    tacoButton.handleClicked(true);
                    gameState = STATEENUM.mainmenu;
                }
                break;
            case STATEENUM.mainmenu:
                var type = buttonStates(displayList);
                if (type != "NULL") {
                    alert(type);
                    gameState = STATEENUM.battlescreen;
                }
                break;
            case STATEENUM.battlescreen:
                for (var i = 0; i < spriteList.length; i++) {
                    spriteList[i].nextFrame();
                }
                break;
        }
    }
        clicked = false;
}

// process a single frame of the game
function processFrame() {
    now = getTime();
    dt = (now - last) / 1000;    // duration in seconds
    update();
    draw();
    last = now;
    requestAnimationFrame(processFrame, canvas);
}

// initialize listeners, reset the canvas, and begin the game loop
initialize();
reset(ctx);
requestAnimationFrame(processFrame, canvas);
