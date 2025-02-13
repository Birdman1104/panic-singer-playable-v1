import { lego } from '@armathai/lego';
import { Container, Point, Rectangle } from 'pixi.js';
import { WaveEvents } from '../events/MainEvents';
import { CategoryModelEvents } from '../events/ModelEvents';
import { ChoiceModel } from '../models/ChoiceModel';
import { CH, CW, Choice } from './Choice';
import { WaveTimer } from './WaveTimer';

export class Wave extends Container {
    private choices: Choice[] = [];
    private timer: WaveTimer;
    private timerCompleted = false;

    constructor() {
        super();

        lego.event
            .on(WaveEvents.AnswerShowComplete, this.onAnswerShowComplete, this)
            .on(CategoryModelEvents.IsPlayingUpdate, this.onIsPlayingUpdate, this)
            .on(CategoryModelEvents.PlayingTimeUpdate, this.onPlayingTimeUpdate, this)
            .on(CategoryModelEvents.TimerCompletedUpdate, this.onTimerCompletedUpdate, this);

        this.build();

        // drawBounds(this);
    }

    get viewName() {
        return 'Wave';
    }

    public destroy(): void {
        lego.event
            .off(CategoryModelEvents.PlayingTimeUpdate, this.onPlayingTimeUpdate, this)
            .off(CategoryModelEvents.TimerCompletedUpdate, this.onTimerCompletedUpdate, this);

        super.destroy();
    }

    public getBounds(): Rectangle {
        return new Rectangle(0, 0, CW, 950);
    }

    public getHintPositions(): Point[] {
        return this.choices.map(c=> {
            const x = c.x + c.width / 1.25;
            const y = c.y + c.height / 2;
            return this.toGlobal(new Point(x,y))
        })
    }

    public updateWave(waveData: ChoiceModel[]): void {
        this.timer.resetProgress();
        waveData.forEach((choice, index) => {
            this.choices[index].updateChoice(choice.singer, choice.song, choice.uuid);
        });
    }

    public revealAnswers(uuid: string, isRight: boolean): void {
        this.choices.find((choice) => choice.uuid === uuid)?.reveal(isRight, this.timerCompleted);
    }

    private onTimerCompletedUpdate(timerCompleted: boolean): void {
        this.timerCompleted = timerCompleted;
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

    private onPlayingTimeUpdate(playingTime: number): void {
        // this.timer?.updateProgress(playingTime);
    }

    private onAnswerShowComplete(): void {
        // this.timer.resetProgress();
    }

    private onIsPlayingUpdate(isPlaying: boolean): void {
        isPlaying ? this.timer.resetProgress() : this.timer.stopTimer();
    }
}
