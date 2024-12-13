import { ObservableModel } from './ObservableModel';

export class ChoiceModel extends ObservableModel {
    private _isRight: boolean | null = null;
    private _isRevealed = false;

    constructor(private _singer, private _song) {
        super('ChoiceModel');

        this.makeObservable();
    }

    public get singer(): string {
        return this._singer;
    }

    public get song(): string {
        return this._song;
    }

    public get isRight(): boolean | null {
        return this._isRight;
    }

    public set isRight(value: boolean | null) {
        this._isRight = value;
    }

    public get isRevealed(): boolean {
        return this._isRevealed;
    }

    public set isRevealed(value: boolean) {
        this._isRevealed = value;
    }

    public reveal(): void {
        this._isRevealed = true;
    }
}
