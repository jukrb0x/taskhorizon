/*
 * Flex Spacer
 * */
export const Spacer = ({ flexGrow = 1 }: { flexGrow?: number }) => {
    return <div style={{ flexGrow: flexGrow }} />;
};
