import React, { useState } from 'react';
import { Button } from 'reactstrap';
import { Emoji } from './util';

export function Conclusion() {
    const [show, setShow] = useState(false);

    return (
        <>
            <h1>React Hooks: The Bottom Line</h1>
            <ul>
                <li>Write less code, do more</li>
                <li>Easier to be declarative rather than imperative</li>
                <li>
                    The API is much more concise, but generally there is less to
                    teach.
                </li>
                <li>Abstractions are easier to reason about and compose.</li>
                <li>Rich ecosystem for custom hooks.</li>
                <li>
                    Worry about performance when necessary (re-renders aren't
                    always bad + profile, profile, profile!)
                </li>
                <li>
                    So about that bottom line...{' '}
                    <Button
                        type="button"
                        size="sm"
                        onClick={() => setShow(true)}
                    >
                        <Emoji emoji="👀" />
                    </Button>
                </li>
                {show ? (
                    <a
                        href="https://bit.ly/nwcjs"
                        target="_blank"
                        rel="noopener noreferrer"
                        style={{ fontSize: '2em' }}
                    >
                        https://bit.ly/nwcjs
                    </a>
                ) : null}
            </ul>
        </>
    );
}
