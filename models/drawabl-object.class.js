class DrawablObject {
    x = 30;
    y = 300;
    heigth;
    width;
    img;
    imageCache = {};

    loadImage(path) {
        this.img = new Image();
        this.img.src = path;
    }

    loadImages(images) {
        images.forEach(path => {
            const img = new Image();
            img.src = path;
            this.imageCache[path] = img;
        });
    }

    draw(ctx) {
        ctx.drawImage(this.img, this.x, this.y ,this.width, this.heigth);
    }

    drawFrame(ctx) {
        if (this instanceof Character || this instanceof Chicken) {
            ctx.beginPath();
            ctx.strokeStyle = 'blue';
    
            ctx.rect(this.x + this.offset.top, this.y  + this.offset.left ,this.width - this.offset.bottom, this.heigth - this.offset.right);
            ctx.stroke(); 
        }
    }
}