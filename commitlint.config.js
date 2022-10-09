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
    }
};
