import { OLD_BUT_GOLD_NAMES, ROCK_SONG_NAMES, TIK_TOK_NAMES } from '../configs/RandomSongNames';
import { OldButGold, RockHits, TikTok } from '../configs/SongsData';
import { ObservableModel } from './ObservableModel';

export enum CategoryName {
    WorldMix = 'world_mix',
    RockHits = 'rock_hits',
    TikTok = 'tik_tok',
    OldButGold = 'old_but_gold',
}

export class CategoryModel extends ObservableModel {
    private _songsData: SongInfo[][] = [];

    constructor(private _name: CategoryName) {
        super('CategoryModel');

        this._songsData = getSongsData(this._name);
    }

    public get name(): CategoryName {
        return this._name;
    }

    public get songsData(): SongInfo[][] {
        return this._songsData;
    }
}

const getRightSongsData = (category: CategoryName): SongInfo[] => {
    switch (category) {
        case CategoryName.RockHits:
            return RockHits;
        case CategoryName.TikTok:
            return TikTok;
        case CategoryName.OldButGold:
            return OldButGold;
        case CategoryName.WorldMix:
            return [...RockHits, ...TikTok, ...OldButGold].sort(() => Math.random() - 0.5).slice(0, 5);
        default:
            throw new Error('Unknown category');
    }
};

const getRandomNames = (category: CategoryName): SongInfo[] => {
    let names: SongInfo[] = [];
    switch (category) {
        case CategoryName.RockHits:
            names = ROCK_SONG_NAMES;
            break;
        case CategoryName.TikTok:
            names = TIK_TOK_NAMES;
            break;
        case CategoryName.OldButGold:
            names = OLD_BUT_GOLD_NAMES;
            break;
        case CategoryName.WorldMix:
            names = [...ROCK_SONG_NAMES, ...TIK_TOK_NAMES, ...OLD_BUT_GOLD_NAMES];
            break;
        default:
            throw new Error('Unknown category');
    }

    return names.sort(() => Math.random() - 0.5).slice(0, 15);
};

const getSongsData = (category: CategoryName): SongInfo[][] => {
    const songsData = getRightSongsData(category);
    const randomNamesData = getRandomNames(category);
    const levelData: SongInfo[][] = Array.from({ length: songsData.length }, () => []);

    for (let i = 0; i < songsData.length; i++) {
        let arr: SongInfo[] = [songsData[i]];
        for (let i = 0; i < 3; i++) {
            arr.push(randomNamesData.shift() as SongInfo);
        }
        levelData[i] = arr.sort(() => Math.random() - 0.5);
    }

    return levelData;
};
