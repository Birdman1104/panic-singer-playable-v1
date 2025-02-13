import { lego } from '@armathai/lego';
import { Container, Point, Rectangle, Text } from 'pixi.js';
import { BoardEvents } from '../events/MainEvents';
import { CategoryModel, CategoryName } from '../models/CategoryModel';
import { CATEGORY_HEIGHT, CATEGORY_WIDTH, CategoryItem } from './CategoryItem';

export class CategoriesWrapper extends Container {
    private categories: CategoryItem[] = [];

    constructor(private categoriesData: CategoryModel[]) {
        super();
        this.build();
    }

    get viewName() {
        return 'CategoriesWrapper';
    }

    public getBounds(): Rectangle {
        return new Rectangle(0, 0, CATEGORY_WIDTH * 2 + 50, CATEGORY_HEIGHT * 2 + 150);
    }

    public getHintPositions(): Point[] {
        return this.categories.map((c) => this.toGlobal(c.position));
    }

    private build(): void {
        this.buildCategories();
        this.buildText();
    }

    private buildCategories(): void {
        this.categories = this.categoriesData.map((category, i) => {
            const categoryView = new CategoryItem(category.name);
            const x = CATEGORY_WIDTH / 2 + (CATEGORY_WIDTH + 50) * (i % 2);
            const y = CATEGORY_HEIGHT / 2 + (CATEGORY_HEIGHT + 50) * Math.floor(i / 2) + 100;
            categoryView.position.set(x, y);
            categoryView.on('click', (name: CategoryName) => this.onCategoryClick(name));
            this.addChild(categoryView);
            return categoryView;
        });
    }

    private buildText(): void {
        const text = new Text('My Categories', {
            fill: 0xffffff,
            fontSize: 48,
            fontFamily: 'Arial',
        });

        text.position.set(0, 0);
        this.addChild(text);
    }

    private onCategoryClick(name: CategoryName): void {
        this.categories.forEach((c) => c.disable());

        lego.event.emit(BoardEvents.CategoryClick, name);
    }
}
