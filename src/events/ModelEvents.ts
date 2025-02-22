export const AdModelEvents = {
    StatusUpdate: 'AdModelStatusUpdate',
    CtaUpdate: 'AdModelCtaUpdate',
    SoundUpdate: 'AdModelSoundUpdate',
    HintUpdate: 'AdModelHintUpdate',
};

export const BoardModelEvents = {
    CategoriesUpdate: 'BoardModelCategoriesUpdate',
    TimeUpdate: 'BoardModelTimeUpdate',
    StateUpdate: 'BoardModelStateUpdate',
    ChosenCategoryUpdate: 'BoardModelChosenCategoryUpdate',
};

export const CategoryModelEvents = {
    CurrentWaveIndexUpdate: 'CategoryModelCurrentWaveIndexUpdate',
    PlayingTimeUpdate: 'CategoryModelPlayingTimeUpdate',
    CurrentWaveUpdate: 'CategoryModelCurrentWaveUpdate',
    CurrentSongUpdate: 'CategoryModelCurrentSongUpdate',
    TimerCompletedUpdate: 'CategoryModelTimerCompletedUpdate',
    IsPlayingUpdate: 'CategoryModelIsPlayingUpdate',
};

export const ChoiceModelEvents = {
    IsRightUpdate: 'ChoiceModelIsRightUpdate',
    IsRevealedUpdate: 'ChoiceModelIsRevealedUpdate',
};

export const CtaModelEvents = { VisibleUpdate: 'CtaModelVisibleUpdate' };

export const GameModelEvents = {
    StateUpdate: 'GameModelStateUpdate',
    IsTutorialUpdate: 'GameModelIsTutorialUpdate',
    BoardUpdate: 'GameModelBoardUpdate',
};

export const HeadModelEvents = { GameModelUpdate: 'HeadModelGameModelUpdate', AdUpdate: 'HeadModelAdUpdate' };

export const HintModelEvents = { StateUpdate: 'HintModelStateUpdate', VisibleUpdate: 'HintModelVisibleUpdate' };

export const SoundModelEvents = { StateUpdate: 'SoundModelStateUpdate' };
