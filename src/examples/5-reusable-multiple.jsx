import React, { useState, useEffect } from 'react';
import { ExternalEventDispatcher, DisplayPokemon, PokemonPicker } from './util';
import { fetchPokemon } from './data/fakeapi';
import { PokemonDataFetcher } from './3-reusable';

// option 1, leave fetcher + event handler coupled
export function Example5() {
    // state is now managed by our frankencomponent.
    return (
        <div>
            <PokemonDataFetcherWithEventHandler>
                {({ loading, data }) => (
                    <DisplayPokemon loading={loading} data={data} />
                )}
            </PokemonDataFetcherWithEventHandler>
            <hr />
            <ExternalEventDispatcher />
        </div>
    );
}

/* 
    component that now does multiple things: ❗
    1. manages state of the current pokemon
    2. updates state when the custom event is caught
    3. loads data when its state updates
*/
export class PokemonDataFetcherWithEventHandler extends React.Component {
    state = {
        name: 'Bulbasaur',
        loading: false,
        data: null
    };

    async fetchData() {
        this.setState({
            loading: true
        });

        const pokemon = await fetchPokemon(this.state.name);

        console.debug('loaded:', pokemon);

        this.setState({
            data: pokemon,
            loading: false
        });
    }

    onLoadPokemon = data => {
        console.debug('listened in class:', data.detail.name);

        this.setState({
            name: data.detail.name
        });
    };

    // colocation issues start:
    componentDidMount() {
        // data loading
        this.fetchData();

        // event handler
        document.addEventListener('load-pokemon', this.onLoadPokemon);
    }

    componentDidUpdate(_, prevState) {
        if (prevState.name === this.state.name) {
            // don't reload the same data item
            return;
        }

        this.fetchData();
    }

    componentWillUnmount() {
        // avoid memory leaks
        console.debug('class: cleanup');
        document.removeEventListener('load-pokemon', this.onLoadPokemon);
    }

    render() {
        return this.props.children(this.state);
    }
}

// option 2, create an event handler component that doesn't render anything
export function Example5_2() {
    // state is still lifted
    const [name, setName] = useState('Bulbasaur');

    // common annoyance ❗
    // what if i have a function here that needs access to `loading` and `data`?
    /*
        function doSomething() {
            // check if loading is true here?
            // have to pass it into the function.
        }

        it's like a bag with lego duplo and mega blocks. they're sort of compatible, but not really.
    */

    return (
        <>
            <PokemonPicker
                value={name}
                onChange={newPokemon => {
                    setName(newPokemon);
                }}
            />
            {/* now this is in the component tree */}
            <PokemonEventHandler
                onPokemonLoaded={({ name }) => {
                    console.debug('external event detected');
                    setName(name);
                }}
            />
            <hr />
            {/* from example 3 */}
            <PokemonDataFetcher name={name}>
                {({ loading, data }) => (
                    <DisplayPokemon loading={loading} data={data} />
                )}
            </PokemonDataFetcher>
            <hr />
            <ExternalEventDispatcher />
        </>
    );
}

// this component only does one thing. much easier to maintain/test.
class PokemonEventHandler extends React.Component {
    onLoadPokemon = data => {
        console.debug('listened in class:', data.detail.name);

        this.props.onPokemonLoaded({ name: data.detail.name });
    };

    componentDidMount() {
        document.addEventListener('load-pokemon', this.onLoadPokemon);
    }

    componentWillUnmount() {
        // avoid memory leaks
        console.debug('class: cleanup');
        document.removeEventListener('load-pokemon', this.onLoadPokemon);
    }

    // this is unfortunate
    render() {
        return null;
    }
}
