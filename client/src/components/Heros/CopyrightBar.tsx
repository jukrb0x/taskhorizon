import { Text } from '@mantine/core';

import { SocialIcons } from '@/components';

const CopyrightBar = () => {
    return (
        <div className={'tw-flex tw-flex-row tw-place-content-between'}>
            <SocialIcons />
            <Text size={'sm'} color={'dimmed'}>
                &copy; jukrb0x 2022
            </Text>
        </div>
    );
};

export { CopyrightBar };
