import { Container, Rectangle, Sprite } from 'pixi.js';
import { Images } from '../assets';
import { CategoryName } from '../models/CategoryModel';
import { makeSprite } from '../utils';

export const CATEGORY_WIDTH = 300;
export const CATEGORY_HEIGHT = 300;

export class CategoryView extends Container {
    private cover: Sprite;

    constructor(private _name: CategoryName) {
        super();
        this.build();
    }

    get type(): CategoryName {
        return this._name;
    }

    public getBounds(): Rectangle {
        return new Rectangle(0, 0, CATEGORY_WIDTH, CATEGORY_HEIGHT);
    }

    private build() {
        this.cover = makeSprite({ texture: Images[`game/${CategoryName[this._name]}`] });
        this.cover.scale.set(CATEGORY_WIDTH / this.cover.width);

        this.addChild(this.cover);
    }
}
