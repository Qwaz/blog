import type { Language } from '$posts';

type DateStyle = Intl.DateTimeFormatOptions['dateStyle'];

const styleMap: Record<Language, DateStyle> = {
	en: 'medium',
	ko: 'long'
};

export function reformatDateString(date: string, language: Language) {
	const dateToFormat = new Date(date.replaceAll('-', '/'));
	const dateFormatter = new Intl.DateTimeFormat(language, { dateStyle: styleMap[language] });
	return dateFormatter.format(dateToFormat);
}
