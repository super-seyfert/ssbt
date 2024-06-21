import {
	Declare,
	Command,
	type CommandContext,
	Options,
	createStringOption,
} from "seyfert";
import { ParserConfig } from "sslp";

const options = {
	code: createStringOption({
		description: "Code to send",
		required: false,
	}),
};

const customQuotePatterns = [
	[/```(ts|js)/, "```"], // Matches ```ts and ```js
	["```", "```"], // Matches simple ``` quotes
];

@Declare({
	name: "codeblock",
	description: "Idk test",
})
@Options(options)
@ParserConfig({ quotes: customQuotePatterns })
export default class WaveCommand extends Command {
	async run(ctx: CommandContext<typeof options>) {
		const { code } = ctx.options;

		await ctx.write({
			content: code, // Example of how SSLP works. 2
		});
	}
}
