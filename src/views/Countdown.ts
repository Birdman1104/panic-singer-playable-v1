import anime from 'animejs';
import { Container, Rectangle, Text } from 'pixi.js';
import { delayRunnable } from '../utils';

export class Countdown extends Container {
    private text: Text;

    constructor() {
        super();
        this.build();
    }

    public getBounds(): Rectangle {
        return new Rectangle(-200, -100, 400, 200);
    }

    public destroy(): void {
        anime.remove(this.text);
        anime.remove(this.text.scale);
        super.destroy();
    }

    private build(): void {
        let duration = 3;
        const text = new Text(`${duration}`, {
            fontFamily: 'Arial',
            fontSize: 40,
            fill: 0xffffff,
            fontWeight: 'bold',
        });
        text.anchor.set(0.5);
        this.addChild(text);
        this.text = text;

        const animate = (text: Text, i: number) => {
            text.text = `${i === 0 ? 'LETS GO!' : i}`;
            anime({
                targets: text.scale,
                x: 1.85,
                y: 1.85,
                duration: 250,
                direction: 'alternate',
                easing: 'easeInOutSine',
                complete: () => {
                    delayRunnable(0.5, () => {
                        if (i === 0) {
                            this.emit('countdownComplete');
                        } else {
                            animate(text, i - 1);
                        }
                    });
                },
            });
        };

        animate(text, duration);
    }
}
