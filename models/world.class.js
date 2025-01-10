class World {
    character = new Character();
    level = level1;
    statusbars = [
        new Statusbar(statusbarImages[0], 0),
        new Statusbar(statusbarImages[1], 60),
        new Statusbar(statusbarImages[2], 130),
        new Statusbar (endbossStatusbarImages[5], 20, 480, false)
    ];
    collectObjects = [
        new CollectObject (coinImage),
        new CollectObject (coinImage),
        new CollectObject (coinImage),
        new CollectObject (coinImage),
        new CollectObject (bootleImage),
        new CollectObject (bootleImage),
        new CollectObject (bootleImage),
        new CollectObject (bootleImage),
        new CollectObject (bootleImage),
        new CollectObject (bootleImage),
        new CollectObject (bootleImage),
        new CollectObject (bootleImage)
    ];
    throwableObjects = [];
    canvas;
    ctx;
    keyboard;
    camera_x = 0;
    lastThrow = 0;

    constructor(canvas, keyboard) {
        this.ctx = canvas.getContext("2d");
        this.canvas = canvas;
        this.keyboard = keyboard;
        this.level.enemies[3].world = this;
        this.draw();
        this.setWorld();
        this.runInterval();
    }

    setWorld() {
        this.character.world = this;
    }

    draw() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.drawBackground();
        this.drawCharacterAndAnemies();
        this.addObjToMap(this.collectObjects);
        this.addObjToMap(this.throwableObjects);
        this.ctx.translate(-this.camera_x - 30, 0);
        const self = this;
        requestAnimationFrame(() => self.draw());
    }

    drawBackground() {
        this.ctx.translate(this.camera_x + 30, 0);
        this.addObjToMap(this.level.backgroundObject);
        this.addObjToMap(this.level.clouds);
    }

    drawCharacterAndAnemies() {
        this.addToMap(this.character);
        this.ctx.translate(-this.camera_x, 0);
        this.addObjToMap(this.statusbars);
        this.ctx.translate(this.camera_x, 0);
        this.addObjToMap(this.level.enemies);
    }

    addObjToMap(objects) {
        objects.forEach(obj => {    
            this.addToMap(obj);    
        });
    }
    
    addToMap(object) {
        if (object.otherDirection) {
            this.flipImage(object);
        }
        object.draw(this.ctx);
        object.drawFrame(this.ctx);
        if (object.otherDirection) {
            this.flipImageBack(object);
        }
    }

    flipImage(object) {
        this.ctx.save();
        this.ctx.translate(object.width, 0);
        this.ctx.scale(-1, 1);
        object.x = object.x * - 1;
    }

    flipImageBack(object) {
        this.ctx.restore();
        object.x = object.x * - 1;
    }

    checkCollisions() {
        this.checkEnemiesCollisions();
        this.checkCollectObjectsCollisions();
        this.checkThrowCollisions();
    }

    checkThrowCollisions() {
        this.level.enemies.forEach((enemie, index) => {
            this.throwableObjects.forEach (bootle => {
                if (enemie.isColliding(bootle)) {
                    if (enemie.width == 100) {
                        this.level.enemies.splice(index, 1);
                    } else {
                        enemie.hit();
                    }
                }
            });
        });
    }


    checkEnemiesCollisions() {
        this.level.enemies.forEach(enemie => {
            if (this.character.isColliding(enemie)) {
                if (enemie.width != 100) {
                    this.characterHit();
                } else {
                    if (!this.character.isAboveGroud()) {
                        this.characterHit();                   
                    }
                }
              }
          });
    }

    characterHit() {
        this.character.hit();
        this.statusbars[1].analysePercentage(this.character.energy, statusbarLiveImages); 
    }

    checkCollectObjectsCollisions() {
        this.collectObjects.forEach(collectObject => { 
            if (this.character.isColliding(collectObject) && this.character.isAboveGroud()) {
                this.isObjectACoinOrBootle(collectObject);
                collectObject.hidden();
            }
        });
    }

    isObjectACoinOrBootle(collectObject) {
        if (collectObject.imgPath === coinImage) {
            this.character.coins += 20;
            this.statusbars[2].analysePercentage(this.character.coins, statusbarCoinImages);
        } else {
            this.character.bootles += 1;
            this.statusbars[0].analysePercentage(this.character.bootles * 20, statusbarBootleImages);   
        }
    }

    checkThrowObject() {
        if (this.isThrow()) {
            if (this.keyboard.D && !this.character.otherDirection && this.character.bootles > 0) {
                const bootle = new ThrowableObject(this.character.x, 250);
                this.throwableObjects.push(bootle);
                this.character.bootles -= 1;
                this.statusbars[0].analysePercentage(this.character.bootles * 20, statusbarBootleImages);
                this.lastThrow = new Date().getTime();                
            }
        };
    }   

    isThrow() {
        let currentTime = new Date().getTime();
        currentTime -= this.lastThrow;
        return currentTime > 1000;
    }

    showFullscreen() {
        if (this.keyboard.F) {
            fullscreen();
        }
    }

    checkMute() {
        if (this.keyboard.M) {
            muteTheGame();
        }
    }

    runInterval() {
        setStoppableInterval(() => {
            this.checkCollisions();
        }, 500);
        setStoppableInterval(() => {
            this.checkThrowObject();
            this.character.jumpOfEnemies();
            this.showFullscreen();
            this.checkMute(); 
        }, 50);
    }
}