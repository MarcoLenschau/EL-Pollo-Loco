class CollectObject extends MovableObject {
    heigth = 200;
    width = 200;
    imgPath;

    constructor(imgPath) {
        super().loadImage(imgPath);
        this.x = 100 + Math.random() * 2200;
        this.y = Math.random() * 150; 
        this.imgPath = imgPath;
    }
}