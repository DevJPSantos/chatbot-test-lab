const chatFlow = {
    initial: {
        botMessage: "Olá! Este é o bot do Suporte, selecione a opção no menu ao lado que corresponde ao seu problema para podermos te encaminhar corretamente.",
        options: ["Opção 1", "Opção 2", "Opção 3", "Opção 4", "Outros"]
    },
    "Opção 1": { botMessage: "Resposta da Opção 1", options: ["a", "b", "c"] },
    "Opção 2": { botMessage: "Resposta da Opção 2", options: ["d", "e", "f"] },
    "Opção 3": { botMessage: "Resposta da Opção 3", options: ["g", "h", "i"] },
    "Opção 4": { botMessage: "Resposta da Opção 4", options: ["j", "k", "l"] },
    "a": { botMessage: "Resposta da Opção a", options: ["1", "2", "3"] },
    "b": { botMessage: "Resposta da Opção b", options: ["4", "5", "6"] },
    "c": { botMessage: "Resposta da Opção c", options: ["7", "8", "9"] },
    "d": { botMessage: "Resposta da Opção d", options: ["10", "11", "12"] },
    "e": { botMessage: "Resposta da Opção e", options: ["13", "14", "15"] }
};

const appRoot = document.getElementById('app-root');
let messagesDisplay;
let optionsSidebar;
const navigationStack = ['initial'];

function scrollToBottom() {
    if (messagesDisplay) {
        messagesDisplay.scrollTop = messagesDisplay.scrollHeight;
    }
}

function renderMessage(type, text) {
    const messageDiv = document.createElement('div');
    messageDiv.classList.add('message-bubble');
    if (type === 'bot') {
        messageDiv.classList.add('bot-message');
    } else {
        messageDiv.classList.add('user-message');
    }
    messageDiv.textContent = text;
    messagesDisplay.appendChild(messageDiv);
    scrollToBottom();
    return messageDiv;
}

function updateOptions(options) {
    optionsSidebar.innerHTML = '<h3 class="text-lg font-semibold text-gray-700 mb-2">Opções:</h3>';
    options.forEach(option => {
        const button = document.createElement('button');
        button.classList.add('option-button');
        button.textContent = option;
        button.addEventListener('click', () => handleOptionSelect(option));
        optionsSidebar.appendChild(button);
    });
}

function handleOptionSelect(option) {
    if (option === 'Voltar') {
        navigationStack.pop();
        const previousKey = navigationStack[navigationStack.length - 1];
        const previousState = chatFlow[previousKey];

        renderMessage('user', option);
        renderMessage('bot', previousState.botMessage);

        const optionsToShow = previousState.options;
        if (navigationStack.length > 1) {
            updateOptions(['🔙 Voltar', ...optionsToShow]);
        } else {
            updateOptions(optionsToShow);
        }
        return;
    }

    renderMessage('user', option);

    const nextState = chatFlow[option];
    const botResponseText = nextState ? nextState.botMessage : "Desculpe, não entendi. Por favor, selecione uma opção válida.";
    const nextOptions = nextState ? nextState.options : chatFlow.initial.options;

    if (nextState) {
        navigationStack.push(option);
    }

    const typingIndicatorDiv = renderMessage('bot', 'Digitando...');
    typingIndicatorDiv.classList.add('typing-indicator');

    setTimeout(() => {
        if (typingIndicatorDiv.parentNode) {
            typingIndicatorDiv.parentNode.removeChild(typingIndicatorDiv);
        }
        renderMessage('bot', botResponseText);
        if (navigationStack.length > 1) {
            updateOptions(['Voltar', ...nextOptions]);
        } else {
            updateOptions(nextOptions);
        }
    }, 500);
}

function startChat() {
    appRoot.innerHTML = `
        <div class="chat-area">
            <div class="chat-header">
                <h2>Suporte BOT</h2>
            </div>
            <div class="messages-display custom-scrollbar"></div>
        </div>
        <div class="options-sidebar custom-scrollbar"></div>
        <div class="action-buttons">
            <button id="evaluate-app-button" class="action-button blue">Avalie o app</button>
            <button id="report-problem-button" class="action-button red">Reportar problema</button>
        </div>
    `;

    messagesDisplay = appRoot.querySelector('.messages-display');
    optionsSidebar = appRoot.querySelector('.options-sidebar');

    navigationStack.length = 0;
    navigationStack.push('initial');

    renderMessage('bot', chatFlow.initial.botMessage);
    updateOptions(chatFlow.initial.options);

    document.getElementById('evaluate-app-button').addEventListener('click', () =>
        alert("Função 'Avalie o app' em desenvolvimento!")
    );
    document.getElementById('report-problem-button').addEventListener('click', () =>
        alert("Função 'Reportar problema' em desenvolvimento!")
    );
}

function renderInitialScreen() {
    appRoot.innerHTML = `
        <div class="left-panel initial-screen">
            <h1>Bem-vindo ao suporte BOT!</h1>
            <button id="start-chat-button" class="start-button">
                Iniciar Chat
            </button>
        </div>
        <div class="right-panel"></div>
    `;
    document.getElementById('start-chat-button').addEventListener('click', startChat);
}

document.addEventListener('DOMContentLoaded', renderInitialScreen);
