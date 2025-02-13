import { lego } from '@armathai/lego';
import anime from 'animejs';
import { Container, Point, Sprite } from 'pixi.js';
import { Images } from '../assets';
import { BoardModelEvents, GameModelEvents, HintModelEvents } from '../events/ModelEvents';
import { GameState } from '../models/GameModel';
import { getViewByProperty, makeSprite } from '../utils';
import { BoardState } from '../models/BoardModel';

export class HintView extends Container {
    private hand: Sprite;
    private hintPositions: Point[] = [];
    private currentPoint = 0;
    private boardState: BoardState;

    constructor() {
        super();

        lego.event
            .on(HintModelEvents.VisibleUpdate, this.onHintVisibleUpdate, this)
            .on(BoardModelEvents.StateUpdate, this.onBoardStateUpdate, this);
            

        this.build();
        this.hide();
    }

    get viewName() {
        return 'HintView';
    }

    public destroy(): void {
        this.removeTweens();
        lego.event.off(HintModelEvents.VisibleUpdate, this.onHintVisibleUpdate, this);
        lego.event.off(BoardModelEvents.StateUpdate, this.onBoardStateUpdate, this);


        super.destroy();
    }

    private onBoardStateUpdate(state: BoardState): void {
        this.boardState = state;
    }

    private onHintVisibleUpdate(visible: boolean): void {
        console.warn('hint visible ', visible);
        
        visible ? this.show() : this.hide();
    }

    private build(): void {
        this.hand = makeSprite({ texture: Images['game/hand'] });
        this.hand.anchor.set(0);
        this.addChild(this.hand);
    }

    private show(): void {
        this.removeTweens();
        this.hintPositions = this.getHintPosition();
        console.warn(this.hintPositions);
        
        this.currentPoint = 0;

        this.showFirstTime();
    }

    private hide(): void {
        this.removeTweens();
        this.hand.visible = false;
    }

    private showFirstTime(): void {
        const point = this.hintPositions[this.currentPoint];        
        this.hand.scale.set(0.8);
        this.hand.alpha = 1;
        this.hand.position.set(point.x, point.y);
        this.hand.angle = 0;
        this.hand.visible = true;

        this.pointHand();
    }

    private pointHand(): void {
        anime({
            targets: this.hand.scale,
            x: 0.6,
            y: 0.6,
            duration: 500,
            easing: 'easeInOutCubic',
            direction: 'alternate',
            complete: () => {
                this.currentPoint += 1;
                console.warn(this.hintPositions.length % this.currentPoint, this.hintPositions.length,  this.currentPoint);
                
                this.currentPoint = this.currentPoint % this.hintPositions.length;
                this.moveHand(this.hintPositions[this.currentPoint]);

            },
        });
    }

    private moveHand(pos): void {
        anime({
            targets: this.hand,
            x: pos.x,
            y: pos.y,
            duration: 500,
            easing: 'easeInOutCubic',
            complete: () => this.pointHand(),
        });
    }

    private removeTweens(): void {
        anime.remove(this.hand);
        anime.remove(this.hand.scale);
    }

    private getHintPosition(): Point[] {
        switch (this.boardState) {
            case BoardState.ChooseCategory:
                return this.getCardHintPositions()
        
            default:
                return [new Point(0, 0)];
        }
    }

    private getCardHintPositions() {
        const categoriesWrapper = getViewByProperty('viewName', 'CategoriesWrapper');
        const cardsPos = categoriesWrapper.getHintPositions();
        return cardsPos.map(p=>this.toLocal(p));
    }

    private getKeyHintPositions() {
        const keyboardView = getViewByProperty('viewName', 'KeyboardView');
        const keyPos = keyboardView.getHintPosition();
        const pos = this.toLocal(keyPos);
        return [pos];
    }
}
