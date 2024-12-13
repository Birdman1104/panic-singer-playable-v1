import { lego } from '@armathai/lego';
import { BoardState } from '../../models/BoardModel';
import { CategoryName } from '../../models/CategoryModel';
import Head from '../../models/HeadModel';
import { setBoardStateCommand } from './Commands';

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
    lego.command.execute(revealAnswersCommand);
};

export const onAnswerShowCompleteCommand = (): void => {
    Head.gameModel?.board?.startNextWave();
};
