import { lego } from '@armathai/lego';
import { Container } from 'pixi.js';
import { BoardModelEvents, GameModelEvents } from '../events/ModelEvents';
import { CategoryModel } from '../models/CategoryModel';
import { GameState } from '../models/GameModel';
import { CategoriesWrapper } from './CategoriesWrapper';

export class BoardView extends Container {
    constructor() {
        super();

        lego.event
            .on(GameModelEvents.StateUpdate, this.onGameStateUpdate, this)
            .on(BoardModelEvents.CategoriesUpdate, this.onCategoriesUpdate, this);

        this.build();
    }

    get viewName() {
        return 'BoardView';
    }

    public rebuild(): void {
        //
    }

    private build(): void {
        //
    }

    private onGameStateUpdate(state: GameState): void {
        //
    }

    private onCategoriesUpdate(categories: CategoryModel[]): void {
        this.addChild(new CategoriesWrapper(categories));
        this.emit('rebuild');
    }
}
