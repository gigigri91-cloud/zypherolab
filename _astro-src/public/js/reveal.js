(function () {
  var revealElements = document.querySelectorAll(".reveal");
  if (!revealElements.length) {
    return;
  }

  if (!("IntersectionObserver" in window)) {
    revealElements.forEach(function (el) {
      el.classList.add("active");
    });
    return;
  }

  var observer = new IntersectionObserver(
    function (entries, currentObserver) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) {
          return;
        }
        entry.target.classList.add("active");
        currentObserver.unobserve(entry.target);
      });
    },
    {
      threshold: 0.1,
      rootMargin: "0px 0px -10%"
    }
  );

  revealElements.forEach(function (el) {
    observer.observe(el);
  });
})();
