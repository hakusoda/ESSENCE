export default function(element: HTMLElement, callback: () => void) {
	const resizeObserver = new ResizeObserver(callback);
	resizeObserver.observe(element);
	
	return {
		destroy: () => resizeObserver.unobserve(element)
	};
}