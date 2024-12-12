import { ObservableModel } from './ObservableModel';

export class ChoiceModel extends ObservableModel {
    constructor(private _singer, private _song, private _isCorrect) {
        super('ChoiceModel');
    }

    public get singer(): string {
        return this._singer;
    }

    public get song(): string {
        return this._song;
    }

    public get isCorrect(): boolean {
        return this._isCorrect;
    }
}
