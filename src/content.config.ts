import { z, defineCollection, reference } from "astro:content";
import { glob } from "astro/loaders";

const bestiary = defineCollection({
	loader: glob({ pattern: "**/*.mdx", base: "./src/collections/bestiary" }),
	schema: z.object({
		title: z.string().nonempty(),
		armorClass: z.number(),
		type: reference("beastTypes"),
		health: z.string().nonempty(),
		speeds: z.array(
			z.object({
				value: z.number(),
				type: reference("speeds"),
			}),
		),
		resistances: z.array(reference("damageTypes")).optional(),
		immunities: z.array(reference("damageTypes")).optional(),
		vulnerabilities: z.array(reference("damageTypes")).optional(),
	}),
});

const beastTypes = defineCollection({
	loader: glob({ pattern: "**/*.json", base: "./src/collections/beastTypes" }),
	schema: z.object({
		title: z.string().nonempty(),
		icon: z.string().nonempty(),
	}),
});

const components = defineCollection({
	loader: glob({ pattern: "**/*.json", base: "./src/collections/components" }),
	schema: z.object({
		title: z.string().nonempty(),
		short: z.string().nonempty(),
	}),
});

const speeds = defineCollection({
	loader: glob({ pattern: "**/*.json", base: "./src/collections/speeds" }),
	schema: z.object({
		title: z.string().nonempty(),
	}),
});

const spellCastTimes = defineCollection({
	loader: glob({
		pattern: "**/*.json",
		base: "./src/collections/spellCastTimes",
	}),
	schema: z.object({
		title: z.string().nonempty(),
	}),
});

const spellTypes = defineCollection({
	loader: glob({ pattern: "**/*.json", base: "./src/collections/spellTypes" }),
	schema: z.object({
		title: z.string().nonempty(),
	}),
});

const durationUnits = defineCollection({
	loader: glob({
		pattern: "**/*.json",
		base: "./src/collections/durationUnits",
	}),
	schema: z.object({
		title: z.string().nonempty(),
	}),
});

const rangeUnits = defineCollection({
	loader: glob({ pattern: "**/*.json", base: "./src/collections/rangeUnits" }),
	schema: z.object({
		title: z.string().nonempty(),
	}),
});

const targetUnits = defineCollection({
	loader: glob({ pattern: "**/*.json", base: "./src/collections/targetUnits" }),
	schema: z.object({
		title: z.string().nonempty(),
	}),
});

const magicSpecializations = defineCollection({
	loader: glob({
		pattern: "**/*.json",
		base: "./src/collections/magicSpecializations",
	}),
	schema: z.object({
		title: z.string().nonempty(),
		type: reference("spellTypes"),
		icon: z.string().nonempty(),
	}),
});

const damageTypes = defineCollection({
	loader: glob({ pattern: "**/*.json", base: "./src/collections/damageTypes" }),
	schema: z.object({
		title: z.string().nonempty(),
	}),
});

const spells = defineCollection({
	loader: glob({ pattern: "**/*.mdx", base: "./src/collections/spells" }),
	schema: z.object({
		title: z.string().nonempty(),
		castTime: reference("spellCastTimes"),
		specialization: reference("magicSpecializations"),
		rangeUnit: reference("rangeUnits"),
		rangeValue: z.number().optional(),
		durationUnit: reference("durationUnits"),
		durationValue: z.number().optional(),
		targetUnit: reference("targetUnits"),
		targetValue: z.number().optional(),
		components: z.array(reference("components")),
	}),
});

const items = defineCollection({
	loader: glob({ pattern: "**/*.mdx", base: "./src/collections/items" }),
	schema: z.object({
		title: z.string().nonempty(),
		type: reference("itemTypes"),
		rarity: reference("itemRarities"),
		endurance: z.number(),
		price: z.number(),
	}),
});

const itemTypes = defineCollection({
	loader: glob({ pattern: "**/*.json", base: "./src/collections/itemTypes" }),
	schema: z.object({
		title: z.string().nonempty(),
		icon: z.string().nonempty(),
	}),
});

const itemRarities = defineCollection({
	loader: glob({
		pattern: "**/*.json",
		base: "./src/collections/itemRarities",
	}),
	schema: z.object({
		title: z.string().nonempty(),
		color: z.string().nonempty(),
		order: z.number(),
	}),
});

const guilds = defineCollection({
	loader: glob({ pattern: "**/*.mdx", base: "./src/collections/guilds" }),
	schema: z.object({
		title: z.string().nonempty(),
		icon: z.string().nonempty(),
		bonuses: z.array(z.object({
			characteristic: reference('characteristics'),
			points: z.number()
		}))
	}),
});

const mechanics = defineCollection({
	loader: glob({ pattern: "**/*.mdx", base: "./src/collections/mechanics" }),
	schema: z.object({
		title: z.string().nonempty(),
	}),
});

const terms = defineCollection({
	loader: glob({ pattern: "**/*.json", base: "./src/collections/terms" }),
	schema: z.object({
		label: z.string().nonempty(),
		definition: z.string().nonempty(),
	}),
});

const characteristics = defineCollection({
	loader: glob({ pattern: "**/*.json", base: "./src/collections/characteristics" }),
	schema: z.object({
		title: z.string().nonempty(),
		short: z.string().nonempty(),
	}),
});

export const collections = {
	bestiary,
	spells,
	spellCastTimes,
	spellTypes,
	magicSpecializations,
	durationUnits,
	rangeUnits,
	targetUnits,
	damageTypes,
	beastTypes,
	speeds,
	components,
	items,
	itemTypes,
	itemRarities,
	guilds,
	mechanics,
	terms,
	characteristics,
};
