// Arquivo: medico/app.js

document.addEventListener('DOMContentLoaded', function() {
    // Animação de fade-in para os elementos da página após a tela de boas-vindas
    setTimeout(() => {
      document.querySelectorAll('.fade-in-animation').forEach(element => {
        element.style.opacity = '1';
      });
    }, 2500); // Tempo um pouco maior que a animação da tela de boas-vindas
    
    // Inicialização do menu ativo
    const setActiveMenuItem = (target) => {
      document.querySelectorAll('.menu-item').forEach(item => {
        item.classList.remove('active');
      });
      
      document.querySelectorAll(`[href="#${target}"]`).forEach(item => {
        item.classList.add('active');
      });
    };
    
    // Navegação entre seções
    document.querySelectorAll('nav a, #mobile-menu a').forEach(link => {
      link.addEventListener('click', function(e) {
        e.preventDefault
        e.preventDefault();
      
      const target = this.getAttribute('href').substring(1);
      setActiveMenuItem(target);
      
      // Aqui você adicionaria a lógica para mostrar a seção correspondente
      // Por exemplo, usando AJAX para carregar o conteúdo ou mostrando/ocultando divs
      console.log(`Navegando para a seção: ${target}`);
      
      // Fechar o menu mobile se estiver aberto
      if (window.innerWidth < 768) {
        document.getElementById('mobile-menu').classList.add('hidden');
      }
    });
  });
  
  // Notificações - exemplo de funcionalidade
  document.querySelector('.fa-bell').parentElement.addEventListener('click', function() {
    alert('Você tem 3 novas notificações!');
    // Aqui você poderia abrir um dropdown com as notificações
  });
  
  // Inicialização de tooltips ou popovers
  // Se você estiver usando uma biblioteca como Tippy.js ou similar
  // tippy('[data-tippy-content]');
  
  // Exemplo de função para carregar dados de pacientes
  const carregarPacientes = async () => {
    try {
      // Em um ambiente real, isso seria uma chamada de API
      // const response = await fetch('/api/pacientes');
      // const data = await response.json();
      
      // Simulando dados para demonstração
      return [
        { id: 1, nome: 'Maria Oliveira', idade: 45, ultimaConsulta: '2023-05-10' },
        { id: 2, nome: 'Carlos Santos', idade: 62, ultimaConsulta: '2023-05-08' },
        { id: 3, nome: 'Ana Ferreira', idade: 35, ultimaConsulta: '2023-05-05' },
        { id: 4, nome: 'Pedro Almeida', idade: 28, ultimaConsulta: '2023-05-01' }
      ];
    } catch (error) {
      console.error('Erro ao carregar pacientes:', error);
      return [];
    }
  };
  
  // Exemplo de função para carregar dados de consultas
  const carregarConsultas = async () => {
    try {
      // Em um ambiente real, isso seria uma chamada de API
      // const response = await fetch('/api/consultas');
      // const data = await response.json();
      
      // Simulando dados para demonstração
      return [
        { id: 1, paciente: 'Maria Oliveira', tipo: 'Consulta de rotina', data: '2023-05-15', hora: '09:30' },
        { id: 2, paciente: 'Carlos Santos', tipo: 'Retorno - Hipertensão', data: '2023-05-15', hora: '10:45' },
        { id: 3, paciente: 'Ana Ferreira', tipo: 'Exames de rotina', data: '2023-05-15', hora: '13:15' },
        { id: 4, paciente: 'Pedro Almeida', tipo: 'Primeira consulta', data: '2023-05-15', hora: '15:30' }
      ];
    } catch (error) {
      console.error('Erro ao carregar consultas:', error);
      return [];
    }
  };
  
  // Exemplo de inicialização de dados
  const inicializarDados = async () => {
    const pacientes = await carregarPacientes();
    const consultas = await carregarConsultas();
    
    console.log('Pacientes carregados:', pacientes.length);
    console.log('Consultas carregadas:', consultas.length);
    
    // Aqui você poderia atualizar a interface com os dados carregados
  };
  
  // Chamar a inicialização de dados
  inicializarDados();
  
  // Exemplo de função para iniciar uma consulta virtual
  window.iniciarConsulta = function(pacienteId) {
    console.log(`Iniciando consulta virtual com o paciente ID: ${pacienteId}`);
    // Aqui você redirecionaria para a sala de consulta virtual
    // window.location.href = `/consulta-virtual/${pacienteId}`;
    alert(`Iniciando consulta virtual com o paciente ID: ${pacienteId}`);
  };
  
  // Exemplo de função para visualizar prontuário
  window.verProntuario = function(pacienteId) {
    console.log(`Visualizando prontuário do paciente ID: ${pacienteId}`);
    // Aqui você abriria o prontuário do paciente
    // window.location.href = `/prontuario/${pacienteId}`;
    alert(`Visualizando prontuário do paciente ID: ${pacienteId}`);
  };
});
