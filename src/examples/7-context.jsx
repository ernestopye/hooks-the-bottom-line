import React, { useContext } from 'react';
import { DisplayPokemon, Spinner } from './util';
import { usePokemonLoader } from './6-reusable-multiple-hooks';
import { PokemonDataFetcher } from './3-reusable';

// contrived example, but we've ran into this in fairly practical situations.
const FirstPokemonContext = React.createContext(null);
const SecondPokemonContext = React.createContext(null);

export function Example7() {
    return (
        <FirstPokemonContext.Provider value={'Bulbasaur'}>
            <SecondPokemonContext.Provider value={'Charmander'}>
                <strong>Class:</strong>
                <br />
                <ContextConsumerClass />
                <hr />
                <strong>Hooks:</strong>
                <br />
                <ContextConsumerHooks />
            </SecondPokemonContext.Provider>
        </FirstPokemonContext.Provider>
    );
}

class ContextConsumerClass extends React.Component {
    // this was handy, but only allows one context to be consumed!
    static contextType = FirstPokemonContext;

    // 1. what if i wanted a single loading message until both are loaded?
    // 2. notice how polluted the component tree starts to get (check dev tools!)

    render() {
        return (
            <>
                <FirstPokemonContext.Consumer>
                    {value => (
                        <PokemonDataFetcher name={value}>
                            {({ loading, data }) => (
                                <DisplayPokemon loading={loading} data={data} />
                            )}
                        </PokemonDataFetcher>
                    )}
                </FirstPokemonContext.Consumer>
                <SecondPokemonContext.Consumer>
                    {value => (
                        <PokemonDataFetcher name={value}>
                            {({ loading, data }) => (
                                <DisplayPokemon loading={loading} data={data} />
                            )}
                        </PokemonDataFetcher>
                    )}
                </SecondPokemonContext.Consumer>
            </>
        );
    }
}

function ContextConsumerHooks() {
    // can consumer multiple contexts, no component tree pollution
    const firstPokemon = useContext(FirstPokemonContext);
    const secondPokemon = useContext(SecondPokemonContext);

    const { loading: loadingFirst, data: dataFirst } = usePokemonLoader({
        name: firstPokemon
    });

    const { loading: loadingSecond, data: dataSecond } = usePokemonLoader({
        name: secondPokemon
    });

    // easy!
    if (loadingFirst || loadingSecond) {
        return <Spinner />;
    }

    // and check out that clean component tree in dev tools!
    return (
        <>
            <DisplayPokemon loading={loadingFirst} data={dataFirst} />
            <DisplayPokemon loading={loadingSecond} data={dataSecond} />
            <hr />
        </>
    );
}
