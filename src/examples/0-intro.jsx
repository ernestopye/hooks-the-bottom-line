import React from 'react';
import { Emoji } from './util';

export function Example0() {
    return (
        <div>
            <h1>React Hooks: The Bottom Line</h1>
            <Emoji emoji="🙋‍♂️" /> Ernesto Pye (
            <a
                href="https://twitter.com/ernestopye"
                target="_blank"
                rel="noopener noreferrer"
            >
                @ErnestoPye
            </a>{' '}
            on Twitter)
            <br /> ‍<Emoji emoji="👨‍💻" /> Engineering Lead at AmericanEagle.com
            (not <Emoji emoji="👚" />/<Emoji emoji="👔" /> or{' '}
            <Emoji emoji="✈" />
            !)
            <br /> <Emoji emoji="🙌" /> We're hiring! Frontend, Backend,
            Full-Stack developers (JS/CSS/.NET/PHP)
            <br /> <Emoji emoji="📃" /> Apply now!{' '}
            <a
                href="https://jobs.americaneagle.com/"
                target="_blank"
                rel="noopener noreferrer"
            >
                https://jobs.americaneagle.com/
            </a>
        </div>
    );
}
