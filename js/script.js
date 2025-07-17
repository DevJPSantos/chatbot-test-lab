function renderInitialScreen() {
    appRoot.innerHTML = `
        <div class="left-panel initial-screen">
            <h1>Bem-vindo ao suporte BOT!</h1>
            <button id="start-chat-button" class="start-button">Iniciar Chat</button>
        </div>
        <div class="right-panel"></div>
    `;
    document.getElementById('start-chat-button').addEventListener('click', startChat);
}

