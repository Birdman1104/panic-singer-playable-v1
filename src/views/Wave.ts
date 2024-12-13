import { lego } from '@armathai/lego';
import { Container, Rectangle } from 'pixi.js';
import { WaveEvents } from '../events/MainEvents';
import { ChoiceModel } from '../models/ChoiceModel';
import { CH, CW, Choice } from './Choice';
import { WaveTimer } from './WaveTimer';

export class Wave extends Container {
    private choices: Choice[] = [];
    private timer: WaveTimer;

    constructor() {
        super();

        this.build();

        // drawBounds(this);
    }

    public getBounds(): Rectangle {
        return new Rectangle(0, 0, CW, 950);
    }

    public updateWave(waveData: ChoiceModel[]): void {
        waveData.forEach((choice, index) => {
            this.choices[index].updateChoice(choice.singer, choice.song, choice.uuid);
        });
    }

    public revealAnswers(uuid: string, isRight: boolean): void {
        this.choices.find((choice) => choice.uuid === uuid)?.reveal(isRight);
        // this.choices.forEach((choice) => {
        //     if (choice.uuid === uuid) {
        //         choice.reveal(isRight);
        //     }
        // });
    }

    private build(): void {
        this.buildChoices();
        this.buildWaveTimer();
    }

    private buildChoices(): void {
        for (let i = 0; i < 4; i++) {
            const choice = new Choice();
            choice.y = i * (CH + 20) + 200;
            choice.on('choiceClick', (uuid) => this.onChoiceClick(uuid));

            this.addChild(choice);
            this.choices.push(choice);
        }
    }

    private onChoiceClick(uuid: string): void {
        this.choices.forEach((choice) => (choice.isActive = false));
        lego.event.emit(WaveEvents.ChoiceClick, uuid);
    }

    private buildWaveTimer(): void {
        this.timer = new WaveTimer();
        this.timer.y = 0;
        this.timer.x = CW / 2 - this.timer.width / 2;
        this.addChild(this.timer);
    }
}
