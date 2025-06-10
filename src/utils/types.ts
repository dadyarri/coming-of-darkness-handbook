export interface CardData {
	title: string;
	subtitle?: {
		icon: string;
		title: string;
	};
	stats?: Array<{
		label: string;
		value: string | number;
		isRollable?: boolean;
	}>;
	sections?: Array<{
		title: string;
		items: string[];
	}>;
}
