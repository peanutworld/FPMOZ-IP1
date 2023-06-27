document.addEventListener("DOMContentLoaded", function() {
    // Start - Initialize Bootstrap navbar
    var navbarToggler = document.querySelector(".navbar-toggler");
    var navbarCollapse = document.querySelector(".navbar-collapse");

    navbarToggler.addEventListener("click", function() {
        navbarCollapse.classList.toggle("show");
    });
    // End - Initialize Bootstrap navbar

    // Start - Funkcija za provjeru validnosti forme prije slanja
    function validateForm(event) {
        event.preventDefault();

        var ime = document.getElementById('ime').value;
        var prezime = document.getElementById('prezime').value;
        var email = document.getElementById('email').value;
        tinymce.triggerSave();
        var poruka = tinymce.get('poruka').getContent();

        if (ime === '' || prezime === '' || email === '' || poruka === '') {
            alert('Molimo vas da popunite sva polja obrasca.');
            return;
        }

        // CAPTCHA
        var captcha = generate_captcha(7);
        var input = prompt('Unesite CAPTCHA kod:\n' + captcha);
        if (input === null) {
            return;
        }
        if (input !== captcha) {
            alert('Pogrešan CAPTCHA kod. Pokušajte ponovo.');
            return;
        }

        // Provjera valjanosti e-mail adrese
        var emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailPattern.test(email)) {
            alert('Molimo vas da unesete valjanu e-mail adresu.');
            return;
        }

        console.log("Ime: " + ime + ", Prezime: " + prezime);
        console.log("Email: " + email);
        console.log("Poruka: " + poruka);
        alert('Forma je uspješno validirana i spremna za slanje!');
        document.getElementById('kontakt-forma').reset();
    }

    function generate_captcha(length) {
      var characters = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
      var generated_string = '';
      for (var i = 0; i < length; i++) {
          var randomIndex = Math.floor(Math.random() * characters.length);
          generated_string += characters.charAt(randomIndex);
      }
      return generated_string;
    }
    // End - Funkcija za provjeru validnosti forme prije slanja

    // Event listener na submit događaj forme
    var kontakt_forma = document.getElementById('kontakt-forma');
    if (kontakt_forma) {
        kontakt_forma.addEventListener('submit', validateForm);
    }

    // Event listener za Back to Top tipku
    var backtotop = document.getElementById('btn-back-to-top');
    if (backtotop) {
      backtotop.addEventListener("click", backToTop);
    }

    function backToTop() {
      window.scrollTo({top: 0, behavior: 'smooth'});
    }

    // Start - Skripta za header koja mjenja boju headera i teksta kad se scrolla, napisana u jQueryu
    $(document).ready(function() {
      var logoImage = $('.navbar-brand img');
      var transparentLogo = 'images/logo_white.png';
      var coloredLogo = 'images/logo.png';
      var navbarTogglerIcon = $('.navbar-toggler-icon');
      var backtotop = $('#btn-back-to-top');
    
      // Provjera širine prozora preglednika
      var windowWidth = $(window).width();
      var isMobile = windowWidth < 900;
    
      if (isMobile) { // Ako je mobilni uređaj
        $('.navbar').removeClass('bg-transparent').addClass('bg-light');
        logoImage.attr('src', coloredLogo);
        $('.navbar a.nav-link').removeClass('text-white').addClass('text-black');
        navbarTogglerIcon.css('filter', 'invert(0)');
      }
    
      $(window).scroll(function() {
        var scroll = $(window).scrollTop();
    
        if (scroll > 0 || isMobile) {
          $('.navbar').removeClass('bg-transparent').addClass('bg-light');
          logoImage.attr('src', coloredLogo);
          $('.navbar a.nav-link').removeClass('text-white').addClass('text-black');
          navbarTogglerIcon.css('filter', 'invert(0)');
        } else {
          $('.navbar').removeClass('bg-light').addClass('bg-transparent');
          logoImage.attr('src', transparentLogo);
          $('.navbar a.nav-link').removeClass('text-black').addClass('text-white');
          navbarTogglerIcon.css('filter', 'invert(1)');
        }
    
        if (scroll > 20) {
          backtotop.fadeIn();
        } else {
          backtotop.fadeOut();
        }
      });
    });
    // End - Skripta za header koja mjenja boju headera i teksta kad se scrolla, napisana u jQueryu
      
});

  
  