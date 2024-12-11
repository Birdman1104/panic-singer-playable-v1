import { CategoryModel, CategoryName } from './CategoryModel';
import { ObservableModel } from './ObservableModel';

export enum BoardState {
    Undefined = 'Undefined',
    ChooseCategory = 'ChooseCategory',
    ChooseSettings = 'ChooseSettings',
    Countdown = 'Countdown',
    PlaySong = 'PlaySong',
    ShowAnswer = 'ShowAnswer',
    ShowChosenAnswer = 'ShowChosenAnswer',
}

export class BoardModel extends ObservableModel {
    private _categories: CategoryModel[] = [];
    private _time = 60;
    private _state = BoardState.Undefined;
    private _chosenCategory: CategoryModel | null = null;

    private readonly answerShowDuration = 1;

    constructor() {
        super('BoardModel');

        this.makeObservable();
    }

    get categories(): CategoryModel[] {
        return this._categories;
    }

    set categories(value: CategoryModel[]) {
        this._categories = value;
    }

    get time(): number {
        return this._time;
    }

    set time(value: number) {
        this._time = value;
    }

    get state(): BoardState {
        return this._state;
    }

    set state(value: BoardState) {
        this._state = value;
    }

    get chosenCategory(): CategoryModel | null {
        return this._chosenCategory;
    }

    set chosenCategory(value: CategoryModel | null) {
        this._chosenCategory = value;
    }

    public setState(state: BoardState): void {
        this._state = state;
    }

    public setChosenCategory(name: CategoryName): void {
        const category = this.categories.find((category) => category.name === name) || null;
        this._chosenCategory = category;
    }

    public setCategorySongs(): void {
        if (!this._chosenCategory) return;
        this._chosenCategory.setSongs();
    }

    public startNextWave(): void {
        if (!this._chosenCategory) return;
        this._chosenCategory.startNextWave();
    }

    public initialize(): void {
        //
    }

    public initializeCategories(): void {
        const categories: CategoryModel[] = [];
        for (const category in CategoryName) {
            categories.push(new CategoryModel(CategoryName[category]));
        }
        this.categories = categories;
    }

    public increaseTime(): void {
        this._time = Math.min(this._time + 30, 120);
    }

    public decreaseTime(): void {
        this._time = Math.max(this._time - 30, 30);
    }
}
