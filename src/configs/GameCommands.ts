import { lego } from '@armathai/lego';
import { BoardState } from '../models/BoardModel';
import { CategoryName } from '../models/CategoryModel';
import Head from '../models/HeadModel';
import { setBoardStateCommand } from './Commands';

export const onCategoryClickCommand = (categoryName: CategoryName): void => {
    Head.gameModel?.board?.setChosenCategory(categoryName);
    lego.command.payload(BoardState.ChooseTime).execute(setBoardStateCommand);
};