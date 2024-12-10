import { lego } from '@armathai/lego';
import { Howl } from 'howler';
import { MainGameEvents } from './events/MainEvents';
import { SoundModelEvents } from './events/ModelEvents';
import { SoundState } from './models/SoundModel';
import { HIGHWAY_TO_HELL } from './sounds/ACDC';
import { BLUE } from './sounds/BillieEilish';
import { KNOCKIN_ON_HEAVENS_DOOR } from './sounds/GunsNRoses';
import { STARWAY_TO_HEAVEN } from './sounds/LedZeppelin';
import { SNAP } from './sounds/RosaLin';
import { ESPRESSO } from './sounds/Sabrina';
import { I_WANT_IT_THAT_WAY } from './sounds/backstreetBoys';
import { STAYIN_ALIVE } from './sounds/beeGees';
import { RASPUTIN } from './sounds/bonnyM';
import { CLICK_SOUND } from './sounds/click';

class SoundControl {
    private sounds: { [key: string]: Howl };
    private isMutedFromIcon = false;

    public constructor() {
        this.sounds = {};

        lego.event
            .on(MainGameEvents.MuteUpdate, this.focusChange, this)
            .on(SoundModelEvents.StateUpdate, this.onSoundStateUpdate, this);
    }

    public loadSounds(): void {
        this.sounds.click = new Howl({ src: CLICK_SOUND });
        this.sounds.acdc = new Howl({ src: HIGHWAY_TO_HELL });
        this.sounds.backstreetBoys = new Howl({ src: I_WANT_IT_THAT_WAY });
        this.sounds.beeGees = new Howl({ src: STAYIN_ALIVE });
        this.sounds.billieEilish = new Howl({ src: BLUE });
        this.sounds.bonnyM = new Howl({ src: RASPUTIN });
        this.sounds.gunsNroses = new Howl({ src: KNOCKIN_ON_HEAVENS_DOOR });
        this.sounds.ledZeppelin = new Howl({ src: STARWAY_TO_HEAVEN });
        this.sounds.rosaLin = new Howl({ src: SNAP });
        this.sounds.sabrina = new Howl({ src: ESPRESSO });
    }

    private playClick(): void {
        this.sounds.click.play();
    }

    private focusChange(outOfFocus: boolean): void {
        if (this.isMutedFromIcon) return;
        for (const [key, value] of Object.entries(this.sounds)) {
            value.volume(outOfFocus ? 0 : key === 'click' ? 0.9 : 1);
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
            value.volume(key === 'click' ? 0.9 : 1);
        }
    }
}

const SoundController = new SoundControl();
export default SoundController;
