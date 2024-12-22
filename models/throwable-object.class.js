class ThrowableObject extends MovableObject{
    heigth = 100;
    width = 200;

    constructor(x, y) {
        super().loadImage("./assetes/img/6_salsa_bottle/2_salsa_bottle_on_ground.png");   
        this.x = x;
        this.y = y;
        this.throw();
    }

    throw() {  
        this.speedY = 10;
        this.applyGravity();
        setInterval(() => {
            this.x += 5;
        },25);
    }
}