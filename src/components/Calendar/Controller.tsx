import { Button } from '@douyinfe/semi-ui';

type ControllerProps = {
    handleNext: () => void;
    handlePrev: () => void;
};

export default function Controller(props: ControllerProps) {
    return (
        <>
            <Button onClick={() => props.handlePrev()}>Prev</Button>
            <Button onClick={() => props.handleNext()}>Next</Button>
        </>
    );
}
