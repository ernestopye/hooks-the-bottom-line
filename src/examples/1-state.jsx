import React, { useState } from 'react';
import { Button } from 'reactstrap';

export function Example1() {
    return (
        <div className="App">
            <FormFieldsClass />
            <hr />
            <FormFieldsHooks />
            <hr />
            <FormFieldsHooksMergedState />
        </div>
    );
}

export class FormFieldsClass extends React.Component {
    state = {
        text: 'Initial Value',
        clicks: 0
    };

    render() {
        return (
            <>
                <strong>Class:</strong>
                <br />
                <input
                    className="form-control"
                    type="text"
                    value={this.state.text}
                    onChange={e => {
                        this.setState({ text: e.currentTarget.value }, () => {
                            console.debug('State updated!');
                        });
                    }}
                />
                <p />
                <Button
                    onClick={() => {
                        this.setState(prevState => ({
                            clicks: prevState.clicks + 1
                        }));
                    }}
                >
                    Click! {this.state.clicks}
                </Button>{' '}
                {this.state.text}
            </>
        );
    }
}

export function FormFieldsHooks() {
    const [text, setText] = useState('Initial Value');
    const [clicks, setClicks] = useState(0);

    return (
        <>
            <strong>Hooks:</strong>
            <br />
            <input
                className="form-control"
                type="text"
                value={text}
                onChange={e => {
                    // GOTCHA: state updates are still async, but there's no callback
                    setText(e.currentTarget.value);
                    console.debug('always behind:', text);
                }}
            />
            <p />
            <Button
                onClick={() => {
                    setClicks(clicks + 1);
                }}
            >
                Click! {clicks}
            </Button>{' '}
            {text}
        </>
    );
}

export function FormFieldsHooksMergedState() {
    const [state, setState] = useState({
        text: 'Initial Value',
        clicks: 0
    });

    return (
        <>
            <strong>Hooks (Merged State):</strong>
            <br />
            <input
                className="form-control"
                type="text"
                value={state.text}
                onChange={e => {
                    // GOTCHA: no more merged state updates!
                    setState({
                        text: e.currentTarget.value
                    });
                    console.debug('always behind:', state.text);
                }}
            />
            <p />
            <Button
                onClick={() => {
                    // GOTCHA: no more merged state updates!
                    setState({
                        clicks: state.clicks + 1
                    });
                }}
            >
                Click! {state.clicks}
            </Button>{' '}
            {state.text}
        </>
    );
}
