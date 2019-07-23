import React, { useState } from 'react';
import { fetchPokemon } from './data/fakeapi';
import { DisplayPokemon, PokemonPicker } from './util';

export function Example3() {
    const [pokemon, setPokemon] = useState('Bulbasaur');

    return (
        <>
            <PokemonPicker
                value={pokemon}
                onChange={newPokemon => {
                    setPokemon(newPokemon);
                }}
            />
            <hr />
            <PokemonDataFetcher name={pokemon}>
                {({ loading, data }) => (
                    <DisplayPokemon loading={loading} data={data} />
                )}
            </PokemonDataFetcher>
        </>
    );
}

export class PokemonDataFetcher extends React.Component {
    state = {
        loading: false,
        data: null
    };

    async fetchData() {
        this.setState({
            loading: true
        });

        const pokemon = await fetchPokemon(this.props.name);

        console.debug('loaded:', pokemon);

        this.setState({
            data: pokemon,
            loading: false
        });
    }

    async componentDidMount() {
        this.fetchData();
    }

    async componentDidUpdate(prevProps) {
        if (prevProps.name === this.props.name) {
            // don't reload the same data item
            return;
        }

        this.fetchData();
    }

    render() {
        return this.props.children(this.state);
    }
}

export function Example3Hooks() {
    const [pokemon, setPokemon] = useState('Bulbasaur');
    const { loading, data } = usePokemonLoader({ name: pokemon });

    return (
        <>
            <PokemonPicker
                value={pokemon}
                onChange={newPokemon => {
                    setPokemon(newPokemon);
                }}
            />
            <hr />
            <DisplayPokemon loading={loading} data={data} />
        </>
    );
}

// custom hook!
function usePokemonLoader({ name }) {
    // ???
}
