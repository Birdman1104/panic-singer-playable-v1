import { Container, NineSlicePlane, Texture } from 'pixi.js';
import { Images } from '../assets';

const W = 400;
const H = 60;

const BKG_COLOR = 0x2c2c46;
const PROGRESS_COLOR = 0x569b3e;

export class WaveTimer extends Container {
    private bkg: NineSlicePlane;
    private progressBar: NineSlicePlane;

    constructor() {
        super();

        this.build();
    }

    private build(): void {
        this.buildBkg();
        this.buildProgressBar();
    }

    private buildBkg(): void {
        this.bkg = new NineSlicePlane(Texture.from(Images['game/square']), 4, 4, 4, 4);
        this.bkg.width = W;
        this.bkg.height = H;
        this.bkg.tint = BKG_COLOR;
        this.addChild(this.bkg);
    }

    private buildProgressBar(): void {
        this.progressBar = new NineSlicePlane(Texture.from(Images['game/square']), 4, 4, 4, 4);
        this.progressBar.width = 0;
        this.progressBar.height = H;
        this.progressBar.tint = PROGRESS_COLOR;
        this.addChild(this.progressBar);
    }
}
