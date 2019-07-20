import React from 'react';
import { Button } from 'reactstrap';

export function DisplayPokemon({ loading, data }) {
    if (loading || data === null) {
        return 'Loading...';
    }

    const { name, image } = data;

    return (
        <>
            <label>{name}</label>
            <img src={image} alt={name} />
        </>
    );
}

const pokemon = ['Bulbasaur', 'Pikachu', 'Charmander', 'Squirtle'];

export function PokemonPicker({ value, onChange }) {
    return (
        <select
            onChange={e => {
                onChange(e.currentTarget.value);
            }}
            value={value}
        >
            {pokemon.map((name, i) => (
                <option value={name} key={`${name}-${i}`}>
                    {name}
                </option>
            ))}
        </select>
    );
}

export function ExternalEventDispatcher() {
    return (
        <Button
            onClick={() => {
                console.debug('triggering custom event ⚡');

                // force loading a specific pokemon from somewhere else on the page
                // can run this in dev tools
                document.dispatchEvent(
                    new CustomEvent('load-pokemon', {
                        detail: {
                            name: 'Pikachu'
                        }
                    })
                );
            }}
        >
            ⚡ External Event ⚡
        </Button>
    );
}
