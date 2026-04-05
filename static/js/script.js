// Global interactions for Kemetly frontend pages.
document.addEventListener('DOMContentLoaded', () => {
	const nav = document.getElementById('mainNav');
	const hamburger = document.getElementById('hamburger');
	const navDrawer = document.getElementById('navDrawer');

	// 1) Navbar scroll behavior.
	const handleNavScroll = () => {
		if (!nav) {
			return;
		}
		if (window.scrollY > 50) {
			nav.classList.add('scrolled');
		} else {
			nav.classList.remove('scrolled');
		}
	};

	handleNavScroll();
	window.addEventListener('scroll', handleNavScroll, { passive: true });

	// 2) Mobile hamburger toggle.
	const closeDrawer = () => {
		if (!hamburger || !navDrawer) {
			return;
		}
		navDrawer.classList.remove('open');
		navDrawer.setAttribute('aria-hidden', 'true');
		hamburger.classList.remove('open');
		hamburger.setAttribute('aria-expanded', 'false');
	};

	if (hamburger && navDrawer) {
		hamburger.addEventListener('click', () => {
			const isOpen = navDrawer.classList.toggle('open');
			hamburger.classList.toggle('open', isOpen);
			hamburger.setAttribute('aria-expanded', String(isOpen));
			navDrawer.setAttribute('aria-hidden', String(!isOpen));
		});

		navDrawer.querySelectorAll('a').forEach((link) => {
			link.addEventListener('click', closeDrawer);
		});

		document.addEventListener('click', (event) => {
			if (!navDrawer.classList.contains('open')) {
				return;
			}
			if (!navDrawer.contains(event.target) && !hamburger.contains(event.target)) {
				closeDrawer();
			}
		});
	}

	// 3) Scroll reveal.
	const revealElements = document.querySelectorAll('.reveal');
	if ('IntersectionObserver' in window && revealElements.length) {
		const revealObserver = new IntersectionObserver(
			(entries) => {
				entries.forEach((entry) => {
					if (entry.isIntersecting) {
						entry.target.classList.add('visible');
						revealObserver.unobserve(entry.target);
					}
				});
			},
			{ threshold: 0.15 }
		);

		revealElements.forEach((element) => {
			revealObserver.observe(element);
		});
	} else {
		revealElements.forEach((element) => {
			element.classList.add('visible');
		});
	}

	// 4) Smooth scroll for in-page anchor links.
	document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
		anchor.addEventListener('click', (event) => {
			const targetSelector = anchor.getAttribute('href');
			if (!targetSelector || targetSelector === '#') {
				return;
			}
			const target = document.querySelector(targetSelector);
			if (target) {
				event.preventDefault();
				target.scrollIntoView({ behavior: 'smooth', block: 'start' });
			}
		});
	});

	// 5) Active nav link fallback when template class is missing.
	const navLinks = Array.from(document.querySelectorAll('.nav-link'));
	if (navLinks.length && !document.querySelector('.nav-link.active')) {
		const current = new URL(window.location.href);
		const currentPath = current.pathname.replace(/\/+$/, '') || '/';
		const currentType = current.searchParams.get('type') || '';

		navLinks.forEach((link) => {
			const linkUrl = new URL(link.href, window.location.origin);
			const linkPath = linkUrl.pathname.replace(/\/+$/, '') || '/';
			const linkType = linkUrl.searchParams.get('type') || '';

			if (currentPath === linkPath) {
				if (!linkType || linkType === currentType) {
					link.classList.add('active');
				}
			}
		});
	}

	// 6) Optional subtle tilt effect for place cards.
	const cards = document.querySelectorAll('.place-card');
	cards.forEach((card) => {
		card.addEventListener('mousemove', (event) => {
			const rect = card.getBoundingClientRect();
			const cardX = event.clientX - rect.left;
			const cardY = event.clientY - rect.top;

			const xRatio = (cardX / rect.width) * 2 - 1;
			const yRatio = (cardY / rect.height) * 2 - 1;
			const maxTilt = 5;

			const tiltY = xRatio * maxTilt;
			const tiltX = yRatio * -maxTilt;

			card.style.setProperty('--tilt-y', `${tiltY.toFixed(2)}deg`);
			card.style.setProperty('--tilt-x', `${tiltX.toFixed(2)}deg`);
		});

		card.addEventListener('mouseleave', () => {
			card.style.setProperty('--tilt-y', '0deg');
			card.style.setProperty('--tilt-x', '0deg');
		});
	});
});
