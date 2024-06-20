import type { RuntimeConfig } from "seyfert";

export default {
	token: process.env.BOT_TOKEN as string,
	intents: ["GuildMembers", "Guilds", "MessageContent", "GuildMessages"],
	locations: {
		base: "src",
		output: "src",
		commands: "commands",
	},
	debug: true,
} satisfies RuntimeConfig;
