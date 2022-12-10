import { Command, CommandProvider, QuestionOptions } from '@tsed/cli-core';

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface HelloCommandContext {}

@Command({
    name: 'hello-command',
    description: 'Command description',
    args: {},
    options: {},
    allowUnknownOption: false
})
export class HelloCommand implements CommandProvider {
    /**
     *  Ask questions with Inquirer. Return an empty array or don't implement the method to skip this step
     */
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    async $prompt(initialOptions: Partial<HelloCommandContext>): Promise<QuestionOptions> {
        return [];
    }

    /**
     * This method is called after the $prompt to create / map inputs to a proper context for the next step
     */
    $mapContext(ctx: Partial<HelloCommandContext>): HelloCommandContext {
        return {
            ...ctx
            // map something, based on ctx
        };
    }
    /**
     *  This step run your tasks with Listr module
     */
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    async $exec(ctx: HelloCommandContext): Promise<any> {
        return [
            {
                title: 'Do something',
                task: () => {
                    console.log('HELLO');
                }
            }
        ];
    }
}
