import React from 'react';

export function Conclusion() {
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
                <li>So about that bottom line...</li>
            </ul>
        </>
    );
}
