// Inicialização do dashboard do governo
document.addEventListener('DOMContentLoaded', () => {
  // Efeito de fade-in na inicialização
  setTimeout(() => {
    document.body.classList.add('loaded');
  }, 100);
  
  // Menu do usuário (dropdown)
  const userMenuButton = document.getElementById('userMenuButton');
  const userMenu = document.getElementById('userMenu');
  
  userMenuButton.addEventListener('click', () => {
    userMenu.classList.toggle('hidden');
  });
  
  // Fecha o menu ao clicar fora
  document.addEventListener('click', (e) => {
    if (!userMenuButton.contains(e.target) && !userMenu.contains(e.target)) {
      userMenu.classList.add('hidden');
    }
  });
  
  // Navegação entre seções
  const navLinks = document.querySelectorAll('[data-section]');
  const sections = document.querySelectorAll('.section');

  navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      const targetSection = link.getAttribute('data-section');
      
      // Esconde todas as seções
      sections.forEach(section => section.classList.add('hidden'));
      
      // Mostra a seção alvo
      document.getElementById(targetSection).classList.remove('hidden');
      
      // Atualiza estado ativo nos links
      navLinks.forEach(navLink => {
        navLink.classList.remove('text-blue-600', 'border-b-2', 'border-blue-600');
        navLink.classList.add('text-gray-600', 'hover:text-blue-600');
      });
      
      link.classList.remove('text-gray-600', 'hover:text-blue-600');
      link.classList.add('text-blue-600', 'border-b-2', 'border-blue-600');
    });
  });
  
  // Inicialização dos gráficos
  initCharts();
  
  // Função para exportar relatórios
  const exportButtons = document.querySelectorAll('.export-btn');
  exportButtons.forEach(button => {
    button.addEventListener('click', () => {
      const format = button.getAttribute('data-format');
      const section = button.closest('.section').id;
      exportReport(section, format);
    });
  });
  
  // Simulação de atualização de dados em tempo real
  setInterval(updateLiveData, 60000); // Atualiza a cada minuto
});

