import { Container } from 'pixi.js';
import { GameModes } from './GameModes';
import { TimeSettings } from './TimeSettings';

export class CategorySettings extends Container {
    private gameModes: GameModes;
    private timeSettings: TimeSettings;

    constructor() {
        super();

        this.build();
    }

    private build(): void {
        this.buildGameModes();
        this.buildTimerSettings();
    }

    private buildGameModes(): void {
        this.gameModes = new GameModes();
        this.gameModes.position.set(0, 0);
        this.addChild(this.gameModes);
    }

    private buildTimerSettings(): void {
        this.timeSettings = new TimeSettings();
        this.timeSettings.position.set(0, 160);
        this.addChild(this.timeSettings);
    }
}
