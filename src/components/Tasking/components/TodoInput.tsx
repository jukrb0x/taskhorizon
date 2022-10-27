import { Button, Input } from '@douyinfe/semi-ui';

export default function TodoInput() {
    return (
        <>
            <div className={'tw-flex flex-row tw-gap-3 tw-my-5'}>
                <Input placeholder={'something to do...'} />
                <Button theme={'solid'}>Add</Button>
            </div>
        </>
    );
}
