import React, { useState, useEffect } from 'react';
import { fetchPokemon } from './data/fakeapi';
import { DisplayPokemon, PokemonPicker } from './util';

export function Example2() {
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
            <PokemonDataFetcherClass name={pokemon} />
        </>
    );
}

export class PokemonDataFetcherClass extends React.Component {
    state = {
        loading: false,
        data: null
    };

    async fetchData() {
        this.setState({
            loading: true
        });

        // pass props to data fetcher.
        const pokemon = await fetchPokemon(this.props.name);

        console.debug('loaded:', pokemon);

        this.setState({
            data: pokemon,
            loading: false
        });
    }

    async componentDidMount() {
        // when the component mounts, get some data
        this.fetchData();
    }

    /*
     async componentDidUpdate(prevProps) {
         if (prevProps.name === this.props.name) {
             // don't reload the same data item
             return;
         }
        this.fetchData();
     }
    */

    render() {
        const { loading, data } = this.state;

        return <DisplayPokemon loading={loading} data={data} />;
    }
}

// function PokemonDataFetcherHooks({ name }) {
//     const [loading, setLoading] = useState(false);
//     const [data, setData] = useState(null);

//     // equivalent to componentDidMount
//     useEffect(() => {
//         (async () => {
//             setLoading(true);

//             // pass props to data fetcher.
//             const pokemon = await fetchPokemon(name);

//             console.debug('loaded:', pokemon);

//             setLoading(false);
//             setData(pokemon);
//         })();
//     }, []); // <-- ❗❗❗

//     return <DisplayPokemon loading={loading} data={data} />;
// }
