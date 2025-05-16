// Adicione este código no início do arquivo app.js ou no script inline
document.addEventListener('DOMContentLoaded', function() {
  // Inicialização do Swiper com opções otimizadas
  const swiper = new Swiper(".mySwiper", {
    effect: "fade",
    speed: 1000, // Transição mais suave
    autoplay: {
      delay: 5000,
      disableOnInteraction: false,
    },
    pagination: {
      el: ".swiper-pagination",
      clickable: true,
    },
    loop: true,
    observer: true, // Atualiza o Swiper quando elementos são modificados
    observeParents: true,
    preloadImages: true, // Pré-carrega imagens
    lazy: {
      loadPrevNext: true, // Carrega imagens adjacentes
    },
  });
  
  // Ajusta o tamanho do Swiper quando a janela é redimensionada
  window.addEventListener('resize', function() {
    swiper.update();
  });
});

// Seleção de abas
const loginTab = document.getElementById('loginTab');
const registerTab = document.getElementById('registerTab');
const loginForm = document.getElementById('loginForm');
const registerForm = document.getElementById('registerForm');

loginTab.addEventListener('click', () => {
  loginTab.classList.replace('text-gray-500', 'text-blue-600');
  registerTab.classList.replace('text-blue-600', 'text-gray-500');
  loginForm.classList.remove('hidden');
  registerForm.classList.add('hidden');
});

registerTab.addEventListener('click', () => {
  registerTab.classList.replace('text-gray-500', 'text-blue-600');
  loginTab.classList.replace('text-blue-600', 'text-gray-500');
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

// Função para redirecionar para o dashboard apropriado
function redirectToDashboard(role) {
  switch(role) {
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
      console.error('Tipo de usuário desconhecido:', role);
  }
}

// Exemplo de submit via fetch (AJAX)
const loginButton = document.getElementById('loginButton');
loginButton.addEventListener('click', async (e) => {
  e.preventDefault(); // evita reload

  const email = document.getElementById('loginEmail').value;
  const password = document.getElementById('loginPassword').value;
  const role = document.getElementById('loginRole').value;
  
  // Aqui você normalmente faria uma requisição para autenticar o usuário
  // Por enquanto, vamos apenas simular um login bem-sucedido e redirecionar
  
  // Simula verificação de credenciais (em produção, isso seria feito no servidor)
  if (email && password) {
    redirectToDashboard(role);
  } else {
    alert('Por favor, preencha todos os campos.');
  }
});

// Adicionar funcionalidade aos botões de demonstração
const demoButtons = document.querySelectorAll('.demo-login');
demoButtons.forEach(button => {
  button.addEventListener('click', () => {
    const email = button.getAttribute('data-email');
    const password = button.getAttribute('data-password');
    const role = button.getAttribute('data-role');
    
    // Preenche os campos do formulário
    document.getElementById('loginEmail').value = email;
    document.getElementById('loginPassword').value = password;
    document.getElementById('loginRole').value = role;
    
    // Atualiza a UI para mostrar o tipo de usuário selecionado
    userTypeButtons.forEach(btn => {
      if (btn.getAttribute('data-role') === role) {
        btn.classList.add('active');
      } else {
        btn.classList.remove('active');
      }
    });
    
    // Redireciona para o dashboard apropriado
    redirectToDashboard(role);
  });
});
