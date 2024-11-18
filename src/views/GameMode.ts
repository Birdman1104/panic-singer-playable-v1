import { Container, Sprite, Text } from 'pixi.js';
import { Images } from '../assets';
import { makeSprite } from '../utils';

export class GameMode extends Container {
    private bkgType: Sprite;
    private singleplayer: Sprite;
    private multiplayer: Sprite;
    private lockType: Sprite;
    private greenBkgSinglePlayer: Sprite;

    private bkgHard: Sprite;
    private easyText: Text;
    private hardText: Text;
    private lockHard: Sprite;
    private greenBkgHard: Sprite;

    constructor() {
        super();

        this.build();
    }

    private build(): void {
        this.buildBkgType();
        this.buildGreenBkgType();
        this.buildSinglePlayer();
        this.buildMultiplayer();
        this.buildLockType();

        this.buildBkgHard();
        this.buildGreenBkgHard();
        this.buildEasyText();
        this.buildHardText();
        this.buildLockHard();
    }

    private buildBkgType(): void {
        this.bkgType = makeSprite({ texture: Images['game/bkg'] });
        this.bkgType.anchor.set(0.5);
        this.bkgType.position.set(0, 0);
        this.addChild(this.bkgType);
    }

    private buildBkgHard(): void {
        this.bkgHard = makeSprite({ texture: Images['game/bkg'] });
        this.bkgHard.anchor.set(0.5);
        this.bkgHard.position.set(0, 100);
        this.addChild(this.bkgHard);
    }

    private buildGreenBkgType(): void {
        this.greenBkgSinglePlayer = makeSprite({ texture: Images['game/green_bkg'] });
        this.greenBkgSinglePlayer.anchor.set(0.5);
        this.greenBkgSinglePlayer.position.set(129, this.bkgType.y - 1);
        this.addChild(this.greenBkgSinglePlayer);
    }

    private buildGreenBkgHard(): void {
        this.greenBkgHard = makeSprite({ texture: Images['game/green_bkg'] });
        this.greenBkgHard.anchor.set(0.5);
        this.greenBkgHard.position.set(-131, this.bkgHard.y - 1);
        this.addChild(this.greenBkgHard);
    }

    private buildEasyText(): void {
        this.easyText = new Text('Easy', {
            fill: 0xffffff,
            fontFamily: 'Arial',
            fontSize: 30,
            fontWeight: 900,
        });
        this.easyText.anchor.set(0.5);
        this.easyText.position.set(-129, this.bkgHard.y - 1);
        this.addChild(this.easyText);
    }

    private buildHardText(): void {
        this.hardText = new Text('Hard', {
            fill: 0xffffff,
            fontFamily: 'Arial',
            fontSize: 30,
            fontWeight: 900,
        });
        this.hardText.anchor.set(0.5);
        this.hardText.position.set(129, this.bkgHard.y - 1);
        this.addChild(this.hardText);
    }

    private buildSinglePlayer(): void {
        this.singleplayer = makeSprite({ texture: Images['game/singleplayer'] });
        this.singleplayer.anchor.set(0.5);
        this.singleplayer.scale.set((this.greenBkgSinglePlayer.height - 10) / this.singleplayer.height);
        this.singleplayer.position.set(this.greenBkgSinglePlayer.x, this.bkgType.y);
        this.addChild(this.singleplayer);
    }

    private buildMultiplayer(): void {
        this.multiplayer = makeSprite({ texture: Images['game/multiplayer'] });
        this.multiplayer.anchor.set(0.5);
        this.multiplayer.scale.set((this.greenBkgSinglePlayer.height - 10) / this.multiplayer.height);
        this.multiplayer.position.set(-129, this.bkgType.y);
        this.addChild(this.multiplayer);
    }

    private buildLockType(): void {
        this.lockType = makeSprite({ texture: Images['game/lock'] });
        this.lockType.anchor.set(0.5);
        this.lockType.scale.set((this.greenBkgSinglePlayer.height - 20) / this.lockType.height);
        this.lockType.position.set(-190, this.bkgType.y);
        this.addChild(this.lockType);
    }

    private buildLockHard(): void {
        this.lockHard = makeSprite({ texture: Images['game/lock'] });
        this.lockHard.anchor.set(0.5);
        this.lockHard.scale.set((this.greenBkgSinglePlayer.height - 20) / this.lockHard.height);
        this.lockHard.position.set(70, this.bkgHard.y - 1);
        this.addChild(this.lockHard);
    }
}
