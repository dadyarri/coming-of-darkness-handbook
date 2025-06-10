import { getEntry, type CollectionEntry } from "astro:content";
import type { CardData } from "@utils/types";

export async function transformBeastToCardData(
	beast: CollectionEntry<"bestiary">,
): Promise<CardData> {
	const { data } = beast;

	const type = await getEntry(data.type);

	return {
		title: data.title,
		subtitle: {
			icon: type.data.icon,
			title: type.data.title,
		},
		stats: [
			{
				label: "Порог защиты",
				value: data.armorClass,
			},
			{
				label: "Здоровье",
				value: data.health,
				isRollable: true,
			},
			{
				label: "Скорость",
				value: await Promise.all(
					data.speeds.map(
						async (speed) =>
							`${speed.value} м. ${(await getEntry(speed.type)).data.title}`,
					),
				).then((speeds) => speeds.join(", ")),
			},
		],
		sections: await Promise.all(
			[
				{
					title: "Сопротивления",
					items: data.resistances
						? await Promise.all(
								data.resistances.map((res) =>
									getEntry(res).then((entry) => entry.data.title),
								),
							)
						: [],
				},
				{
					title: "Иммунитеты",
					items: data.immunities
						? await Promise.all(
								data.immunities.map((imm) =>
									getEntry(imm).then((entry) => entry.data.title),
								),
							)
						: [],
				},
				{
					title: "Уязвимости",
					items: data.vulnerabilities
						? await Promise.all(
								data.vulnerabilities.map((vul) =>
									getEntry(vul).then((entry) => entry.data.title),
								),
							)
						: [],
				},
			].filter((section) => section.items.length > 0),
		),
	};
}

export async function transformSpellToCardData(
	spell: CollectionEntry<"spells">,
): Promise<CardData> {
	const { data } = spell;

	const specialization = await getEntry(data.specialization);
	const rangeUnit = (await getEntry(data.rangeUnit)).data.title;

	return {
		title: data.title,
		subtitle: {
			icon: specialization.data.icon,
			title: specialization.data.title,
		},
		stats: [
			{
				label: "Время накладывания",
				value: (await getEntry(data.castTime)).data.title,
			},
			{
				label: "Дистанция",
				value: data.rangeValue ? `${rangeUnit} ${data.rangeValue}` : rangeUnit,
			},
		],
		sections: await Promise.all(
			[
				{
					title: "Компоненты",
					items: data.components
						? await Promise.all(
								data.components.map((res) =>
									getEntry(res).then((entry) => entry.data.title),
								),
							)
						: [],
				},
			].filter((section) => section.items.length > 0),
		),
	};
}

export async function transformItemToCardData(
	item: CollectionEntry<"items">,
): Promise<CardData> {
	const { data } = item;

	const type = await getEntry(data.type);
	const rarity = await getEntry(data.rarity);

	return {
		title: data.title,
		subtitle: {
			icon: type.data.icon,
			title: type.data.title,
			color: rarity.data.color,
		},
		stats: [
			{
				label: "Редкость",
				value: rarity.data.title,
			},
			{
				label: "Стоимость",
				value: data.price ? `${data.price} зм` : "—",
			},
		],
		sections: [],
	};
}
