import { lego } from '@armathai/lego';
import { Container, Graphics, Sprite, Text } from 'pixi.js';
import { Images } from '../assets';
import { ChooseSettingsEvents } from '../events/MainEvents';
import { makeSprite } from '../utils';

export class TimeSettings extends Container {
    private plus: Sprite;
    private minus: Sprite;
    private plusHitArea: Graphics;
    private minusHitArea: Graphics;
    private time: Text;

    constructor() {
        super();

        this.build();
    }

    private build(): void {
        this.buildPlus();
        this.buildPlusHitArea();
        this.buildMinus();
        this.buildMinusHitArea();
        this.buildTime();
    }

    private buildPlus(): void {
        this.plus = makeSprite({ texture: Images['game/plus'] });
        this.plus.anchor.set(0.5);
        this.plus.position.set(130, 0);
        this.addChild(this.plus);
    }

    private buildPlusHitArea(): void {
        this.plusHitArea = new Graphics();
        this.plusHitArea.beginFill(0x000000, 0);
        const { x, y, width, height } = this.plus;
        this.plusHitArea.drawRect(x - width / 2, y - height / 2, width, height);
        this.plusHitArea.endFill();
        this.plusHitArea.interactive = true;
        this.plusHitArea.on('pointerdown', () => lego.event.emit(ChooseSettingsEvents.PlusClick));
        this.addChild(this.plusHitArea);
    }

    private buildMinusHitArea(): void {
        this.minusHitArea = new Graphics();
        this.minusHitArea.beginFill(0x000000, 0);
        const { x, y, width } = this.minus;
        const { height } = this.plus;
        this.minusHitArea.drawRect(x - width / 2, y - height / 2, width, height);
        this.minusHitArea.endFill();
        this.minusHitArea.interactive = true;
        this.minusHitArea.on('pointerdown', () => lego.event.emit(ChooseSettingsEvents.MinusClick));
        this.addChild(this.minusHitArea);
    }

    private buildMinus(): void {
        this.minus = makeSprite({ texture: Images['game/minus'] });
        this.minus.anchor.set(0.5);
        this.minus.position.set(-130, 0);
        this.addChild(this.minus);
    }

    private buildTime(): void {
        this.time = new Text(convertSecondsToTime(60), {
            fontSize: 40,
            fill: 0xffffff,
        });
        this.time.anchor.set(0.5);
        this.time.position.set(0, 0);
        this.addChild(this.time);
    }
}

function convertSecondsToTime(seconds: number): string {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    const formattedMinutes = String(minutes).padStart(2, '0');
    const formattedSeconds = String(remainingSeconds).padStart(2, '0');
    return `${formattedMinutes}:${formattedSeconds}`;
}
