class Statusbar extends DrawablObject {
    width = 200;
    heigth = 100;
    x = 0;
    percentage = 100;

    constructor(imgPath, y) {
        super().loadImage(imgPath);
        this.y = y;
    }

    setPercentage(percentage) {
        this.percentage = percentage;
    }

    analysePercentage(percentage, images) {
        this.setPercentage(percentage);
        if(this.percentage >= 100) { this.loadImage(images[5]); } 
        else if(this.percentage >= 80) { this.loadImage(images[4]); } 
        else if(this.percentage >= 60) { this.loadImage(images[3]); } 
        else if(this.percentage >= 40) { this.loadImage(images[2]); } 
        else if(this.percentage >= 20) { this.loadImage(images[1]); } 
        else if(this.percentage <= 0) { this.loadImage(images[0]); }
    }
}