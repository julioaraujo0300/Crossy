export default class Player extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y, texture, playerSpeed){
        super(scene, x, y, texture, playerSpeed)

        this.setPosition(x, y);

        this.playerIsMoving = false;
        this.playerVelocity = playerSpeed;
    }

    update(time) {
        if(this.playerIsMoving)
        {
            this.y += -this.playerVelocity;
        }
    }

    overlaps(otherObject){
        let otherRect = otherObject.getBounds();
        let myRect = this.getBounds();

        return Phaser.Geom.Intersects.RectangleToRectangle(otherRect, myRect);
    }
}