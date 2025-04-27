/**
 * Script para incorporar o widget de chat em qualquer site.
 * 
 * Uso: 
 * <script src="https://seu-dominio.com/chat-embed.js" 
 *   data-position="bottom-right" 
 *   data-color="#8b5cf6">
 * </script>
 */

(function () {
    // Obter o script atual
    const currentScript = document.currentScript;

    // Obter URL base do script
    const scriptSrc = currentScript.src;
    const baseUrl = scriptSrc.substring(0, scriptSrc.lastIndexOf('/'));
    const chatUrl = baseUrl.replace(/\/public$/, '') + '/chat';

    // Obter atributos de configuração
    const position = currentScript.getAttribute('data-position') || 'bottom-right';
    const primaryColor = currentScript.getAttribute('data-color') || '#8b5cf6';
    const iconSize = currentScript.getAttribute('data-size') || '60';

    // Criar os estilos CSS
    const style = document.createElement('style');
    style.textContent = `
    .chat-iframe-button {
      position: fixed;
      width: ${iconSize}px;
      height: ${iconSize}px;
      border-radius: 50%;
      background-color: ${primaryColor};
      display: flex;
      align-items: center;
      justify-content: center;
      cursor: pointer;
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
      z-index: 9998;
      transition: transform 0.3s ease;
    }
    
    .chat-iframe-button:hover {
      transform: scale(1.1);
    }
    
    .chat-iframe-container {
      position: fixed;
      z-index: 9999;
      display: none;
    }
    
    .chat-iframe {
      border: none;
      border-radius: 8px;
      background-color: white;
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
    }
  `;
    document.head.appendChild(style);

    // Definir posicionamento
    let positionStyles = {
        button: {},
        container: {}
    };

    switch (position) {
        case 'bottom-right':
            positionStyles.button = { bottom: '20px', right: '20px' };
            positionStyles.container = { bottom: '90px', right: '20px' };
            break;
        case 'bottom-left':
            positionStyles.button = { bottom: '20px', left: '20px' };
            positionStyles.container = { bottom: '90px', left: '20px' };
            break;
        case 'top-right':
            positionStyles.button = { top: '20px', right: '20px' };
            positionStyles.container = { top: '90px', right: '20px' };
            break;
        case 'top-left':
            positionStyles.button = { top: '20px', left: '20px' };
            positionStyles.container = { top: '90px', left: '20px' };
            break;
        default:
            positionStyles.button = { bottom: '20px', right: '20px' };
            positionStyles.container = { bottom: '90px', right: '20px' };
    }

    // Criar o botão do chat
    const chatButton = document.createElement('div');
    chatButton.className = 'chat-iframe-button';
    Object.assign(chatButton.style, positionStyles.button);

    // Ícone do botão
    chatButton.innerHTML = `
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
      <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
    </svg>
  `;

    // Criar o container do iframe
    const iframeContainer = document.createElement('div');
    iframeContainer.className = 'chat-iframe-container';
    Object.assign(iframeContainer.style, positionStyles.container);

    // Criar o iframe
    const iframe = document.createElement('iframe');
    iframe.className = 'chat-iframe';
    iframe.src = chatUrl;
    iframe.width = '380';
    iframe.height = '600';
    iframe.allow = 'microphone';

    // Adicionar iframe ao container
    iframeContainer.appendChild(iframe);

    // Adicionar elementos ao documento
    document.body.appendChild(chatButton);
    document.body.appendChild(iframeContainer);

    // Alternar a visibilidade do chat
    let isOpen = false;
    chatButton.addEventListener('click', () => {
        isOpen = !isOpen;
        iframeContainer.style.display = isOpen ? 'block' : 'none';

        // Mudar ícone dependendo do estado
        if (isOpen) {
            chatButton.innerHTML = `
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <line x1="18" y1="6" x2="6" y2="18"></line>
          <line x1="6" y1="6" x2="18" y2="18"></line>
        </svg>
      `;
        } else {
            chatButton.innerHTML = `
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
        </svg>
      `;
        }
    });
})(); 