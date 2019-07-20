import React, { useState, useEffect } from 'react';
import { ExternalEventDispatcher, DisplayPokemon, PokemonPicker } from './util';
import { fetchPokemon } from './data/fakeapi';

export function Example6() {
    // state is still lifted
    const [name, setName] = useState('Bulbasaur');
    const { loading, data } = usePokemonLoader({ name });

    usePokemonEventHandler({
        onPokemonLoaded: newPokemon => {
            setName(newPokemon);
        }
    });

    return (
        <>
            <PokemonPicker
                value={name}
                onChange={newPokemon => {
                    setName(newPokemon);
                }}
            />
            <hr />
            <DisplayPokemon loading={loading} data={data} />
            <hr />
            <ExternalEventDispatcher />
        </>
    );
}

// does one thing
function usePokemonLoader({ name }) {
    const [loading, setLoading] = useState(false);
    const [data, setData] = useState(null);

    useEffect(() => {
        (async () => {
            setLoading(true);

            // pass props to data fetcher.
            const pokemon = await fetchPokemon(name);

            console.debug('loaded:', pokemon);

            setLoading(false);
            setData(pokemon);
        })();
    }, [name]);

    return { loading, data };
}

// does one thing
function usePokemonEventHandler({ onPokemonLoaded }) {
    useEffect(() => {
        function onLoadPokemon(data) {
            console.debug('listened in hooks:', data.detail.name);
            onPokemonLoaded(data.detail.name);
        }

        document.addEventListener('load-pokemon', onLoadPokemon);

        return () => {
            console.debug('hooks: cleanup');
            document.removeEventListener('load-pokemon', onLoadPokemon);
        };
    }, []);
}
