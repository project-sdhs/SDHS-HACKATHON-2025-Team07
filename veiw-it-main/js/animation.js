const cards = document.querySelectorAll('.card');

const observer = new IntersectionObserver(entries => {
  entries.forEach((entry, idx) => {
    if (entry.isIntersecting) {
      observer.unobserve(entry.target);

      setTimeout(() => {
        entry.target.classList.add('visible');
      }, idx * 200);
    }
  });
}, {
  threshold: 0.4,
});

cards.forEach(card => observer.observe(card));