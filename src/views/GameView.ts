import { lego } from '@armathai/lego';
import { ICellConfig, PixiGrid } from '@armathai/pixi-grid';
import anime from 'animejs';
import { getGameViewGridConfig } from '../configs/gridConfigs/GameViewGC';
import { BoardEvents } from '../events/MainEvents';
import { BoardModelEvents, CategoryModelEvents, ChoiceModelEvents, HintModelEvents } from '../events/ModelEvents';
import { BoardState } from '../models/BoardModel';
import { CategoryModel } from '../models/CategoryModel';
import { HintState } from '../models/HintModel';
import { tweenToCell } from '../utils';
import { ChooseCategory } from './ChooseCategoryView';
import { ChooseSettings } from './ChooseSettings';
import { Countdown } from './Countdown';
import { Wave } from './Wave';
export class GameView extends PixiGrid {
    private chooseCategory: ChooseCategory;
    private chooseSettings: ChooseSettings;
    private countdown: Countdown;
    private chosenCategory: CategoryModel;
    private wave: Wave;

    constructor() {
        super();

        lego.event
            .on(HintModelEvents.StateUpdate, this.onHintStateUpdate, this)
            .on(BoardModelEvents.ChosenCategoryUpdate, this.onChosenCategoryUpdate, this)
            .on(BoardModelEvents.CategoriesUpdate, this.onCategoriesUpdate, this)
            .on(CategoryModelEvents.CurrentWaveUpdate, this.onCurrentWaveUpdate, this)
            .on(ChoiceModelEvents.IsRightUpdate, this.onChoiceRightUpdate, this)
            .on(BoardModelEvents.StateUpdate, this.onBoardStateUpdate, this);
    }

    public getGridConfig(): ICellConfig {
        return getGameViewGridConfig();
    }

    public update(): void {
        //
    }

    public rebuild(config?: ICellConfig | undefined): void {
        super.rebuild(this.getGridConfig());
    }

    private onChosenCategoryUpdate(category: CategoryModel): void {
        this.chosenCategory = category;

        this.chooseSettings = new ChooseSettings(this.chosenCategory.name);
        this.chooseSettings.on('hideComplete', () => {
            this.chooseSettings.destroy();
            this.addCountdown();
        });
        this.setChild('choose_settings_right', this.chooseSettings);
        tweenToCell(this, this.chooseSettings, 'choose_settings');
    }

    private onHintStateUpdate(state: HintState): void {
        //
    }

    private addCountdown(): void {
        this.countdown = new Countdown();
        this.countdown.on('countdownComplete', () => lego.event.emit(BoardEvents.CountdownComplete));
        this.setChild('main', this.countdown);
    }

    private onCategoriesUpdate(categories: CategoryModel[]): void {
        this.chooseCategory?.onCategoriesUpdate(categories);
    }

    private buildChooseCategory(): void {
        this.chooseCategory = new ChooseCategory();
        this.chooseCategory.on('rebuild', this.rebuild, this);
        this.setChild('choose_category', this.chooseCategory);
    }

    private buildWave(): void {
        this.wave = new Wave();
        this.setChild('wave', this.wave);
    }

    private onBoardStateUpdate(state: BoardState): void {
        console.warn(state);

        switch (state) {
            case BoardState.ChooseCategory:
                // this.buildWave();
                this.buildChooseCategory();
                break;
            case BoardState.ChooseSettings:
                this.switchToChooseTime();
                break;
            case BoardState.Countdown:
                this.chooseSettings.hide();
                break;
            case BoardState.PlaySong:
                this.countdown.destroy();
                this.buildWave();
                break;

            default:
                break;
        }
    }

    private onCurrentWaveUpdate(wave): void {
        console.warn('onCurrentWaveUpdate', wave);
        this.wave.updateWave(wave);
    }

    private onChoiceRightUpdate(isRight: boolean, prev: boolean, uuid: string): void {
        if (!this.wave) return;
        this.wave.revealAnswers(uuid, isRight);
    }

    private switchToChooseTime(): void {
        tweenToCell(this, this.chooseCategory, 'choose_category_left');
        anime({
            targets: this.chooseCategory,
            alpha: 0,
            duration: 300,
            easing: 'easeInOutSine',
        });
    }
}
