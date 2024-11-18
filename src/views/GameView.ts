import { lego } from '@armathai/lego';
import { ICellConfig, PixiGrid } from '@armathai/pixi-grid';
import anime from 'animejs';
import { getGameViewGridConfig } from '../configs/gridConfigs/GameViewGC';
import { BoardModelEvents, GameModelEvents, HintModelEvents } from '../events/ModelEvents';
import { BoardModel, BoardState } from '../models/BoardModel';
import { CategoryModel, CategoryName } from '../models/CategoryModel';
import { HintState } from '../models/HintModel';
import { tweenToCell } from '../utils';
import { ChooseCategory } from './ChooseCategoryView';
import { ChooseSettings } from './ChooseSettings';
export class GameView extends PixiGrid {
    private chooseCategory: ChooseCategory;

    constructor() {
        super();

        lego.event
            .on(GameModelEvents.BoardUpdate, this.onBoardUpdate, this)
            .on(HintModelEvents.StateUpdate, this.onHintStateUpdate, this)
            // .on(BoardModelEvents.CategoriesUpdate, this.onCategoriesUpdate, this)
            .on(BoardModelEvents.StateUpdate, this.onBoardStateUpdate, this);

        this.build();
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

    private build(): void {
        this.buildSettings();
    }

    private buildSettings(): void {
        const set = new ChooseSettings(CategoryName.OldButGold);
        this.setChild('choose_settings', set);
    }

    private onHintStateUpdate(state: HintState): void {
        //
    }

    private onBoardUpdate(board: BoardModel | null): void {
        board ? this.buildBoard() : this.destroyBoard();
    }

    private onCategoriesUpdate(categories: CategoryModel[]): void {
        this.chooseCategory.onCategoriesUpdate(categories);
    }

    private buildBoard() {
        this.chooseCategory = new ChooseCategory();
        this.chooseCategory.on('rebuild', this.rebuild, this);
        this.setChild('choose_category', this.chooseCategory);
    }

    private onBoardStateUpdate(state: BoardState): void {
        console.warn(state);

        switch (state) {
            case BoardState.ChooseCategory:
                break;
            case BoardState.ChooseSettings:
                this.switchToChooseTime();
                break;
            case BoardState.Countdown:
                break;

            default:
                break;
        }
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

    private destroyBoard(): void {
        this.chooseCategory.destroy();
    }
}
