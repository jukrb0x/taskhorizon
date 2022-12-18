import { Divider } from '@mantine/core';

const AppSider = () => {
    return (
        <>
            <div
                data-tauri-drag-region
                className={'tw-h-full tw-flex tw-flex-col tw-w-[70px] tw-overflow-hidden'}
            >
                {/*AppSider*/}
            </div>
            <Divider orientation={'vertical'} color={'gray.2'} />
        </>
    );
};
export { AppSider };
