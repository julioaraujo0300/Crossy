import Car from "./car.js"
export default class MainScene extends Phaser.Scene {
    constructor (){
        super('MainScene');
    }

    init() {
        this.input.on('pointerdown', e => { this.movePlayer(e)});
        this.input.on('pointerup', e => {this.stopPlayer(e)});

        this.playerIsMoving = false;
        this.playerVelocity = 10;

        this.carSpeed = 3;
    }

    movePlayer(event){
        this.playerIsMoving = true;
    }

    stopPlayer(event){
        this.playerIsMoving = false;
    }

    preload() {
        this.load.image('background', './images/map.png');
        this.load.image('player', './images/character_blonde_green.png');
        this.load.image('yellow.car', './images/car_yellow_1.png');
        this.load.image('motorcycle', './images/motorcycle_green.png')
    }

    create() {
        let bg = this.add.sprite(0, 0, 'background');
        bg.setPosition(
            this.game.config.width / 2,
            this.game.config.height /2
        );

        this.player = this.add.sprite(640, 1200, 'player');
        this.cars = [];
        this.cars.push(this.add.existing( new Car(this, 10 * 128 - 64, 2 * 128 + 64, 'yellow.car')));
        this.cars.push(this.add.existing( new Car(this, 10 * 128 - 64, 2 * 128 + 64, 'yellow.car')));
        this.cars.push(this.add.existing( new Car(this, 10 * 128 - 64, 2 * 128 + 64, 'yellow.car')));
        this.cars.push(this.add.existing( new Car(this, 10 * 128 - 64, 2 * 128 + 64, 'yellow.car')));
        // this.cars.push(this.add.existing( new Car(this, 10 * 128 - 64, 2 * 128 + 64, 'yellow.car')))
        


        this.motorcyle = this.add.sprite(this.game.config.width / 2, 70, 'motorcycle');
    }

    update(time) {

        if(this.playerIsMoving)
        {
            this.player.y += -this.playerVelocity;
        }

        for(let i = 0; i < this.cars.length; i++){
            this.cars[i].update(time);
        }

        let playerRect = this.player.getBounds();
        let motorcyleRect = this.motorcyle.getBounds();

        if(Phaser.Geom.Intersects.RectangleToRectangle(playerRect, motorcyleRect)){
            console.log("yau");
            this.scene.restart();
        }

        for(let i = 0; i < this.cars.length; i++){
            if(this.cars[i].overlaps(this.player)){
                this.scene.restart();
            };
        }
    }
}