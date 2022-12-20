import { Title, Card, Avatar } from '@mantine/core';

export const SettingsProfile = () => {
    return (
        <div className={'flex'}>
            <Title order={2}>Profile</Title>
            <Card radius={'lg'} withBorder>
                <Avatar radius={'xl'} size={'xl'} />
            </Card>
        </div>
    );
};
