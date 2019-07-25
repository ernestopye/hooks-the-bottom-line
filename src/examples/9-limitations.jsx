import React from 'react';
import { Emoji } from './util';

export function Limitations() {
    return (
        <>
            <h1>Is there anything they can't do?! (yes)</h1>
            <Emoji emoji="🙁" /> componentDidCatch is not available (yet)
            <br />
            <Emoji emoji="🙀" /> No shouldComponentUpdate either! <br />
            <Emoji emoji="🤯" /> useMemo, React.memo. But more importantly,
            profile first! <br />
            <Emoji emoji="⚛️" /> Fully committing to a declarative style can be
            difficult <br />
            <br />
            <h3>Are there other built-in hooks?</h3>
            <Emoji emoji="☝️" /> Yep! useReducer, useCallback... <br />
            <Emoji emoji="🙇‍♂️" /> Read the docs! You can learn about the other
            hooks I'm hiding from you
            <br />
        </>
    );
}
