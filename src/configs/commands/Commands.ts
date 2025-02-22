import { lego } from '@armathai/lego';
import { AdStatus } from '../../models/AdModel';
import { BoardState } from '../../models/BoardModel';
import { GameState } from '../../models/GameModel';
import Head from '../../models/HeadModel';
import { HintState } from '../../models/HintModel';
import { unMapCommands } from '../EventCommandPairs';
import { ctaModelGuard, gameModelGuard, hintModelGuard, hintParamGuard, soundParamGuard } from '../Guards';
import { GAME_CONFIG } from '../GameConfig';

export const initAdModelCommand = (): void => Head.initializeADModel();

export const onMainViewReadyCommand = (): void => {
    lego.command
        //
        .execute(initAdModelCommand)

        .payload(AdStatus.Game)
        .execute(setAdStatusCommand)

        .payload(BoardState.ChooseCategory)
        .execute(setBoardStateCommand);
};

const initializeGameModelCommand = (): void => Head.initializeGameModel();
const initializeCtaModelCommand = (): void => Head.ad?.initializeCtaModel();
const initializeSoundModelCommand = (): void => Head.ad?.initializeSoundModel();
const initializeHintModelCommand = (): void => Head.ad?.initializeHintModel();

const startIdleTimerCommand = (): void => Head.ad?.startIdleTimer();
const stopIdleTimerCommand = (): void => Head.ad?.stopIdleTimer();

const setHintStateCommand = (state: HintState): void => Head.ad?.hint?.setState(state);
const startHintVisibilityTimerCommand = (time?: number): void => Head.ad?.hint?.startVisibilityTimer(time);
const stopHintVisibilityTimerCommand = (): void => Head.ad?.hint?.stopVisibilityTimer();

const initializeModelsCommand = (): void => {
    lego.command

        .execute(initializeGameModelCommand)

        .execute(initializeCtaModelCommand)

        .guard(soundParamGuard)
        .execute(initializeSoundModelCommand)

        .guard(hintParamGuard)
        .execute(initializeHintModelCommand);

    // .execute(startIdleTimerCommand);

    // .guard(hintParamGuard)
    // .execute(startHintVisibilityTimerCommand);
};

const hideHintCommand = (): void => {
    lego.command.payload(false).execute(setHintVisibleCommand);
};

const setHintVisibleCommand = (value: boolean): void => {
    Head.ad?.hint?.setVisibility(value);
};

const destroyGameModelCommand = (): void => Head.destroyGameModel();
const destroyCtaModelCommand = (): void => Head.ad?.destroyCtaModel();
const destroySoundModelCommand = (): void => Head.ad?.destroySoundModel();
const destroyHintModelCommand = (): void => Head.ad?.destroyHintModel();
export const setAdStatusCommand = (status: AdStatus): void => Head.ad?.setAdStatus(status);

const shutdownModelsCommand = (): void => {
    lego.command

        .guard(gameModelGuard)
        .execute(destroyGameModelCommand)

        .guard(ctaModelGuard)
        .execute(destroyCtaModelCommand)

        .guard(soundParamGuard)
        .execute(destroySoundModelCommand)

        .guard(hintModelGuard)
        .execute(destroyHintModelCommand);
};

export const onAdStatusUpdateCommand = (status: AdStatus): void => {
    switch (status) {
        case AdStatus.Game:
            lego.command
                //
                .execute(initializeModelsCommand);

            break;
        case AdStatus.PreCta:
            lego.command
                //
                .execute(unMapCommands)

                .guard(hintModelGuard)
                .execute(destroyHintModelCommand);
            break;
        case AdStatus.Cta:
            lego.command
                //
                .execute(takeToStoreCommand)
                .execute(showCtaCommand);

            break;
        default:
            break;
    }
};

const setGameStateCommand = (state: GameState): void => Head.gameModel?.setState(state);
export const setBoardStateCommand = (state: BoardState): void => Head.gameModel?.board?.setState(state);
const showCtaCommand = (): void => Head.ad?.cta?.show();

const turnOffTutorialModeCommand = (): void => Head.gameModel?.turnOffTutorialMode();

export const onGameStateUpdateCommand = (state: GameState): void => {
    switch (state) {
        case GameState.Idle:
            //
            break;

        default:
            break;
    }
};

export const onBoardStateUpdateCommand = (state: BoardState): void => {
    lego.command.execute(hideHintCommand);

    switch (state) {
        case BoardState.ChooseCategory:
            Head.gameModel?.board?.initializeCategories();
            lego.command.execute(restartHintCommand);
            break;
        case BoardState.ChooseSettings:
            lego.command.execute(restartHintCommand);
            break;
        case BoardState.Countdown:
            Head.gameModel?.board?.setCategorySongs();
            break;
        case BoardState.PlaySong:
            // TODO - check if the game ends
            Head.gameModel?.board?.startNextWave();
            Head.gameModel?.board?.startCountdown();
            lego.command.payload(1).execute(restartHintCommand);
            break;
        case BoardState.ShowAnswer:
            Head.gameModel?.board?.stopWaveTimer();
            setTimeout(() => {
                //     Head.gameModel?.board?.resetWaveTimer();
                Head.gameModel?.board?.revealAnswers();
            });
            break;

        default:
            break;
    }
};

export const restartHintCommand = (delay = GAME_CONFIG.HintOnIdle): void => {
    lego.command
        //
        .guard(hintModelGuard)
        .execute(hideHintCommand)

        .guard(hintModelGuard)
        .execute(stopHintVisibilityTimerCommand)

        .guard(hintModelGuard)
        .payload(delay)
        .execute(startHintVisibilityTimerCommand);
};

export const resizeCommand = (): void => {
    lego.command
        //
        .guard(hintModelGuard)
        .execute(hideHintCommand)

        .guard(hintModelGuard)
        .execute(stopHintVisibilityTimerCommand)

        .guard(hintModelGuard)
        .execute(startHintVisibilityTimerCommand);
};

export const onSoundToggleCommand = (): void => {
    Head.ad?.sound?.toggle();
};

export const takeToStoreCommand = (): void => {
    // if (!window.installCTA) {
    window.CTACallImitation && window.CTACallImitation();
    // } else {
    //     window.installCTA();
    // }
};