// Inicialização de todos os gráficos
function initCharts() {
  if (typeof Chart === 'undefined') return;
  
  // Gráfico de Indicadores Nacionais
  const indicadoresCtx = document.getElementById('indicadoresChart');
  if (indicadoresCtx) {
    new Chart(indicadoresCtx, {
      type: 'line',
      data: {
        labels: ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun'],
        datasets: [
          {
            label: 'Atendimentos',
            data: [350000, 420000, 380000, 430000, 390000, 450000],
            borderColor: 'rgb(59, 130, 246)',
            backgroundColor: 'rgba(59, 130, 246, 0.1)',
            tension: 0.3,
            fill: true
          },
          {
            label: 'Internações',
            data: [75000, 82000, 68000, 74000, 79000, 85000],
            borderColor: 'rgb(16, 185, 129)',
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
          }
        },
        scales: {
          y: {
            beginAtZero: true
          }
        }
      }
    });
  }
  
  // Gráfico de Mapa de Calor
  const mapaCalorCtx = document.getElementById('mapaCalorChart');
  if (mapaCalorCtx) {
    new Chart(mapaCalorCtx, {
      type: 'bar',
      data: {
        labels: ['Norte', 'Nordeste', 'Centro-Oeste', 'Sudeste', 'Sul'],
        datasets: [
          {
            label: 'Casos COVID-19',
            data: [12500, 28700, 15800, 42300, 18600],
            backgroundColor: 'rgba(239, 68, 68, 0.7)',
          },
          {
            label: 'Casos Dengue',
            data: [18200, 32400, 8700, 15600, 5200],
            backgroundColor: 'rgba(245, 158, 11, 0.7)',
          }
        ]
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
            beginAtZero: true
          }
        }
      }
    });
  }
  
  // Gráfico de Epidemiologia
  const epidemiologiaCtx = document.getElementById('epidemiologiaChart');
  if (epidemiologiaCtx) {
    new Chart(epidemiologiaCtx, {
      type: 'line',
      data: {
        labels: ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun'],
        datasets: [
          {
            label: 'Dengue',
            data: [5200, 8500, 12800, 15400, 12200, 8700],
            borderColor: 'rgb(239, 68, 68)',
            tension: 0.3
          },
          {
            label: 'COVID-19',
            data: [18500, 15200, 12800, 10400, 8200, 7500],
            borderColor: 'rgb(245, 158, 11)',
            tension: 0.3
          },
          {
            label: 'Influenza',
            data: [3200, 4500, 6800, 5400, 4200, 3700],
            borderColor: 'rgb(59, 130, 246)',
            tension: 0.3
          }
        ]
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
            beginAtZero: true
          }
        }
      }
    });
  }
  
  // Gráfico de Vacinação por Regiões
  const vacinacaoRegioesCtx = document.getElementById('vacinacaoRegioesChart');
  if (vacinacaoRegioesCtx) {
    new Chart(vacinacaoRegioesCtx, {
      type: 'bar',
      data: {
        labels: ['Norte', 'Nordeste', 'Centro-Oeste', 'Sudeste', 'Sul'],
        datasets: [
          {
            label: 'Cobertura Vacinal (%)',
            data: [68, 72, 75, 85, 82],
            backgroundColor: 'rgba(59, 130, 246, 0.7)',
          }
        ]
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
            beginAtZero: true,
            max: 100
          }
        }
      }
    });
  }
  
  // Gráfico de Evolução da Vacinação
  const vacinacaoEvolucaoCtx = document.getElementById('vacinacaoEvolucaoChart');
  if (vacinacaoEvolucaoCtx) {
    new Chart(vacinacaoEvolucaoCtx, {
      type: 'line',
      data: {
        labels: ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun'],
        datasets: [
          {
            label: 'Doses Aplicadas (milhões)',
            data: [12.5, 18.7, 24.3, 32.8, 38.5, 45.2],
            borderColor: 'rgb(16, 185, 129)',
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
          }
        },
        scales: {
          y: {
            beginAtZero: true
          }
        }
      }
    });
  }
  
  // Gráfico de Orçamento
  const orcamentoCtx = document.getElementById('orcamentoChart');
  if (orcamentoCtx) {
    new Chart(orcamentoCtx, {
      type: 'doughnut',
      data: {
        labels: ['Atenção Básica', 'Média e Alta Complexidade', 'Vigilância em Saúde', 'Assistência Farmacêutica', 'Outros'],
        datasets: [
          {
            data: [35, 42, 12, 8, 3],
            backgroundColor: [
              'rgba(59, 130, 246, 0.7)',
              'rgba(16, 185, 129, 0.7)',
              'rgba(245, 158, 11, 0.7)',
              'rgba(139, 92, 246, 0.7)',
              'rgba(107, 114, 128, 0.7)'
            ]
          }
        ]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            position: 'right',
          }
        }
      }
    });
  }
  
  // Gráfico de Execução
  const execucaoCtx = document.getElementById('execucaoChart');
  if (execucaoCtx) {
    new Chart(execucaoCtx, {
      type: 'bar',
      data: {
        labels: ['Atenção Básica', 'Média e Alta Complexidade', 'Vigilância em Saúde', 'Assistência Farmacêutica', 'Outros'],
        datasets: [
          {
            label: 'Orçado (bilhões R$)',
            data: [45.2, 58.7, 18.3, 12.8, 5.5],
            backgroundColor: 'rgba(59, 130, 246, 0.7)',
          },
          {
            label: 'Executado (bilhões R$)',
            data: [32.5, 42.3, 10.8, 8.5, 3.2],
            backgroundColor: 'rgba(16, 185, 129, 0.7)',
          }
        ]
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
            beginAtZero: true
          }
        }
      }
    });
  }
}

// Função para exportar relatórios
function exportReport(section, format) {
  // Simulação de exportação
  console.log(`Exportando relatório da seção ${section} no formato ${format}`);
  
  // Aqui seria implementada a lógica real de exportação
  const notification = document.createElement('div');
  notification.className = 'fixed bottom-4 right-4 bg-green-500 text-white px-4 py-2 rounded-lg shadow-lg';
  notification.textContent = `Relatório exportado com sucesso no formato ${format.toUpperCase()}`;
  
  document.body.appendChild(notification);
  
  // Remove a notificação após 3 segundos
  setTimeout(() => {
    notification.remove();
  }, 3000);
}

// Simulação de atualização de dados em tempo real
function updateLiveData() {
  // Aqui seria implementada a lógica real de atualização com dados do backend
  const timestamp = document.getElementById('lastUpdate');
  if (timestamp) {
    const now = new Date();
    timestamp.textContent = `Última atualização: ${now.toLocaleTimeString()}`;
  }
  
  // Atualiza contadores aleatoriamente para simular dados em tempo real
  const counters = document.querySelectorAll('.live-counter');
  counters.forEach(counter => {
    const currentValue = parseInt(counter.textContent.replace(/\D/g, ''));
    const variation = Math.floor(Math.random() * 10) - 5; // Variação entre -5 e +5
    counter.textContent = (currentValue + variation).toLocaleString();
  });
}
