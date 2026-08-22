
const zabiegiTriggers = document.querySelectorAll('#zabiegi-nav > a');
const zabiegiOferty = document.querySelectorAll('.zabiegi-oferta');


zabiegiTriggers.forEach((trigger, index) => {
  trigger.addEventListener('click', (e) => {
    e.preventDefault();


    zabiegiOferty.forEach((box, i) => {
      box.style.display = i === index
        ? (box.style.display === 'block' ? 'none' : 'block')
        : 'none';
    });
  });
});


document.addEventListener('click', (e) => {
  let clickedInsideAny = false;

  zabiegiTriggers.forEach((trigger, i) => {
    const navContainer = trigger.closest('#zabiegi-nav');
    if (navContainer.contains(e.target)) {
      clickedInsideAny = true;
    }
  });

  if (!clickedInsideAny) {
    zabiegiOferty.forEach((box) => {
      box.style.display = 'none';
    });
  }
});