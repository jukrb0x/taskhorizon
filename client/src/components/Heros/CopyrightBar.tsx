import { SocialIcons } from '@/components';
import { Text } from '@mantine/core';

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
