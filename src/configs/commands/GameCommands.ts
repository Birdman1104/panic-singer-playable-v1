import { lego } from '@armathai/lego';
import { AdStatus } from '../../models/AdModel';
import { BoardState } from '../../models/BoardModel';
import { CategoryName } from '../../models/CategoryModel';
import Head from '../../models/HeadModel';
import { hintModelGuard, reachedFinalWaveGuard } from '../Guards';
import { restartHintCommand, setAdStatusCommand, setBoardStateCommand, takeToStoreCommand } from './Commands';

export const onCategoryClickCommand = (categoryName: CategoryName): void => {
    Head.gameModel?.board?.setChosenCategory(categoryName);
    lego.command.payload(BoardState.ChooseSettings).execute(setBoardStateCommand);
};

export const onMinusClickCommand = (): void => Head.gameModel?.board?.decreaseTime();
export const onPlusClickCommand = (): void => Head.gameModel?.board?.increaseTime();

const revealAnswersCommand = (): void => Head.gameModel?.board?.revealAnswers();

export const onStartClickCommand = (): void => {
    lego.command.payload(BoardState.Countdown).execute(setBoardStateCommand);
};

export const onCountdownCompleteCommand = (): void => {
    lego.command.payload(BoardState.PlaySong).execute(setBoardStateCommand);
};

export const onChoiceClickCommand = (uuid: string): void => {
    lego.command

        .guard(reachedFinalWaveGuard)
        .payload(AdStatus.Cta)
        .execute(setAdStatusCommand)

        .guard(reachedFinalWaveGuard)
        .execute(takeToStoreCommand)

        .guard(lego.not(reachedFinalWaveGuard))
        .payload(BoardState.ShowAnswer)
        .execute(setBoardStateCommand);
};

export const onAnswerShowCompleteCommand = (): void => {
    lego.command.payload(BoardState.PlaySong).execute(setBoardStateCommand);
};

export const onSongTimerCompletedCommand = (completed: boolean): void => {
    if (completed) {
        lego.command
            .guard(lego.not(reachedFinalWaveGuard))
            .payload(BoardState.ShowAnswer)
            .execute(setBoardStateCommand);
    }
};
