class CollectObject extends MovableObject {
    heigth = 200;
    width = 200;
    imgPath;

    constructor(imgPath) {
        super().loadImage(imgPath);
        this.x = 100 + Math.random() * 2400;
        this.y = Math.random() * 150; 
        this.imgPath = imgPath;
    }

    hidden() {
        this.x = null;
        this.y = null;
        this.width = null;
        this.heigth = null;
    }
}