import { Alert, Card, Code, Group, Text, Title } from '@mantine/core';
import { IconAlertCircle, IconBrandGithub, IconQuestionMark } from '@tabler/icons';

import { Button, CopyrightBar, WelcomeTitle } from '@/components';
import { useTauriExtension } from '@/hooks';

const AboutIntroText = () => (
    <>
        TaskHorizon is a productivity app that combines To-do and Calendar functionality to enable
        effective daily task management and scheduling, providing a seamless experience for users.
        We are currently focused on developing the <Code>web</Code> and <Code>macOS</Code> versions
        of the app, with several exciting new features in the pipeline.
    </>
);
const AboutGuaranteeText = () => (
    <>
        <Alert icon={<IconAlertCircle size={16} />} title="Preview Prototype" color="orange">
            Please note that this project is currently a prototype and should not be used in daily
            life. Data integrity is not guaranteed as the project is still under development.
        </Alert>
    </>
);

const ButtonLinksGroup = () => {
    const { openLink } = useTauriExtension();
    return (
        <>
            <Group position="center">
                <Button
                    color={'gray.7'}
                    leftIcon={<IconBrandGithub size={18} />}
                    variant={'outline'}
                    onClick={async () => await openLink(import.meta.env.VITE_GITHUB_REPO_URL)}
                >
                    Source Code
                </Button>
                <Button
                    leftIcon={<IconQuestionMark size={18} />}
                    variant={'outline'}
                    color="orange"
                    onClick={async () =>
                        await openLink(`${import.meta.env.VITE_GITHUB_REPO_URL}/issues`)
                    }
                >
                    Feedback
                </Button>
            </Group>
        </>
    );
};

export const SettingsAbout = () => {
    return (
        <>
            <div className={'tw-flex tw-flex-col tw-select-none tw-cursor-default'}>
                <div className={'tw-flex tw-flex-row'}>
                    <Title order={2} mb={'sm'}>
                        {/*About*/}
                    </Title>
                </div>

                <div className={'tw-max-w-[550px] tw-min-w-[510px]'}>
                    <Card
                        radius={'lg'}
                        m={'sm'}
                        px={30}
                        py={35}
                        withBorder
                        className={'tw-max-w-[550px] tw-min-w-[300px]'}
                        shadow={'md'}
                    >
                        <WelcomeTitle />
                    </Card>

                    <Text align={'justify'} mt={20} mb={20}>
                        <p>
                            <AboutIntroText />
                        </p>
                        <p>
                            <ButtonLinksGroup />
                        </p>
                        <p>
                            <AboutGuaranteeText />
                        </p>
                    </Text>

                    <CopyrightBar />
                </div>
            </div>
        </>
    );
};
