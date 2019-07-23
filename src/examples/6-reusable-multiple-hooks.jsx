import React, { useState, useEffect } from 'react';
import { ExternalEventDispatcher, DisplayPokemon, PokemonPicker } from './util';
import { fetchPokemon } from './data/fakeapi';
import { Button } from 'reactstrap';

export function Example6() {
    // state is still lifted
    const [name, setName] = useState('Bulbasaur');

    const { loading, data } = usePokemonLoader({ name });

    usePokemonEventHandler({
        onPokemonLoaded: newPokemon => {
            setName(newPokemon);
        }
    });

    // bonus
    function someCallback() {
        if (loading) {
            alert('Hey relax, working on it.');
            return;
        }

        alert('Current Pokemon: ' + name);
    }

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
            <p />
            <Button onClick={() => someCallback()}>Show Current</Button>
        </>
    );
}

// does one thing only
export function usePokemonLoader({ name }) {
    const [loading, setLoading] = useState(true);
    const [data, setData] = useState(null);

    useEffect(() => {
        (async () => {
            setLoading(true);

            // pass props to data fetcher.
            const pokemon = await fetchPokemon(name);

            console.debug('custom hook loaded:', pokemon);

            setLoading(false);
            setData(pokemon);
        })();
    }, [name]);

    return { loading, data };
}

// does one thing only
export function usePokemonEventHandler({ onPokemonLoaded }) {
    // useEffect(() => {
    //     function onLoadPokemon(data) {
    //         console.debug('listened in hooks:', data.detail.name);
    //         onPokemonLoaded(data.detail.name);
    //     }
    //     document.addEventListener('load-pokemon', onLoadPokemon);
    //     return () => {
    //         console.debug('hooks: cleanup');
    //         document.removeEventListener('load-pokemon', onLoadPokemon);
    //     };
    // }, []);
}
