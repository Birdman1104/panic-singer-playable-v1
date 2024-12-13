import { lego } from '@armathai/lego';
import { Howl } from 'howler';
import { MainGameEvents, WaveEvents } from './events/MainEvents';
import { CategoryModelEvents, SoundModelEvents } from './events/ModelEvents';
import { SoundState } from './models/SoundModel';
import { HIGHWAY_TO_HELL } from './sounds/ACDC';
import { I_WANT_IT_THAT_WAY } from './sounds/BackstreetBoys';
import { STAYIN_ALIVE } from './sounds/BeeGees';
import { BLUE } from './sounds/BillieEilish';
import { RASPUTIN } from './sounds/BonnyM';
import { KNOCKIN_ON_HEAVENS_DOOR } from './sounds/GunsNRoses';
import { STARWAY_TO_HEAVEN } from './sounds/LedZeppelin';
import { SNAP } from './sounds/RosaLin';
import { ESPRESSO } from './sounds/Sabrina';

export const AUDIO_DATA = [
    {
        key: 'acdc',
        sound: HIGHWAY_TO_HELL,
    },
    {
        key: 'backstreetBoys',
        sound: I_WANT_IT_THAT_WAY,
    },
    {
        key: 'beeGees',
        sound: STAYIN_ALIVE,
    },
    {
        key: 'billieEilish',
        sound: BLUE,
    },
    {
        key: 'bonnyM',
        sound: RASPUTIN,
    },
    {
        key: 'gunsNroses',
        sound: KNOCKIN_ON_HEAVENS_DOOR,
    },
    {
        key: 'ledZeppelin',
        sound: STARWAY_TO_HEAVEN,
    },
    {
        key: 'rosaLin',
        sound: SNAP,
    },
    {
        key: 'sabrina',
        sound: ESPRESSO,
    },
];

class SoundControl {
    private sounds: { [key: string]: Howl };
    private isMutedFromIcon = false;

    private currentSong: string;

    public constructor() {
        this.sounds = {};

        lego.event
            .on(MainGameEvents.MuteUpdate, this.focusChange, this)
            .on(SoundModelEvents.StateUpdate, this.onSoundStateUpdate, this)
            .on(WaveEvents.ChoiceClick, this.onStopCurrentSong, this)
            .on(CategoryModelEvents.CurrentSongUpdate, this.onCurrentSongUpdate, this);
    }

    public loadSounds(): void {
        AUDIO_DATA.forEach(({ key, sound }) => {
            this.sounds[key] = new Howl({ src: sound });
        });
    }

    private onCurrentSongUpdate(key: string): void {
        this.currentSong = key;
        this.sounds[key]?.play();
    }

    private onStopCurrentSong(): void {
        this.sounds[this.currentSong]?.stop();
    }

    private focusChange(outOfFocus: boolean): void {
        if (this.isMutedFromIcon) return;
        for (const [key, value] of Object.entries(this.sounds)) {
            value.volume(outOfFocus ? 0 : 1);
        }
    }

    private onSoundStateUpdate(state: SoundState): void {
        state === SoundState.On ? this.unmute() : this.mute();
    }

    private mute(): void {
        this.isMutedFromIcon = true;
        for (const [key, value] of Object.entries(this.sounds)) {
            value.volume(0);
        }
    }

    private unmute(): void {
        this.isMutedFromIcon = false;
        for (const [key, value] of Object.entries(this.sounds)) {
            value.volume(1);
        }
    }
}

const SoundController = new SoundControl();
export default SoundController;
