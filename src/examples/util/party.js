import React, { useRef, useEffect } from 'react';
import ConfettiGenerator from 'confetti-js';

export function Confetti({ active }) {
    useEffect(() => {
        if (!active) {
            return;
        }

        const confettiSettings = {
            target: 'confetti',
            max: '500',
            size: '1',
            animate: true,
            props: ['circle', 'square', 'triangle', 'line'],
            colors: [
                [165, 104, 246],
                [230, 61, 135],
                [0, 199, 228],
                [253, 214, 126]
            ],
            clock: '30',
            rotate: true,
            width: window.innerWidth,
            height: window.innerHeight
        };

        const confetti = new ConfettiGenerator(confettiSettings);
        confetti.render();

        return () => {
            if (confetti) {
                confetti.clear();
            }
        };
    }, [active]);

    return (
        <canvas
            id="confetti"
            style={{
                position: 'absolute',
                left: 0,
                top: 0,
                width: '100%',
                height: '100%'
            }}
        />
    );
}

export function PartyMusic({ active }) {
    const audioRef = useRef(null);

    useEffect(() => {
        audioRef.current.currentTime = 13;
    }, []);

    useEffect(() => {
        if (!audioRef.current) {
            return;
        }

        if (active) {
            audioRef.current.play();
        } else {
            audioRef.current.pause();
        }
    }, [active]);

    return (
        <audio
            ref={audio => {
                audioRef.current = audio;
            }}
        >
            <source src="/pokemon/pokemonparty.mp3" type="audio/mpeg" />
        </audio>
    );
}
