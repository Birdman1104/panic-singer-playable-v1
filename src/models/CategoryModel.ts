import { OLD_BUT_GOLD_NAMES, ROCK_SONG_NAMES, TIK_TOK_NAMES } from '../configs/RandomSongNames';
import { OldButGold, RockHits, TikTok } from '../configs/SongsData';
import { delayRunnable } from '../utils';
import { ChoiceModel } from './ChoiceModel';
import { ObservableModel } from './ObservableModel';

export enum CategoryName {
    WorldMix = 'world_mix',
    RockHits = 'rock_hits',
    TikTok = 'tik_tok',
    OldButGold = 'old_but_gold',
}

const SONG_PLAY_DURATION = 3; // seconds

export class CategoryModel extends ObservableModel {
    private _songsData: SongInfo[][] = [];
    private _currentWaveIndex = -1;
    private _currentWave: ChoiceModel[] = [];
    private _currentSong: string = '';
    private _playingTime = SONG_PLAY_DURATION;
    private _timerCompleted = false;
    private isPlaying = false;

    constructor(private _name: CategoryName) {
        super('CategoryModel');

        this._songsData = getSongsData(this._name);
        this.makeObservable();
    }

    public get name(): CategoryName {
        return this._name;
    }

    public get songsData(): SongInfo[][] {
        return this._songsData;
    }

    public get currentWaveIndex(): number {
        return this._currentWaveIndex;
    }

    public set currentWaveIndex(value: number) {
        this._currentWaveIndex = value;
    }

    public get playingTime(): number {
        return this._playingTime;
    }

    public set playingTime(value: number) {
        this._playingTime = value;
    }

    public get currentWave(): ChoiceModel[] {
        return this._currentWave;
    }

    public set currentWave(value: ChoiceModel[]) {
        this._currentWave = value;
    }

    public get currentSong(): string {
        return this._currentSong;
    }

    public set currentSong(value: string) {
        this._currentSong = value;
    }

    public get timerCompleted(): boolean {
        return this._timerCompleted;
    }

    public set timerCompleted(value: boolean) {
        this._timerCompleted = value;
    }

    public isRightChoice(uuid: string): boolean {
        return this._currentWave.find((choice) => choice.uuid === uuid)?.isRight || false;
    }

    public revealAnswers(): void {
        this.isPlaying = false;
        this._songsData[this._currentWaveIndex].forEach((d, i) => {
            this._currentWave[i].isRight = d.isRight;
        });
        // this.stopCountdown();
    }

    public startNextWave(): void {
        this._timerCompleted = false;
        this._playingTime = SONG_PLAY_DURATION;
        this._currentWaveIndex += 1;
        this._currentWave = this._songsData[this._currentWaveIndex].map((s) => new ChoiceModel(s.singer, s.song));
        this._currentSong = this._songsData[this._currentWaveIndex].find((s) => s.key)!.key || '';
        this.isPlaying = true;
        // this.startCountdown();
    }

    public setSongs(): void {
        this._songsData = getSongsData(this._name);
    }

    public startCountdown(): void {
        const countdown = () => {
            delayRunnable(1, () => {
                if (this.isPlaying) {
                    this._playingTime -= 1;

                    if (this._playingTime <= 0) {
                        this.stopCountdown();
                    } else {
                        countdown();
                    }
                }
            });
        };

        countdown();
    }

    private stopCountdown(): void {
        this.timerCompleted = true;
        this.isPlaying = false;
        this._playingTime = SONG_PLAY_DURATION;
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
    const randomNamesData = getRandomNames(category).map((song) => ({ ...song, isRight: false }));
    const songs: SongInfo[][] = Array.from({ length: songsData.length }, () => []);

    for (let i = 0; i < songsData.length; i++) {
        let arr: SongInfo[] = [songsData[i]];
        for (let i = 0; i < 3; i++) {
            arr.push(randomNamesData.shift() as SongInfo);
        }
        songs[i] = arr.sort(() => Math.random() - 0.5);
    }

    return songs;
};
