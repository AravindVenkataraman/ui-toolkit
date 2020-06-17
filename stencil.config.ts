import {Config} from '@stencil/core';
import {sass} from '@stencil/sass';
import {postcss} from '@stencil/postcss';
import autoprefixer from 'autoprefixer';
import path from 'path';

export const config: Config = {
    devServer: {
        reloadStrategy: 'pageReload',
        port: 4444
    },
    namespace: 'CVS',
    globalStyle: 'src/assets/styles/global.scss',
    excludeSrc: ['**/*.stories.tsx'],
    plugins: [
        sass({
            includePaths: [
                path.join(__dirname, 'node_modules'),
                path.join(__dirname, '../../node_modules'),
            ]
        }),
        postcss({
            plugins: [autoprefixer()],
        }),
    ],
    outputTargets: [
        {
            type: 'dist'
        },
        {
            type: 'www',
            serviceWorker: null
        },
        {
            type: 'docs-readme'
        }
    ],
    preamble: '(C) CVS Health',
};
