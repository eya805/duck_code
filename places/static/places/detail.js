// Detail page enhancements for gallery and booking interactions.
document.addEventListener('DOMContentLoaded', () => {
	const heroImage = document.querySelector('.detail-hero-img');
	const thumbnails = document.querySelectorAll('[data-detail-thumb]');
	const bookingWidget = document.querySelector('.booking-widget');

	// Optional gallery: swap hero image when a thumbnail is clicked.
	if (heroImage && thumbnails.length) {
		thumbnails.forEach((thumb) => {
			thumb.addEventListener('click', () => {
				const nextSrc = thumb.getAttribute('data-detail-thumb');
				const nextAlt = thumb.getAttribute('data-detail-alt') || heroImage.alt;
				if (!nextSrc) {
					return;
				}
				heroImage.src = nextSrc;
				heroImage.alt = nextAlt;

				thumbnails.forEach((item) => {
					item.classList.remove('active');
				});
				thumb.classList.add('active');
			});
		});
	}

	// Subtle focus pulse when booking widget enters viewport.
	if (bookingWidget && 'IntersectionObserver' in window) {
		const widgetObserver = new IntersectionObserver(
			(entries) => {
				entries.forEach((entry) => {
					if (entry.isIntersecting) {
						bookingWidget.classList.add('booking-visible');
						widgetObserver.disconnect();
					}
				});
			},
			{ threshold: 0.3 }
		);
		widgetObserver.observe(bookingWidget);
	}

	// Preserve current page slug in booking URL if available.
	const bookButton = document.querySelector('.booking-widget .btn-gold');
	if (bookButton) {
		const currentPath = window.location.pathname.split('/').filter(Boolean);
		const slug = currentPath.length ? currentPath[currentPath.length - 1] : '';
		if (slug && !bookButton.href.includes('place=')) {
			const separator = bookButton.href.includes('?') ? '&' : '?';
			bookButton.href = `${bookButton.href}${separator}place=${encodeURIComponent(slug)}`;
		}
	}
});
