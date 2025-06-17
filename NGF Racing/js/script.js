document.querySelectorAll('nav a[href^="#"]').forEach(link => {
  link.addEventListener('click', e => {
    e.preventDefault();
    const targetId = link.getAttribute('href').substring(1);
    const targetElement = document.getElementById(targetId);
    if (targetElement) {
      targetElement.scrollIntoView({
        behavior: 'smooth'
      });
    }
  });
});

const form = document.querySelector("form");
const modal = document.getElementById("modalObrigado");

form.addEventListener("submit", function (e) {
  e.preventDefault(); // Impede envio padrão

  const formData = new FormData(form);

  fetch(form.action, {
    method: "POST",
    body: formData,
  })
    .then(response => {
      if (response.ok) {
        form.reset();
        modal.style.display = "flex";
      } else {
        alert("Ocorreu um erro ao enviar. Tente novamente.");
      }
    })
    .catch(error => {
      alert("Erro de conexão.");
    });
});

function fecharModal() {
  modal.style.display = "none";
}

// Fecha o modal ao clicar fora
window.addEventListener("click", function (event) {
  if (event.target === modal) {
    fecharModal();
  }
});

function filtrarCarros(categoria) {
  const cards = document.querySelectorAll('.car-card');

  cards.forEach(card => {
    if (categoria === 'todos' || card.classList.contains(categoria)) {
      card.style.display = 'block';
    } else {
      card.style.display = 'none';
    }
  });
}

let swiper; // para controlar instância

const carros = [
  {
    nome: 'Gol G6 1.6 Flex',
    descricao: 'Ano 2014, completo, 120.000km, excelente estado.',
    fotos: ['img/download.jpg', 'img/download (1).jpg', 'img/download (2).jpg'],
    whatsapp: 'https://wa.me/55SEUNUMERO?text=Olá, tenho interesse no Gol G6!'
  },
  {
    nome: 'Subaru WRX STI',
    descricao: 'AWD Turbo, preparado, 40.000km, motor forjado.',
    fotos: ['img/carroR1.jpg', 'img/carroR1_2.jpg', 'img/carroR1_3.jpg'],
    whatsapp: 'https://wa.me/55SEUNUMERO?text=Tenho interesse no WRX preparado!'
  },
  // outros carros...
];

function abrirModalCarro(index) {
  const carro = carros[index];

  document.getElementById('modalTitulo').innerText = carro.nome;
  document.getElementById('modalDescricao').innerText = carro.descricao;
  document.getElementById('modalWhatsapp').href = carro.whatsapp;

  const swiperWrapper = document.getElementById('swiperWrapper');
  swiperWrapper.innerHTML = '';

  carro.fotos.forEach(foto => {
    const slide = document.createElement('div');
    slide.className = 'swiper-slide';
    slide.innerHTML = `<img src="${foto}" alt="${carro.nome}">`;
    swiperWrapper.appendChild(slide);
  });

  document.getElementById('carModal').style.display = 'flex';

  if (swiper) {
    swiper.destroy(true, true); // destroi instância anterior
  }

  swiper = new Swiper('.main-swiper', {
    loop: true,
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev'
    },
    pagination: {
      el: '.swiper-pagination',
      clickable: true
    }
  });
}

function fecharModalCarro() {
  const modal = document.getElementById("carModal");
  modal.style.display = "none";
}

const depoimentosSwiper = new Swiper('.depoimentos-swiper', {
    loop: true,
    autoplay: {
      delay: 6000,
      disableOnInteraction: false,
    },
    effect: 'fade',
    fadeEffect: {
      crossFade: true
    },
    pagination: {
      el: '.swiper-pagination',
      clickable: true
    },
    speed: 800
  });
