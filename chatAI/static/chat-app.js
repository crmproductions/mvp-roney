// Função para adicionar o chat à página dinamicamente
function addChat() {
  // Criando o botão flutuante do chat
  const chatBtn = document.createElement("div");
  chatBtn.id = "chat-btn";
  chatBtn.classList.add(
    "fixed",
    "bottom-5",
    "right-5",
    "bg-blue-600",
    "text-white",
    "rounded-full",
    "p-4",
    "shadow-lg",
    "cursor-pointer",
    "transition-all",
    "duration-300",
    "hover:bg-blue-700"
  );
  chatBtn.innerHTML = `
        <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <path d="M21 12a9 9 0 1 0-9 9c.355 0 .698-.034 1.035-.1A6.489 6.489 0 0 1 15 21l3 3-1-4.4a8.942 8.942 0 0 0 3-6.6zM3 12a9 9 0 0 1 9-9V3c-5 0-9 4-9 9z"></path>
        </svg>
    `;

  // Adicionando o botão na página
  document.body.appendChild(chatBtn);

  // Criando a caixa de chat
  const chatBox = document.createElement("div");
  chatBox.id = "chat-box";
  chatBox.classList.add(
    "hidden",
    "fixed",
    "bottom-20",
    "right-5",
    "w-96", // Largura maior para o chat
    "bg-white",
    "rounded-lg",
    "border",
    "border-gray-200",
    "shadow-xl",
    "flex",
    "flex-col",
    "transition-all",
    "duration-300",
    "transform",
    "scale-95",
    "hover:scale-100"
  );
  chatBox.innerHTML = `
        <div id="chat-header" class="bg-blue-600 text-white p-3 rounded-t-lg flex justify-between items-center">
            <span class="font-bold text-lg text-center">HealthSync AI</span>
            <button id="close-chat" class="text-white hover:bg-blue-700 rounded-full p-1">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <path d="M6 18L18 6M6 6l12 12"></path>
                </svg>
            </button>
        </div>
        <div id="chat-content" class="overflow-y-auto p-4 space-y-3 max-h-72">
        </div>
        <div class="flex p-3 bg-gray-50 rounded-b-lg">
            <input type="text" id="user-input" class="w-full border border-gray-300 rounded-lg p-2 mr-2 focus:outline-none focus:ring-2 focus:ring-blue-600" placeholder="Digite uma mensagem para IA..." />
            <button id="send-message" class="bg-blue-600 text-white p-2 rounded-lg hover:bg-blue-700 transition-all duration-300">
                Enviar
            </button>
        </div>
    `;

  // Adicionando a caixa de chat na página
  document.body.appendChild(chatBox);

  // Função para abrir o chat
  chatBtn.addEventListener("click", function () {
    if (chatBox.classList.contains("hidden")) {
      chatBox.classList.remove("hidden");
      chatBtn.classList.add("hidden");
    }
  });

  const closeChatBtn = document.getElementById("close-chat");
  closeChatBtn.addEventListener("click", function () {
    chatBox.classList.add("hidden");
    chatBtn.classList.remove("hidden");
  });

  const sendMessageBtn = document.getElementById("send-message");
  sendMessageBtn.addEventListener("click", function () {
    sendMessage();
  });

  async function simulateBotResponse(input) {
    const context = `
    Você é um assistente de IA para a plataforma Health Sync, um sistema de gerenciamento de hospitais. 
    Você deve fornecer respostas relacionadas ao gerenciamento de hospitais, saúde, cuidados médicos, 
    otimização de processos administrativos e tudo relacionado à operação de unidades de saúde. 
    As respostas devem ser concisas e focadas no contexto hospitalar. 
    Caso precise de mais informações, você pode pedir detalhes sobre a plataforma Health Sync. A resposta deve ter no maximo 1 paragrafo. 
  `;

    try {
      const response = await fetch(
        "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=AIzaSyD6XuQPYiA9eOWL__qTAglblck6sRgU9as",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            contents: [
              {
                parts: [
                  {
                    text: context + "\n" + input,
                  },
                ],
              },
            ],
          }),
        }
      );

      if (!response.ok) {
        throw new Error(`Erro na requisição: ${response.status}`);
      }

      const data = await response.json();

      console.log(data);

      const botResponse = data.candidates[0].content.parts[0].text;

      if (botResponse && botResponse.includes("Please provide me with the context")) {
        return "Desculpe, preciso de mais detalhes. Você poderia me dar uma frase, tópico ou pergunta para analisar?";
      }
      return truncateResponse(botResponse);
    } catch (error) {
      console.error("Erro ao buscar resposta da IA:", error);
      return "Desculpe, ocorreu um erro ao processar sua solicitação.";
    }
  }

  function truncateResponse(response) {
    const maxLength = 400;
    if (response.length > maxLength) {
      return response.substring(0, maxLength) + "...";
    }
    return response;
  }

  function showLoadingIndicator() {
    const chatContent = document.getElementById("chat-content");
    const loadingMessage = document.createElement("div");
    loadingMessage.id = "loading-indicator";
    loadingMessage.classList.add("text-gray-500", "italic");
    loadingMessage.textContent = "IA está digitando...";
    chatContent.appendChild(loadingMessage);
  }

  function hideLoadingIndicator() {
    const loadingMessage = document.getElementById("loading-indicator");
    if (loadingMessage) {
      loadingMessage.remove();
    }
  }

  async function sendMessage() {
    const userInput = document.getElementById("user-input");
    const chatContent = document.getElementById("chat-content");

    if (userInput.value.trim() !== "") {
      const userMessage = document.createElement("div");
      userMessage.classList.add("bg-blue-100", "p-2", "rounded-lg", "text-blue-800");
      userMessage.textContent = "Você: " + userInput.value;
      chatContent.appendChild(userMessage);

      showLoadingIndicator();
      userInput.value = "";
      const botResponse = await simulateBotResponse(userInput.value);

      hideLoadingIndicator();

      const botMessage = document.createElement("div");
      botMessage.classList.add("bg-gray-100", "p-2", "rounded-lg", "text-gray-800");
      botMessage.textContent = "IA: " + botResponse;
      chatContent.appendChild(botMessage);

      chatContent.scrollTop = chatContent.scrollHeight;
    }
  }

  const userInput = document.getElementById("user-input");
  userInput.addEventListener("keydown", function (e) {
    if (e.key === "Enter") {
      sendMessage();
    }
  });
}

window.onload = addChat;
