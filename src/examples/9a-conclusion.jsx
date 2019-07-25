import React, { useState } from 'react';
import { Emoji } from './util';

export function Conclusion() {
    const [show, setShow] = useState(false);

    return (
        <>
            <h1>React Hooks: The Bottom Line</h1>
            <Emoji emoji="📈" /> Write less code, do more <br />
            <Emoji emoji="⚛️" /> Easier to be declarative rather than imperative
            <br />
            <Emoji emoji="👩‍🏫" /> The API is much more concise, but generally
            it's easier to teach (YMMV) <br />
            <Emoji emoji="🤩" /> Abstractions are easier to reason about and
            compose <br />
            <Emoji emoji="🥳" /> Rich ecosystem for custom hooks
            <br />
            <Emoji emoji="🎉" /> Smaller bundles!
            <br />
            <Emoji emoji="😎" /> Classes are cool too.
            <br />
            <Emoji emoji="👀" /> So about that {/* eslint-disable */}
            <a href="#" onClick={() => setShow(!show)}>
                bottom line...
            </a>
            {/* eslint-enable */}
            <br />
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
        </>
    );
}
