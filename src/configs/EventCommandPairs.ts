import { lego } from '@armathai/lego';
import { BoardEvents, ChooseSettingsEvents, MainGameEvents, SoundEvents, TakeMe } from '../events/MainEvents';
import { AdModelEvents, BoardModelEvents, GameModelEvents } from '../events/ModelEvents';
import {
    onAdStatusUpdateCommand,
    onBoardStateUpdateCommand,
    onGameStateUpdateCommand,
    onMainViewReadyCommand,
    onSoundToggleCommand,
    resizeCommand,
    takeToStoreCommand,
} from './Commands';
import {
    onCategoryClickCommand,
    onCountdownCompleteCommand,
    onMinusClickCommand,
    onPlusClickCommand,
    onStartClickCommand,
} from './GameCommands';

export const mapCommands = () => {
    eventCommandPairs.forEach(({ event, command }) => {
        lego.event.on(event, command);
    });
};

export const unMapCommands = () => {
    eventCommandPairs.forEach(({ event, command }) => {
        lego.event.off(event, command);
    });
};

const eventCommandPairs = Object.freeze([
    {
        event: MainGameEvents.MainViewReady,
        command: onMainViewReadyCommand,
    },
    {
        event: AdModelEvents.StatusUpdate,
        command: onAdStatusUpdateCommand,
    },
    {
        event: GameModelEvents.StateUpdate,
        command: onGameStateUpdateCommand,
    },
    {
        event: BoardModelEvents.StateUpdate,
        command: onBoardStateUpdateCommand,
    },
    {
        event: MainGameEvents.Resize,
        command: resizeCommand,
    },
    {
        event: TakeMe.ToStore,
        command: takeToStoreCommand,
    },
    {
        event: SoundEvents.SoundToggle,
        command: onSoundToggleCommand,
    },
    {
        event: BoardEvents.CategoryClick,
        command: onCategoryClickCommand,
    },
    {
        event: ChooseSettingsEvents.MinusClick,
        command: onMinusClickCommand,
    },
    {
        event: ChooseSettingsEvents.PlusClick,
        command: onPlusClickCommand,
    },
    {
        event: ChooseSettingsEvents.StartClick,
        command: onStartClickCommand,
    },
    {
        event: BoardEvents.CountdownComplete,
        command: onCountdownCompleteCommand,
    },
]);
