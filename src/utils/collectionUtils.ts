import { getCollection, getEntry } from "astro:content";
import type { CollectionEntry } from "astro:content";

/**
 * Retrieves items by type
 * @param type The type of items to retrieve
 * @returns Array of item collection entries filtered by type
 */
export async function getItemsByType(
	type: string,
): Promise<CollectionEntry<"items">[]> {
	const items = await getCollection("items");
	return items.filter((item) => item.data.type.id === type);
}

/**
 * Retrieves spells by type
 * @param type The type of spells to retrieve
 * @returns Array of spell collection entries filtered by type
 */
export async function getSpellsByType(
	type: string,
): Promise<CollectionEntry<"spells">[]> {
	const spells = await getCollection("spells");
	return spells.filter((spell) => spell.data.specialization.id === type);
}

/**
 * Retrieves bestiary entries by type
 * @param type The type of bestiary entries to retrieve
 * @returns Array of bestiary collection entries filtered by type
 */
export async function getBestiaryByType(
	type: string,
): Promise<CollectionEntry<"bestiary">[]> {
	const bestiary = await getCollection("bestiary");
	return bestiary.filter((entry) => entry.data.type.id === type);
}

/**
 * Gets legend items for equipment
 * @returns Array of legend items with icon, title and href
 */
export async function getEquipmentLegend() {
	const itemTypes = await getCollection("itemTypes");
	return itemTypes
		.sort((a, b) => a.data.title.localeCompare(b.data.title, "ru"))
		.map((type) => ({
			icon: type.data.icon,
			title: type.data.title,
			href: `/equipment/type/${type.id}`,
		}));
}

export async function getEquipmentRaritiesLegend() {
	const itemRarities = await getCollection("itemRarities");
	return itemRarities
		.sort((a, b) => a.data.order - b.data.order)
		.map((rarity) => ({
			color: rarity.data.color,
			title: rarity.data.title,
			href: `/equipment/rarity/${rarity.id}`,
		}));
}

/**
 * Gets legend items for spells
 * @returns Array of legend items with icon, title and href
 */
export async function getSpellsLegend() {
	const magicSpecializations = await getCollection("magicSpecializations");
	return magicSpecializations
		.sort((a, b) => a.data.title.localeCompare(b.data.title, "ru"))
		.map((spec) => ({
			icon: spec.data.icon,
			title: spec.data.title,
			href: `/spells/type/${spec.id}`,
		}));
}

/**
 * Gets legend items for bestiary
 * @returns Array of legend items with icon, title and href
 */
export async function getBestiaryLegend() {
	const beastTypes = await getCollection("beastTypes");
	return beastTypes
		.sort((a, b) => a.data.title.localeCompare(b.data.title, "ru"))
		.map((type) => ({
			icon: type.data.icon,
			title: type.data.title,
			href: `/bestiary/type/${type.id}`,
		}));
}
