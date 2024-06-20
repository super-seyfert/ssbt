import {
	Client,
	config,
	type CommandOption,
	type ParseClient,
	type RuntimeConfig,
} from "seyfert";
import { ArgsParser } from "sslp";
import { SSCAdapter } from "ssca";
import { loadConfig } from "c12";

const parser = new ArgsParser();
const seyfertClient = new Client({
	commands: {
		prefix: () => [";"],
		argsParser: (content, command) =>
			parser.runParser(content, command.options as CommandOption[]) as Record<
				string,
				string
			>,
	},
	allowedMentions: {
		parse: [],
	},
	async getRC() {
		const { config: seyfertConfig } = await loadConfig({
			configFile: "../seyfert.config.ts",
		});

		return config.bot(seyfertConfig as RuntimeConfig);
	},
});

seyfertClient.setServices({
	cache: {
		adapter: new SSCAdapter(),
	},
});

seyfertClient.start().then(() => seyfertClient.uploadCommands());

declare module "seyfert" {
	interface UsingClient extends ParseClient<Client<true>> {}
}

// That's it! Now you can use Seyfert with your new upgraded args parser!
