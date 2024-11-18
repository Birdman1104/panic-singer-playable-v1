import { Container } from 'pixi.js';
import { CategoryModel } from '../models/CategoryModel';
import { CategoriesWrapper } from './CategoriesWrapper';

export class ChooseCategory extends Container {
    constructor() {
        super();

        this.build();
    }

    get viewName() {
        return 'ChooseCategoryView';
    }

    public onCategoriesUpdate(categories: CategoryModel[]): void {
        this.addChild(new CategoriesWrapper(categories));
        this.emit('rebuild');
    }

    private build(): void {
        //
    }
}
