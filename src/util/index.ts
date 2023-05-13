export function classCombine(names: string[]) {
	return names.filter((name) => name && !name.includes('undefined')).join(' ')
}

export function clamp(value: number, min: number, max: number) {
	return Math.min(Math.max(value, min), max);
}