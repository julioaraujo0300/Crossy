export default class Car extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y, texture, carSpeed, flipped){
        super(scene, x, y, texture, carSpeed)

        this.setPosition(x, y);
        this.setFlip(flipped, false);

        let maxSpeed = carSpeed;
        let minSpeed = carSpeed - carSpeed / 2;
        
        this.speed = minSpeed + Math.random() * (maxSpeed - minSpeed);
    }

    update(time) {
        if(this.x <= -this.displayWidth / 2 || this.x >= this.scene.game.config.width + this.displayWidth / 2){
            this.flipX = !this.flipX;
        } 

        this.x += this.flipX === true ? this.speed : -this.speed;
    }

    overlaps(otherObject){
        let otherRect = otherObject.getBounds();
        let myRect = this.getBounds();

        return Phaser.Geom.Intersects.RectangleToRectangle(otherRect, myRect);
    }
}