import { CategoryModel, CategoryName } from './CategoryModel';
import { ObservableModel } from './ObservableModel';

export enum BoardState {
    Undefined = 'Undefined',
    ChooseCategory = 'ChooseCategory',
    ChooseTime = 'ChooseTime',
    Countdown = 'Countdown',
    PlaySong = 'PlaySong',
    ShowAnswer = 'ShowAnswer',
    ShowChosenAnswer = 'ShowChosenAnswer',
}

export class BoardModel extends ObservableModel {
    private _categories: CategoryModel[] = [];
    private _time = 0;
    private _state = BoardState.Undefined;

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

    public setState(state: BoardState): void {
        this._state = state;
    }

    public initialize(): void {
        //
    }

    public initializeCategories(): void {
        const categories: CategoryModel[] = [];
        for (const category in CategoryName) {
            categories.push(new CategoryModel(category as CategoryName));
        }
        this.categories = categories;
    }
}
