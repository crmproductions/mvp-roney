// Arquivo: paciente/dashboard.js

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
    // Aqui você poderia abrir um dropdown com as notificações
    alert('Você tem 2 novas notificações:\n- Resultado de exame disponível\n- Lembrete de consulta amanhã');
  });
  
  // Botão de emergência
  document.querySelector('.fixed.bottom-6.right-6 button').addEventListener('click', function() {
    if (confirm('Deseja iniciar uma chamada de emergência para o serviço de saúde?')) {
      // Aqui você poderia iniciar uma chamada de emergência
      alert('Conectando com o serviço de emergência...');
    }
  });
  
  // Exemplo de função para carregar medicamentos
  const carregarMedicamentos = async () => {
    try {
      // Em um ambiente real, isso seria uma chamada de API
      // const response = await fetch('/api/medicamentos');
      // const data = await response.json();
      
      // Simulando dados para demonstração
      return [
        { id: 1, nome: 'Losartana Potássica', dosagem: '50mg', frequencia: '1 comprimido por dia', horario: 'Manhã, após o café', proximaDose: '12:00' },
        { id: 2, nome: 'Atorvastatina', dosagem: '20mg', frequencia: '1 comprimido por dia', horario: 'Noite, antes de dormir', proximaDose: '22:00' },
        { id: 3, nome: 'Complexo B', dosagem: '', frequencia: '1 comprimido por dia', horario: 'Manhã, com o café', proximaDose: 'Tomado' }
      ];
    } catch (error) {
      console.error('Erro ao carregar medicamentos:', error);
      return [];
    }
  };
  
  // Exemplo de função para carregar consultas
  const carregarConsultas = async () => {
    try {
      // Em um ambiente real, isso seria uma chamada de API
      // const response = await fetch('/api/consultas');
      // const data = await response.json();
      
      // Simulando dados para demonstração
      return [
        { id: 1, medico: 'Dr. João Silva', especialidade: 'Cardiologista', data: '15/05/2023', hora: '09:30', tipo: 'Consulta de rotina' },
        { id: 2, medico: 'Dra. Ana Ferreira', especialidade: 'Nutricionista', data: '22/05/2023', hora: '14:00', tipo: 'Acompanhamento nutricional' }
      ];
    } catch (error) {
      console.error('Erro ao carregar consultas:', error);
      return [];
    }
  };
  
  // Exemplo de função para carregar exames
  const carregarExames = async () => {
    try {
      // Em um ambiente real, isso seria uma chamada de API
      // const response = await fetch('/api/exames');
      // const data = await response.json();
      
      // Simulando dados para demonstração
      return [
        { id: 1, nome: 'Hemograma Completo', data: '01/05/2023', status: 'Disponível' },
        { id: 2, nome: 'Glicemia em Jejum', data: '01/05/2023', status: 'Disponível' },
        { id: 3, nome: 'Eletrocardiograma', data: '15/04/2023', status: 'Disponível' }
      ];
    } catch (error) {
      console.error('Erro ao carregar exames:', error);
      return [];
    }
  };
  
  // Exemplo de inicialização de dados
  const inicializarDados = async () => {
    const medicamentos = await carregarMedicamentos();
    const consultas = await carregarConsultas();
    const exames = await carregarExames();
    
    console.log('Medicamentos carregados:', medicamentos.length);
    console.log('Consultas carregadas:', consultas.length);
    console.log('Exames carregados:', exames.length);
    
    // Aqui você poderia atualizar a interface com os dados carregados
  };
  
  // Chamar a inicialização de dados
  inicializarDados();
  
  // Exemplo de função para marcar medicamento como tomado
  window.marcarMedicamento = function(id) {
    console.log(`Medicamento ID ${id} marcado como tomado`);
    // Aqui você faria uma chamada AJAX para atualizar o status do medicamento
    // fetch(`/api/medicamentos/${id}/tomar`, { method: 'POST' })
    //   .then(response => response.json())
    //   .then(data => console.log('Medicamento atualizado:', data))
    //   .catch(error => console.error('Erro ao atualizar medicamento:', error));
    
    alert('Medicamento marcado como tomado!');
  };
  
  // Exemplo de função para agendar nova consulta
  window.agendarConsulta = function() {
    console.log('Abrindo formulário de agendamento de consulta');
    // Aqui você abriria um modal ou redirecionaria para a página de agendamento
    // window.location.href = '/agendar-consulta';
    
    alert('Redirecionando para o agendamento de consulta...');
  };
  
  // Exemplo de função para visualizar exame
  window.visualizarExame = function(id) {
    console.log(`Visualizando exame ID ${id}`);
    // Aqui você ab
    console.log(`Visualizando exame ID ${id}`);
    // Aqui você abriria um modal ou redirecionaria para a página do exame
    // window.location.href = `/exames/${id}`;
    
    alert('Abrindo visualização do exame...');
  };
  
  // Exemplo de função para baixar exame em PDF
  window.baixarExame = function(id) {
    console.log(`Baixando exame ID ${id} em PDF`);
    // Aqui você iniciaria o download do PDF
    // window.location.href = `/exames/${id}/download`;
    
    alert('Iniciando download do exame em PDF...');
  };
  
  // Inicialização dos gráficos
  const inicializarGraficos = () => {
    // Gráfico de pressão arterial
    const ctxPressao = document.getElementById('pressaoChart');
    if (ctxPressao) {
      new Chart(ctxPressao, {
        type: 'line',
        data: {
          labels: ['Jan', 'Fev', 'Mar', 'Abr', 'Mai'],
          datasets: [
            {
              label: 'Sistólica',
              data: [130, 128, 125, 122, 120],
              borderColor: 'rgba(59, 130, 246, 1)',
              backgroundColor: 'rgba(59, 130, 246, 0.1)',
              tension: 0.3,
              fill: true
            },
            {
              label: 'Diastólica',
              data: [85, 84, 82, 80, 78],
              borderColor: 'rgba(16, 185, 129, 1)',
              backgroundColor: 'rgba(16, 185, 129, 0.1)',
              tension: 0.3,
              fill: true
            }
          ]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
            legend: {
              position: 'top',
            },
            tooltip: {
              mode: 'index',
              intersect: false
            }
          },
          scales: {
            y: {
              beginAtZero: false,
              min: 60,
              max: 160,
              title: {
                display: true,
                text: 'mmHg'
              }
            },
            x: {
              title: {
                display: true,
                text: 'Mês'
              }
            }
          }
        }
      });
    }
    
    // Gráfico de peso
    const ctxPeso = document.getElementById('pesoChart');
    if (ctxPeso) {
      new Chart(ctxPeso, {
        type: 'line',
        data: {
          labels: ['Jan', 'Fev', 'Mar', 'Abr', 'Mai'],
          datasets: [{
            label: 'Peso (kg)',
            data: [72, 71.5, 70.8, 70.2, 69.5],
            borderColor: 'rgba(139, 92, 246, 1)',
            backgroundColor: 'rgba(139, 92, 246, 0.1)',
            tension: 0.3,
            fill: true
          }]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
            legend: {
              position: 'top',
            },
            tooltip: {
              mode: 'index',
              intersect: false
            }
          },
          scales: {
            y: {
              beginAtZero: false,
              min: 65,
              max: 75,
              title: {
                display: true,
                text: 'kg'
              }
            },
            x: {
              title: {
                display: true,
                text: 'Mês'
              }
            }
          }
        }
      });
    }
    
    // Gráfico de glicemia (se existir)
    const ctxGlicemia = document.getElementById('glicemiaChart');
    if (ctxGlicemia) {
      new Chart(ctxGlicemia, {
        type: 'line',
        data: {
          labels: ['Jan', 'Fev', 'Mar', 'Abr', 'Mai'],
          datasets: [{
            label: 'Glicemia (mg/dL)',
            data: [110, 105, 102, 98, 95],
            borderColor: 'rgba(245, 158, 11, 1)',
            backgroundColor: 'rgba(245, 158, 11, 0.1)',
            tension: 0.3,
            fill: true
          }]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
            legend: {
              position: 'top',
            }
          },
          scales: {
            y: {
              beginAtZero: false,
              min: 70,
              max: 130,
              title: {
                display: true,
                text: 'mg/dL'
              }
            }
          }
        }
      });
    }
  };
  
  // Inicializar gráficos
  inicializarGraficos();
  
  // Exemplo de função para registrar nova medição
  window.registrarMedicao = function(tipo) {
    console.log(`Registrando nova medição de ${tipo}`);
    
    let valor;
    switch(tipo) {
      case 'pressao':
        const sistolica = prompt('Digite o valor da pressão sistólica (mmHg):');
        const diastolica = prompt('Digite o valor da pressão diastólica (mmHg):');
        if (sistolica && diastolica) {
          valor = `${sistolica}/${diastolica}`;
        }
        break;
      case 'peso':
        valor = prompt('Digite o seu peso atual (kg):');
        break;
      case 'glicemia':
        valor = prompt('Digite o valor da glicemia (mg/dL):');
        break;
    }
    
    if (valor) {
      // Aqui você faria uma chamada AJAX para salvar a medição
      // fetch('/api/medicoes', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify({ tipo, valor, data: new Date() })
      // })
      //   .then(response => response.json())
      //   .then(data => console.log('Medição registrada:', data))
      //   .catch(error => console.error('Erro ao registrar medição:', error));
      
      alert(`Medição de ${tipo} registrada com sucesso: ${valor}`);
    }
  };
  
  // Exemplo de função para solicitar teleconsulta
  window.solicitarTeleconsulta = function(consultaId) {
    console.log(`Solicitando teleconsulta para a consulta ID ${consultaId}`);
    // Aqui você faria uma chamada AJAX para iniciar a teleconsulta
    // window.location.href = `/teleconsulta/${consultaId}`;
    
    alert('Iniciando teleconsulta...');
  };
  
  // Exemplo de função para reagendar consulta
  window.reagendarConsulta = function(consultaId) {
    console.log(`Reagendando consulta ID ${consultaId}`);
    // Aqui você abriria um modal para reagendamento
    
    const novaData = prompt('Digite a nova data para a consulta (DD/MM/AAAA):');
    const novaHora = prompt('Digite o novo horário para a consulta (HH:MM):');
    
    if (novaData && novaHora) {
      // Aqui você faria uma chamada AJAX para reagendar
      // fetch(`/api/consultas/${consultaId}/reagendar`, {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify({ data: novaData, hora: novaHora })
      // })
      //   .then(response => response.json())
      //   .then(data => console.log('Consulta reagendada:', data))
      //   .catch(error => console.error('Erro ao reagendar consulta:', error));
      
      alert(`Consulta reagendada para ${novaData} às ${novaHora}`);
    }
  };
  
  // Exemplo de função para atualizar perfil
  window.atualizarPerfil = function() {
    console.log('Atualizando perfil do paciente');
    // Aqui você redirecionaria para a página de perfil
    // window.location.href = '/perfil';
    
    alert('Redirecionando para a página de perfil...');
  };
  
  // Exemplo de função para sair do sistema
  window.sair = function() {
    console.log('Saindo do sistema');
    if (confirm('Tem certeza que deseja sair?')) {
      // Aqui você faria logout e redirecionaria para a página inicial
      // fetch('/api/logout', { method: 'POST' })
      //   .then(() => window.location.href = '/');
      
      window.location.href = 'index.html';
    }
  };
});
