import { Container, Rectangle, Sprite, Text } from 'pixi.js';
import { Images } from '../assets';
import { DEFAULT_FONT } from '../configs/GameConfig';
import { CategoryName } from '../models/CategoryModel';
import { makeSprite } from '../utils';
import { GameMode } from './GameMode';

export class ChooseSettings extends Container {
    private cover: Sprite;
    private gameMode: GameMode;
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
        this.gameMode = new GameMode();
        this.gameMode.position.set(300, 600);
        this.addChild(this.gameMode);
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
