document.addEventListener('DOMContentLoaded', () => {
  // Splash Screen
  const splashScreen = document.getElementById('splashScreen');
  
  // Remover splash screen após animação
  setTimeout(() => {
    splashScreen.style.display = 'none';
    // Fade-in no body após o splash
    document.body.classList.add('opacity-100');
  }, 2000);
  
  // Inicialização do Swiper (carrossel)
  const swiper = new Swiper('.swiper-container', {
    loop: true,
    autoplay: {
      delay: 5000,
      disableOnInteraction: false,
    },
    pagination: {
      el: '.swiper-pagination',
      clickable: true,
    },
    effect: 'fade',
    fadeEffect: {
      crossFade: true
    },
  });
  
  // Controle do modal de autenticação
  const authModal = document.getElementById('authModal');
  const loginHeaderBtn = document.getElementById('loginHeaderBtn');
  const registerHeaderBtn = document.getElementById('registerHeaderBtn');
  const closeModal = document.getElementById('closeModal');
  
  // Abrir modal no login
  loginHeaderBtn.addEventListener('click', () => {
    authModal.classList.remove('hidden');
    document.getElementById('loginTab').click();
  });
  
  // Abrir modal no cadastro
  registerHeaderBtn.addEventListener('click', () => {
    authModal.classList.remove('hidden');
    document.getElementById('registerTab').click();
  });
  
  // Fechar modal
  closeModal.addEventListener('click', () => {
    authModal.classList.add('hiding');
    setTimeout(() => {
      authModal.classList.add('hidden');
      authModal.classList.remove('hiding');
    }, 300);
  });
  
  // Fechar modal ao clicar fora
  authModal.addEventListener('click', (e) => {
    if (e.target === authModal) {
      closeModal.click();
    }
  });
  
  // Seleção de abas
  const loginTab = document.getElementById('loginTab');
  const registerTab = document.getElementById('registerTab');
  const loginForm = document.getElementById('loginForm');
  const registerForm = document.getElementById('registerForm');

  loginTab.addEventListener('click', () => {
    loginTab.classList.replace('text-gray-500', 'text-blue-600');
    loginTab.classList.add('border-b-2', 'border-blue-600');
    registerTab.classList.replace('text-blue-600', 'text-gray-500');
    registerTab.classList.remove('border-b-2', 'border-blue-600');
    loginForm.classList.remove('hidden');
    registerForm.classList.add('hidden');
  });

  registerTab.addEventListener('click', () => {
    registerTab.classList.replace('text-gray-500', 'text-blue-600');
    registerTab.classList.add('border-b-2', 'border-blue-600');
    loginTab.classList.replace('text-blue-600', 'text-gray-500');
    loginTab.classList.remove('border-b-2', 'border-blue-600');
    registerForm.classList.remove('hidden');
    loginForm.classList.add('hidden');
  });

  // Toggle de visibilidade da senha
  const togglePassword = document.getElementById('togglePassword');
  const loginPassword = document.getElementById('loginPassword');

  togglePassword.addEventListener('click', () => {
    const type = loginPassword.getAttribute('type') === 'password' ? 'text' : 'password';
    loginPassword.setAttribute('type', type);
    togglePassword.innerHTML = type === 'password'
      ? '<i class="fas fa-eye"></i>'
      : '<i class="fas fa-eye-slash"></i>';
  });
  
  // Toggle de visibilidade para todas as senhas
  const togglePasswordButtons = document.querySelectorAll('.toggle-password');
  togglePasswordButtons.forEach(button => {
    button.addEventListener('click', function() {
      const passwordField = this.parentElement.querySelector('input');
      const type = passwordField.getAttribute('type') === 'password' ? 'text' : 'password';
      passwordField.setAttribute('type', type);
      this.innerHTML = type === 'password'
        ? '<i class="fas fa-eye"></i>'
        : '<i class="fas fa-eye-slash"></i>';
    });
  });

  // Seleção de tipo de usuário
  const userTypeButtons = document.querySelectorAll('.user-type-btn');
  const loginRoleInput = document.getElementById('loginRole');

  userTypeButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      // Remove estado ativo de todos
      userTypeButtons.forEach(b => b.classList.remove('active'));
      // Marca o clicado
      btn.classList.add('active');
      // Atualiza campo hidden no form
      loginRoleInput.value = btn.dataset.role;
    });
  });

  // Login via botões de demonstração
  const demoButtons = document.querySelectorAll('.demo-login');
  demoButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      const email = btn.dataset.email;
      const password = btn.dataset.password;
      const role = btn.dataset.role;
      
      document.getElementById('loginEmail').value = email;
      document.getElementById('loginPassword').value = password;
      
      // Atualiza o tipo de usuário selecionado
      userTypeButtons.forEach(b => {
        if (b.dataset.role === role) {
          b.click();
        }
      });
      
      // Simula o clique no botão de login após um pequeno delay
      setTimeout(() => {
        document.getElementById('loginButton').click();
      }, 300);
    });
  });

  // Exemplo de submit via fetch (AJAX)
  const loginButton = document.getElementById('loginButton');
  loginButton.addEventListener('click', async (e) => {
    e.preventDefault(); // evita reload

    const email = document.getElementById('loginEmail').value;
    const password = document.getElementById('loginPassword').value;
    const role = document.getElementById('loginRole').value;

    // Validação básica
    if (!email || !password) {
      alert('Por favor, preencha todos os campos.');
      return;
    }

    // Simulação de autenticação
    loginButton.innerHTML = '<i class="fas fa-circle-notch fa-spin"></i> Entrando...';
    loginButton.disabled = true;

    // Simulação de delay de rede
    setTimeout(() => {
      // Redirecionamento baseado no tipo de usuário
      switch (role) {
        case 'doctor':
          window.location.href = 'médico/dashboard.html';
          break;
        case 'government':
          window.location.href = 'governo/dashboard.html';
          break;
        case 'patient':
          window.location.href = 'cliente/dashboard.html';
          break;
        default:
          alert('Tipo de usuário inválido');
          loginButton.innerHTML = 'Entrar';
          loginButton.disabled = false;
      }
    }, 1000);
  });

  // Cadastro de novo usuário
  const registerButton = document.getElementById('registerButton');
  registerButton.addEventListener('click', (e) => {
    e.preventDefault();
    
    const name = document.getElementById('registerName').value;
    const email = document.getElementById('registerEmail').value;
    const password = document.getElementById('registerPassword').value;
    const confirmPassword = document.getElementById('registerConfirmPassword').value;
    const role = document.getElementById('registerRole').value;
    
    // Validação básica
    if (!name || !email || !password || !confirmPassword) {
      alert('Por favor, preencha todos os campos.');
      return;
    }
    
    if (password !== confirmPassword) {
      alert('As senhas não coincidem.');
      return;
    }
    
    // Simulação de cadastro
    registerButton.innerHTML = '<i class="fas fa-circle-notch fa-spin"></i> Cadastrando...';
    registerButton.disabled = true;
    
    // Simulação de delay de rede
    setTimeout(() => {
      alert('Cadastro realizado com sucesso! Faça login para continuar.');
      registerButton.innerHTML = 'Cadastrar';
      registerButton.disabled = false;
      
      // Limpa os campos
      document.getElementById('registerName').value = '';
      document.getElementById('registerEmail').value = '';
      document.getElementById('registerPassword').value = '';
      document.getElementById('registerConfirmPassword').value = '';
      
      // Volta para a aba de login
      loginTab.click();
    }, 1000);
  });
  
  // Barra de pesquisa responsiva para mobile
  const searchButton = document.getElementById('searchButton');
  const searchBarMobile = document.getElementById('searchBarMobile');
  
  if (searchButton && searchBarMobile) {
    searchButton.addEventListener('click', () => {
      searchBarMobile.classList.toggle('hidden');
    });
  }
  
  // Animação para cards de especialidades
  const specialityCards = document.querySelectorAll('.speciality-card');
  
  if (specialityCards.length > 0) {
    const observerOptions = {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    };
    
    const appearOnScroll = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add('animate-fadeIn');
        observer.unobserve(entry.target);
      });
    }, observerOptions);
    
    specialityCards.forEach(card => {
      appearOnScroll.observe(card);
    });
  }
  
  // Smooth scroll para links de âncora
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      
      const targetId = this.getAttribute('href');
      if (targetId === '#') return;
      
      const targetElement = document.querySelector(targetId);
      if (targetElement) {
        window.scrollTo({
          top: targetElement.offsetTop - 80, // Ajuste para o header fixo
          behavior: 'smooth'
        });
      }
    });
  });
});
