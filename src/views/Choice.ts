import { lego } from '@armathai/lego';
import anime from 'animejs';
import { Container, NineSlicePlane, Text, Texture } from 'pixi.js';
import { Images } from '../assets';
import { ANSWER_SHOW_DURATION } from '../configs/constants';
import { WaveEvents } from '../events/MainEvents';
import { delayRunnable } from '../utils';

const DEFAULT_TINT = 0x4746a6;
const WRONG_TINT = 0xdc263d;
const CORRECT_TINT = 0x569b3e;
const TIMER_TINT = 0xdd963e;

export const CW = 555;
export const CH = 135;

export class Choice extends Container {
    public isActive = false;

    private mainBkg: NineSlicePlane;
    private resultBkg: NineSlicePlane;
    private songName: Text;
    private _uuid: string;
    private isClicked = false;

    constructor() {
        super();

        this.build();
    }

    public get uuid(): string {
        return this._uuid;
    }

    public reveal(isCorrect: boolean, timerCompleted: boolean): void {
        this.resultBkg.tint = this.getTint(isCorrect, timerCompleted);

        anime({
            targets: this.resultBkg,
            alpha: 1,
            duration: 200,
            easing: 'easeInOutSine',
            complete: () => {
                if (isCorrect) {
                    delayRunnable(ANSWER_SHOW_DURATION, () => {
                        lego.event.emit(WaveEvents.AnswerShowComplete);
                    });
                }
            },
        });
    }

    public updateChoice(artist: string, song: string, uuid: string): void {
        this._uuid = uuid;
        anime({
            targets: this.songName,
            alpha: 0,
            duration: 100,
            easing: 'easeInOutSine',
            complete: () => {
                this.songName.text = `${artist} -\n ${song}`;
                anime({
                    targets: this.songName,
                    alpha: 1,
                    duration: 100,
                    easing: 'easeInOutSine',
                    complete: () => {
                        this.isClicked = false;
                        this.isActive = true;
                    },
                });
            },
        });

        if (this.resultBkg.alpha !== 0) {
            anime({
                targets: this.resultBkg,
                alpha: 0,
                duration: 300,
                easing: 'easeInOutSine',
            });
        }
    }

    private build(): void {
        this.buildMainBkg();
        this.buildResultBkg();
        this.buildSongName();
    }

    private buildMainBkg(): void {
        this.mainBkg = new NineSlicePlane(Texture.from(Images['game/rounded-square']), 15, 15, 15, 15);
        this.mainBkg.width = CW;
        this.mainBkg.height = CH;
        this.mainBkg.tint = DEFAULT_TINT;
        this.mainBkg.interactive = true;
        this.mainBkg.on('pointerdown', () => {
            if (!this.isActive) return;
            this.isClicked = true;
            this.emit('choiceClick', this.uuid);
        });
        this.addChild(this.mainBkg);
    }

    private buildResultBkg(): void {
        this.resultBkg = new NineSlicePlane(Texture.from(Images['game/rounded-square']), 15, 15, 15, 15);
        this.resultBkg.width = CW;
        this.resultBkg.height = CH;
        this.resultBkg.tint = DEFAULT_TINT;
        this.resultBkg.alpha = 0;
        this.addChild(this.resultBkg);
    }

    private buildSongName(): void {
        this.songName = new Text('', {
            fontFamily: 'Arial',
            fontSize: 32,
            fill: 0xffffff,
            fontWeight: 'bold',
            align: 'center',
        });
        this.songName.anchor.set(0.5);
        this.songName.position.set(CW / 2, CH / 2);
        this.addChild(this.songName);
    }

    private getTint(isCorrect: boolean, timerCompleted: boolean): number {
        if (isCorrect && timerCompleted) {
            return TIMER_TINT;
        } else if (isCorrect) {
            return CORRECT_TINT;
        } else if (this.isClicked) {
            return WRONG_TINT;
        } else {
            return DEFAULT_TINT;
        }
    }
}
