let form = null;
let resultSuccess = null;
let resultFail = null;

document.addEventListener('DOMContentLoaded', (event) => {
  const carousel = document.querySelector('.carousel-inner');
  const items = document.querySelectorAll('.carousel-item');
  const itemCount = items.length;
  let currentIndex = 0;

  function showNext() {
    currentIndex = (currentIndex + 1) % itemCount;
    updateCarousel();
  }

  function showPrev() {
    currentIndex = (currentIndex - 1 + itemCount) % itemCount;
    updateCarousel();
  }

  function updateCarousel() {
    carousel.style.transform = `translateX(-${currentIndex * 100}%)`;
  }

  document.querySelector('.carousel-control.right').addEventListener('click', (e) => {
    e.preventDefault();
    showNext();
  });

  document.querySelector('.carousel-control.left').addEventListener('click', (e) => {
    e.preventDefault();
    showPrev();
  });

  // Auto-advance the carousel every 5 seconds
  setInterval(showNext, 3000);


  // Form
  form = document.getElementById('form');
  resultSuccess = document.getElementById('result-success');
  resultFail = document.getElementById('result-fail');
  if (form) {
    registerForm(form);
  }

  document.getElementById('spook-mode-toggle').addEventListener('change', () => {
    document.body.classList.toggle('spook-mode', event.target.checked);

  });
});



const registerForm = (element) => {

  element.addEventListener('submit', function (e) {
    e.preventDefault();
    const formData = new FormData(form);
    const object = Object.fromEntries(formData);
    const json = JSON.stringify(object);
    form.classList.add('loading');
    setTimeout(() => {

      fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: json
      })
        .then(async (response) => {
          let json = await response.json();
          if (response.status == 200) {
            resultSuccess.style.display = null;
            resultFail.style.display = 'none';
            resultSuccess.scrollIntoView({ behavior: 'smooth' });
          } else {
            console.log(response);
            resultFail.style.display = null;
            resultSuccess.style.display = 'none';
          }
        })
        .catch(error => {
          console.log(error);
          resultFail.style.display = null;
          resultSuccess.style.display = 'none';
        })
        .then(() => {
          form.classList.remove('loading');
        })
    });
  }, 2000)

}
