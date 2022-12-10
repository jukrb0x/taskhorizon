import { ActionIcon, Badge, Tooltip } from '@mantine/core';
import { IconBrandGithub, IconBulb, IconMail, IconMessage, IconMessageReport } from '@tabler/icons';
import { ReactNode } from 'react';
import clsx from 'clsx';
import styled from 'styled-components';

const LinkTo = (props: { href: string; children: ReactNode }) => {
    return (
        <a href={props.href} target={'_blank'} rel="noreferrer" style={{ color: 'inherit' }}>
            {props.children}
        </a>
    );
};

const SocialIcons = ({
    size = 18,
    showTooltip = false,
    space
}: {
    size?: number;
    showTooltip?: boolean;
    space?: number;
}) => {
    return (
        <>
            <div className={'tw-flex tw-flex-row'}>
                <Tooltip label={'Github'} position={'bottom'} withArrow disabled={!showTooltip}>
                    <div style={{ marginRight: `${space}px` }}>
                        <ActionIcon variant={'subtle'}>
                            <LinkTo href={'https://github.com/jukrb0x/taskhorizon'}>
                                <IconBrandGithub size={size} />
                            </LinkTo>
                        </ActionIcon>
                    </div>
                </Tooltip>
                <Tooltip label={'Feedback'} position={'bottom'} withArrow disabled={!showTooltip}>
                    <div style={{ marginRight: `${space}px` }}>
                        <ActionIcon variant={'subtle'}>
                            <LinkTo href={'https://github.com/jukrb0x/taskhorizon/issues'}>
                                <IconBulb size={size} />
                            </LinkTo>
                        </ActionIcon>
                    </div>
                </Tooltip>
            </div>
        </>
    );
};

export { SocialIcons };
