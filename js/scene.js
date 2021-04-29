import Player from "./player.js"
import Car from "./car.js"
export default class MainScene extends Phaser.Scene {
    constructor (){
        super('MainScene');
    }

    init() {
        this.input.on('pointerdown', e => { this.movePlayer(e)});
        this.input.on('pointerup', e => {this.stopPlayer(e)});

    }

    preload() {
        this.load.image('background', './images/map.png');
        this.load.image('player', './images/character_blonde_green.png');
        this.load.image('yellow.car', './images/car_yellow_1.png');
        this.load.image('red.car', './images/car_red_4.png')
        this.load.image('motorcycle', './images/motorcycle_green.png')
    }

    create() {
        let bg = this.add.sprite(0, 0, 'background');
        bg.setPosition(
            this.game.config.width / 2,
            this.game.config.height /2
        );

        this.player = this.add.existing( new Player(this, 640, 1200, 'player', 10));
        this.cars = [];
        this.cars.push(this.add.existing( new Car(this, 10 * 128 - 64, 2 * 128 + 64, 'yellow.car', 9)));
        this.cars.push(this.add.existing( new Car(this, 10 * 128 - 64, 1 * 128 + 64, 'yellow.car', 10)));
        this.cars.push(this.add.existing( new Car(this, 10 * 128 - 64, 4 * 128 + 64, 'red.car', 12)));
        this.cars.push(this.add.existing( new Car(this, 10 * 128 - 64, 6 * 128 + 64, 'red.car' ,15)));
        


        this.motorcycle = this.add.sprite(this.game.config.width / 2, 70, 'motorcycle');
    }

    movePlayer(event){
        this.player.playerIsMoving = true;
    }

    stopPlayer(event){
        this.player.playerIsMoving = false;
    }

    update(time) {
        this.player.update(time);

        for(let i = 0; i < this.cars.length; i++){
            this.cars[i].update(time);
        }

        if(this.player.overlaps(this.motorcycle)){
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