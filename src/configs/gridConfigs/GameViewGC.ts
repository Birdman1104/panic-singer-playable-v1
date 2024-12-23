import { CellScale } from '@armathai/pixi-grid';
import { lp } from '../../utils';

export const getGameViewGridConfig = () => {
    return lp(getGameViewGridLandscapeConfig, getGameViewGridPortraitConfig).call(null);
};

const getGameViewGridLandscapeConfig = () => {
    const bounds = { x: 0, y: 0, width: document.body.clientWidth, height: document.body.clientHeight };
    return {
        name: 'game',
        // debug: { color: 0xd9ff27 },
        bounds,
        cells: [
            {
                name: 'main',
                bounds: { x: 0, y: 0, width: 1, height: 1 },
            },
            {
                name: 'wave',
                bounds: { x: 0, y: 0.05, width: 1, height: 0.9 },
                scale: CellScale.fit,
            },
            {
                name: 'choose_category',
                bounds: { x: 0, y: 0, width: 1, height: 1 },
            },
            {
                name: 'choose_category_left',
                bounds: { x: -0.5, y: 0, width: 1, height: 1 },
            },
            {
                name: 'choose_settings_right',
                bounds: { x: 1, y: 0, width: 1, height: 1 },
            },
            {
                name: 'choose_settings',
                bounds: { x: 0, y: 0, width: 1, height: 1 },
            },
        ],
    };
};

const getGameViewGridPortraitConfig = () => {
    const bounds = { x: 0, y: 0, width: document.body.clientWidth, height: document.body.clientHeight };

    return {
        name: 'game',
        // debug: { color: 0xd9ff27 },
        bounds,
        cells: [
            {
                name: 'main',
                bounds: { x: 0, y: 0, width: 1, height: 1 },
            },
            {
                name: 'wave',
                bounds: { x: 0.05, y: 0.1, width: 0.9, height: 0.8 },
                scale: CellScale.fit,
            },
            {
                name: 'choose_category',
                bounds: { x: 0.05, y: 0, width: 0.9, height: 1 },
            },
            {
                name: 'choose_category_left',
                bounds: { x: -0.5, y: 0, width: 0.9, height: 1 },
            },
            {
                name: 'choose_settings',
                bounds: { x: 0, y: 0, width: 1, height: 1 },
            },
            {
                name: 'choose_settings_right',
                bounds: { x: 1, y: 0, width: 1, height: 1 },
            },
        ],
    };
};
