import React, { useState, useEffect } from 'react';
import { Button } from 'reactstrap';
import { ExternalEventDispatcher } from './util';

export function Example4() {
    const [show, setShow] = useState(true);

    return (
        <div>
            <Button
                onClick={() => {
                    setShow(!show);
                }}
            >
                {show ? 'Unmount' : 'Mount'}
            </Button>

            {show ? (
                <>
                    <hr />
                    <EventHandlerClass />
                    {/* <hr />
                    <EventHandlerHooks /> */}
                </>
            ) : null}

            <hr />
            <ExternalEventDispatcher />
        </div>
    );
}

class EventHandlerClass extends React.Component {
    state = {
        name: 'Bulbasaur'
    };

    onLoadPokemon = data => {
        console.debug('listened in class:', data.detail.name);

        this.setState({
            name: data.detail.name
        });
    };

    componentDidMount() {
        document.addEventListener('load-pokemon', this.onLoadPokemon);
    }

    componentWillUnmount() {
        // avoid memory leaks
        console.debug('class: cleanup');
        document.removeEventListener('load-pokemon', this.onLoadPokemon);
    }

    render() {
        return <label>Class: {this.state.name}</label>;
    }
}

function EventHandlerHooks() {
    const [name, setName] = useState('Bulbasaur');

    useEffect(() => {
        // componentDidMount

        function onLoadPokemon(data) {
            console.debug('listened in hooks:', data.detail.name);
            setName(data.detail.name);
        }

        document.addEventListener('load-pokemon', onLoadPokemon);

        return () => {
            // componentWillUnmount

            console.debug('hooks: cleanup');
            document.removeEventListener('load-pokemon', onLoadPokemon);
        };
    }, []);

    return <label>Hooks: {name}</label>;
}
