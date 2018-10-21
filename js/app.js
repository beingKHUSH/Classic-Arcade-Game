// Enemies our player must avoid
var Enemy = function(x,y,speed) {

    // Variables applied to each of our instances
    this.x = x;
    this.y = y;
    this.speed = speed;

    // The image/sprite for our enemies
    this.sprite = 'images/enemy-bug.png';
};

// Update the enemy's position
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // Multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    this.x += this.speed * dt;

    // Enemies reappear randomly with different speeds
    if(this.x > 510) {
        this.x = -50;
        this.speed = 150 + Math.floor(Math.random() * 200);
    };

    // Collision detection between any enemy and the player
    if (player.x < this.x + 80 &&
        player.x + 80 > this.x &&
        player.y < this.y + 60 &&
        player.y + 60 > this.y) {
        player.x = 202;
        player.y = 405;
    };
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Player Constructor
var Player = function (x, y) {

    // Variables for the player to move along x and y axis
    this.x = x;
    this.y =y;

    // The image/sprite for our player
    this.player = 'images/char-cat-girl.png';
};

Player.prototype.update = function (dt) {

};

// Render the image of player onto the game
Player.prototype.render = function () {
    ctx.drawImage(Resources.get(this.player), this.x, this.y);
};

// Handle keyboards events to let player use arrow keys to jump from tile to tile
Player.prototype.handleInput = function (keyPress) {

    switch (keyPress) {
        case 'left':
            if (this.x > 0) {
                this.x -= 102;
            };
            break;
        case 'right':
            if (this.x < 405) {
                this.x += 102;
            };
            break;
        case 'up':
            if (this.y > 0) {
                this.y -= 83;
            };
            break;
        case 'down':
            if (this.y < 405) {
                this.y += 83;
            };
            break;
    }

    // Once the  player reaches water reset his position back to starting position
    // Enables player not to go off the game tiles
    if (this.y < 0) {
        setTimeout(() => {
            this.x = 202;
            this.y = 405;
        }, 800);
    };
};

// All enemies are stored in an array
var allEnemies = [];

// Location of the enemies on the y-axis in 3 different lane
var enemyLocation = [63, 147, 230];

// Settings speed of the all the enemies and storing them in an array

enemyLocation.forEach(function (LocationY) {
    enemy = new Enemy(0, LocationY, 200);
    allEnemies.push(enemy);
});

// Set the start position of the player
var player = new Player(202, 405);

// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});
