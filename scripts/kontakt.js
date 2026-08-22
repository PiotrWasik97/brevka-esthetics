(function() {
    emailjs.init("QPR1de5IV6zjJuvdT");
})();

document.getElementById('contact-form').addEventListener('submit', function(e) {
    e.preventDefault();

    const btn = document.getElementById('submit-btn');
    const loader = document.getElementById('loader');
    const feedback = document.getElementById('form-feedback');
    const btnText = btn.querySelector('span');

    btn.disabled = true;
    if(loader) loader.style.display = 'block';
    if(btnText) btnText.style.opacity = '0.5';
    feedback.style.display = 'none';

    emailjs.sendForm('service_akzuh8y', 'template_r67myw6', this)
        .then(function() {
            if(loader) loader.style.display = 'none';
            btn.style.backgroundColor = '#71cba7'; 
            if(btnText) {
                btnText.textContent = 'Wiadomość wysłana!';
                btnText.style.opacity = '1';
            }

            feedback.textContent = "Dziękuję! Wiadomość dotarła do Pani Oli.";
            feedback.style.display = 'block';
            feedback.style.color = '#71cba7';

            document.getElementById('contact-form').reset();

            setTimeout(() => {
                btn.disabled = false;
                btn.style.backgroundColor = '';
                if(btnText) btnText.textContent = 'Wyślij wiadomość';
            }, 5000);

        }, function(error) {
            if(loader) loader.style.display = 'none';
            btn.disabled = false;
            if(btnText) btnText.style.opacity = '1';
            
            feedback.textContent = "Błąd wysyłki. Spróbuj ponownie za chwilę.";
            feedback.style.display = 'block';
            feedback.style.color = '#e74c3c';
            console.log('FAILED...', error);
        });
});