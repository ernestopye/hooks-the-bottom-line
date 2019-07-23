import React, { useState, useRef, useEffect, memo } from 'react';
import { Button } from 'reactstrap';

const LEFT = 0;
const CENTER = 1;
const RIGHT = 2;

const TO_THE_LEFT = -1;
const TO_THE_RIGHT = 1;

export function Example8() {
    const [active, setActive] = useState(false);
    const position1 = useDancing(LEFT, active);
    const position2 = useDancing(RIGHT, active);
    const position3 = useDancing(CENTER, active);

    return (
        <>
            <Button
                onClick={() => {
                    setActive(!active);
                }}
                style={{
                    zIndex: 2,
                    position: 'absolute',
                    top: '20px',
                    left: '20px'
                }}
            >
                {active ? 'Stop! 🤚' : 'Dance! 🎉'}
            </Button>
            <p />

            <div
                style={{
                    display: 'flex',
                    flexDirection: 'row',
                    justifyContent: 'center',
                    marginTop: '200px'
                }}
            >
                <DancingPokemon name="bulbasaur" position={position1} />
                <DancingPokemon name="pikachu" position={position2} />
                <DancingPokemon name="charmander" position={position3} />
                <DancingPokemon name="squirtle" position={position2} />
            </div>
        </>
    );
}

function useDancing(defaultPosition = CENTER, active = false) {
    let timerRef = useRef(null);
    const [position, setPosition] = useState(defaultPosition); // -1, 0, 1
    const [direction, setDirection] = useState(TO_THE_LEFT); // 0 - left, 1 - right

    useEffect(() => {
        if (!active) {
            if (timerRef.current) {
                // stop having fun
                clearTimeout(timerRef.current);
            }

            return;
        }

        timerRef.current = setTimeout(() => {
            // adjust position based on direction
            if (direction === TO_THE_LEFT) {
                if (position === LEFT) {
                    setPosition(CENTER);
                    setDirection(TO_THE_RIGHT);
                } else {
                    setPosition(position + direction);
                }
            } else if (direction === TO_THE_RIGHT) {
                if (position === RIGHT) {
                    setPosition(CENTER);
                    setDirection(TO_THE_LEFT);
                } else {
                    setPosition(position + direction);
                }
            }
        }, 450);

        return () => {
            // cleanup!
            if (timerRef.current) {
                clearTimeout(timerRef.current);
            }
        };
        // ensure we reset the timeout whenever these change
    }, [position, direction, active]);

    return position;
}

const DancingPokemon = memo(({ name, position }) => {
    return (
        <div style={{ width: '100px' }}>
            <img
                src={`/pokemon/${name}.png`}
                alt={name}
                style={getStyles(position)}
            />
        </div>
    );
});

function getRandomInt(max) {
    return Math.floor(Math.random() * Math.floor(max));
}

function getStyles(position) {
    const styles = { marginLeft: position * 10 + 'px' };

    if (getRandomInt(2)) {
        styles.transform = 'scaleX(-1)';
    }

    return styles;
}
