import anime from 'animejs';
import { Container, NineSlicePlane, Texture } from 'pixi.js';
import { Images } from '../assets';
import { SONG_PLAY_DURATION } from '../configs/constants';

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

    public resetProgress(): void {
        anime({
            targets: this.progressBar,
            width: W,
            duration: 50,
            easing: 'linear',
            complete: () => {
                this.progressBar.width = W;
                this.startTimer();
            },
        });
    }

    public startTimer(): void {
        anime({
            targets: this.progressBar,
            width: 0,
            duration: SONG_PLAY_DURATION * 1000,
            easing: 'linear',
            complete: () => {
                this.progressBar.width = 0;
            },
        });
    }

    public stopTimer(): void {
        anime.remove(this.progressBar);
        // this.resetProgress();
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
        this.progressBar.width = W;
        this.progressBar.height = H;
        this.progressBar.tint = PROGRESS_COLOR;
        this.addChild(this.progressBar);
    }
}
