import { ObservableModel } from './ObservableModel';

export enum CategoryName {
    WorldMix = 'world_mix',
    RockHits = 'rock_hits',
    TikTok = 'tik_tok',
    OldButGold = 'old_but_gold',
}

export class CategoryModel extends ObservableModel {
    constructor(private _name: CategoryName) {
        super('CategoryModel');
    }

    public get name(): CategoryName {
        return this._name;
    }
}
