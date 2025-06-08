import { z, defineCollection, reference } from 'astro:content';
import { glob } from 'astro/loaders';

const bestiary = defineCollection({
    loader: glob({ pattern: '**/*.mdx', base: './src/collections/bestiary' }),
    schema: z.object({
        title: z.string().nonempty(),
        armorClass: z.number(),
        type: reference("beastTypes"),
        health: z.string().nonempty(),
        speeds: z.array(z.object({
            value: z.number(),
            type: reference("speeds")
        })),
        resistances: z.array(reference("damageTypes")).optional(),
        immunities: z.array(reference("damageTypes")).optional(),
        vulnerabilities: z.array(reference("damageTypes")).optional()
    })
})

const beastTypes = defineCollection({
    loader: glob({ pattern: '**/*.json', base: './src/collections/beastTypes' }),
    schema: z.object({
        title: z.string().nonempty()
    })
})

const speeds = defineCollection({
    loader: glob({ pattern: '**/*.json', base: './src/collections/speeds' }),
    schema: z.object({
        title: z.string().nonempty()
    })
})

const spellCastTimes = defineCollection({
    loader: glob({ pattern: '**/*.json', base: './src/collections/spellCastTimes' }),
    schema: z.object({
        title: z.string().nonempty()
    })
})

const spellTypes = defineCollection({
    loader: glob({ pattern: '**/*.json', base: './src/collections/spellTypes' }),
    schema: z.object({
        title: z.string().nonempty()
    })
})

const durationUnits = defineCollection({
    loader: glob({ pattern: '**/*.json', base: './src/collections/durationUnits' }),
    schema: z.object({
        title: z.string().nonempty()
    })
})

const rangeUnits = defineCollection({
    loader: glob({ pattern: '**/*.json', base: './src/collections/rangeUnits' }),
    schema: z.object({
        title: z.string().nonempty()
    })
})

const targetUnits = defineCollection({
    loader: glob({ pattern: '**/*.json', base: './src/collections/targetUnits' }),
    schema: z.object({
        title: z.string().nonempty()
    })
})

const magicSpecializations = defineCollection({
    loader: glob({ pattern: '**/*.json', base: './src/collections/magicSpecializations' }),
    schema: z.object({
        title: z.string().nonempty(),
        type: reference("spellTypes"),
    })
});

const damageTypes = defineCollection({
    loader: glob({ pattern: '**/*.json', base: './src/collections/damageTypes' }),
    schema: z.object({
        title: z.string().nonempty()
    })
})

const spells = defineCollection({
    loader: glob({ pattern: '**/*.mdx', base: './src/collections/spells' }),
    schema: z.object({
        title: z.string().nonempty(),
        castTime: reference("spellCastTimes"),
        specialization: z.array(reference("magicSpecializations")),
        rangeUnit: reference("rangeUnits"),
        rangeValue: z.number().optional(),
        durationUnit: reference("durationUnits"),
        durationValue: z.number().optional(),
        targetUnit: reference("targetUnits"),
        targetValue: z.number().optional(),
        components: z.array(reference("components"))
    })
})

export const collections = { bestiary, spells, spellCastTimes, spellTypes, magicSpecializations, durationUnits, rangeUnits, targetUnits, damageTypes, beastTypes, speeds };
