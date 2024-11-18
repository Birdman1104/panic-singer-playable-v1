import { Container, Rectangle } from 'pixi.js';
import { CategoryModel } from '../models/CategoryModel';
import { CATEGORY_HEIGHT, CATEGORY_WIDTH, CategoryView } from './CategoryView';

export class CategoriesWrapper extends Container {
    private categories: CategoryView[] = [];

    constructor(private categoriesData: CategoryModel[]) {
        super();
        this.build();
    }

    get viewName() {
        return 'CategoriesWrapper';
    }

    public getBounds(): Rectangle {
        return new Rectangle(
            -CATEGORY_WIDTH / 2,
            -CATEGORY_HEIGHT / 2,
            CATEGORY_WIDTH * 2 + 50,
            CATEGORY_HEIGHT * 2 + 50,
        );
    }

    private build(): void {
        this.categories = this.categoriesData.map((category, i) => {
            const categoryView = new CategoryView(category.name);
            categoryView.position.set((CATEGORY_WIDTH + 50) * (i % 2), (CATEGORY_HEIGHT + 50) * Math.floor(i / 2));
            this.addChild(categoryView);
            return categoryView;
        });
    }
}
