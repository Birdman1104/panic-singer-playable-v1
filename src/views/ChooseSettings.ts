import { lego } from '@armathai/lego';
import { Container, Rectangle, Sprite, Text } from 'pixi.js';
import { Images } from '../assets';
import { DEFAULT_FONT } from '../configs/GameConfig';
import { ChooseSettingsEvents } from '../events/MainEvents';
import { CategoryName } from '../models/CategoryModel';
import { makeSprite } from '../utils';
import { CategorySettings } from './CategorySettings';

export class ChooseSettings extends Container {
    private cover: Sprite;
    private startButton: Sprite;
    private categorySettings: CategorySettings;
    private title: Text;

    constructor(private category: CategoryName) {
        super();

        this.build();

        // drawBounds(this, 0xff0000);
    }

    public getBounds(): Rectangle {
        return new Rectangle(0, 0, 600, 900);
    }

    private build(): void {
        this.buildCover();
        this.buildTitle();
        this.buildMode();
        this.buildStartButton();
    }

    private buildCover(): void {
        this.cover = makeSprite({ texture: Images[`game/${this.category}`] });
        this.cover.scale.set(400 / this.cover.width);
        this.cover.position.set(300, 300);
        this.addChild(this.cover);
    }

    private buildTitle(): void {
        this.title = new Text(getTitle(this.category), {
            fill: 0xffffff,
            fontFamily: DEFAULT_FONT,
            fontSize: 40,
            fontWeight: 900,
        });
        this.title.anchor.set(0.5);
        this.title.position.set(300, 50);
        this.addChild(this.title);
    }

    private buildMode(): void {
        this.categorySettings = new CategorySettings();
        this.categorySettings.position.set(300, 560);
        this.addChild(this.categorySettings);
    }

    private buildStartButton(): void {
        this.startButton = makeSprite({ texture: Images['game/button'] });
        const txt = new Text('START', {
            fill: 0xffffff,
            fontFamily: DEFAULT_FONT,
            fontSize: 40,
            fontWeight: 900,
        });
        txt.anchor.set(0.5);
        txt.position.set(0, 0);
        this.startButton.addChild(txt);
        this.startButton.anchor.set(0.5);
        this.startButton.position.set(300, 830);

        this.startButton.interactive = true;
        this.startButton.on('pointerdown', () => lego.event.emit(ChooseSettingsEvents.StartClick));
        this.addChild(this.startButton);
    }
}

const getTitle = (category: CategoryName): string => {
    switch (category) {
        case CategoryName.OldButGold:
            return 'Old But Gold';
        case CategoryName.RockHits:
            return 'Rock Hits';
        case CategoryName.TikTok:
            return 'TikTok';
        case CategoryName.WorldMix:
            return 'World Mix';
        default:
            return 'World Mix';
    }
};
