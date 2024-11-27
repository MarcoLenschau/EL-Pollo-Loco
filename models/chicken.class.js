class Chicken extends MovableObject{
    constructor(x, y) {
        super().loadImage("./assetes/img/3_enemies_chicken/chicken_normal/1_walk/1_w.png");
        this.x = x;
        this.y = y;
        this.width = 155;
        this.heigth = 100;
    }
    
    eat() {
        
    }
}