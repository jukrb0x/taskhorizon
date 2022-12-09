// const fs = require('fs')
// const path = require('path')
// const packages = fs.readdirSync(path.resolve(__dirname, 'packages'))

/** @type {import("cz-git").UserConfig} */
module.exports = {
    ignores: [(commit) => commit.includes('init')],
    extends: ['@commitlint/config-conventional'],
    rules: {
        'subject-empty': [2, 'never'],
        'type-empty': [2, 'never'],
        'type-enum': [
            2,
            'always',
            [
                'feat',
                'fix',
                'perf',
                'style',
                'docs',
                'test',
                'refactor',
                'build',
                'ci',
                'chore',
                'revert',
                'wip',
                'workflow',
                'types',
                'release'
            ]
        ]
    },
    prompt: {
        /** @use `pnpm commit :f` */
        useEmoji: true,
        alias: {
            t: 'fix: typo',
            r: 'docs: update README',
            s: 'style: format the code',
            b: 'build: bump dependencies',
            c: 'chore: update config'
        },
        allowEmptyIssuePrefixs: false,
        allowCustomIssuePrefixs: false,
        typesAppend: [
            { value: 'wip', name: 'wip:      work in process', emoji: '🚧' },
            { value: 'workflow', name: 'workflow: workflow improvements', emoji: '🤖' },
            { value: 'types', name: 'types:    type definition file changes', emoji: '🏷️' }
        ]
    }
};
