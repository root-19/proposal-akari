document.addEventListener('DOMContentLoaded', function() {
    // Mobile Menu Toggle
    const mobileMenuButton = document.getElementById('mobile-menu-button');
    const mobileMenu = document.getElementById('mobile-menu');

    if (mobileMenuButton && mobileMenu) {
        mobileMenuButton.addEventListener('click', () => {
            mobileMenu.classList.toggle('hidden');
            if (!mobileMenu.classList.contains('hidden')) {
                // Add slide down animation
                mobileMenu.style.maxHeight = '0';
                mobileMenu.style.overflow = 'hidden';
                mobileMenu.style.transition = 'max-height 0.3s ease-in-out';
                
                // Trigger reflow
                mobileMenu.offsetHeight;
                
                // Set max height to show menu
                mobileMenu.style.maxHeight = mobileMenu.scrollHeight + 'px';
            } else {
                // Add slide up animation
                mobileMenu.style.maxHeight = '0';
            }
        });
    }

    // Close mobile menu when clicking outside
    document.addEventListener('click', (e) => {
        if (mobileMenu && !mobileMenu.contains(e.target) && !mobileMenuButton.contains(e.target)) {
            mobileMenu.classList.add('hidden');
            mobileMenu.style.maxHeight = '0';
        }
    });

    // Chat functionality
    const chatBtn = document.getElementById('chatBtn');
    const chatModal = document.getElementById('chatModal');
    const chatInput = chatModal?.querySelector('input');

    if (chatBtn && chatModal) {
        chatBtn.addEventListener('click', () => {
            chatModal.classList.toggle('hidden');
            if (!chatModal.classList.contains('hidden')) {
                chatModal.classList.add('chat-modal-enter');
            }
        });
    }

    // Close chat when clicking outside
    document.addEventListener('click', (e) => {
        if (chatModal && !chatModal.contains(e.target) && !chatBtn.contains(e.target)) {
            chatModal.classList.add('hidden');
        }
    });

    // Chat input functionality
    if (chatInput) {
        chatInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter' && chatInput.value.trim()) {
                addMessage(chatInput.value, 'user');
                chatInput.value = '';
                
                // Simulate bot response
                setTimeout(() => {
                    const responses = [
                        "Thank you for your message! How can I help you today?",
                        "I'm here to assist you with any questions about our products.",
                        "Would you like to know more about our latest collection?",
                        "Is there anything specific you'd like to know about Akari Store?"
                    ];
                    const randomResponse = responses[Math.floor(Math.random() * responses.length)];
                    addMessage(randomResponse, 'bot');
                }, 1000);
            }
        });
    }

    // Like button functionality
    const likeBtn = document.getElementById('likeBtn');
    if (likeBtn) {
        likeBtn.addEventListener('click', () => {
            likeBtn.classList.toggle('liked');
            if (likeBtn.classList.contains('liked')) {
                likeBtn.innerHTML = `
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                    </svg>
                `;
                likeBtn.classList.add('like-animation');
            } else {
                likeBtn.innerHTML = `
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                    </svg>
                `;
                likeBtn.classList.remove('like-animation');
            }
        });
    }

    // Add floating animation to buttons
    const floatingButtons = document.querySelectorAll('.fixed button');
    floatingButtons.forEach(button => {
        button.classList.add('float-animation');
    });
});

function addMessage(message, sender) {
    const chatWindow = document.querySelector('#chatModal .space-y-4');
    const messageDiv = document.createElement('div');
    messageDiv.className = `bg-${sender === 'user' ? 'akari-pink' : 'gray-100'} ${sender === 'user' ? 'text-white' : 'text-gray-800'} p-3 rounded-lg ${sender === 'user' ? 'ml-auto' : 'mr-auto'} max-w-[80%]`;
    messageDiv.textContent = message;
    chatWindow.appendChild(messageDiv);
    chatWindow.scrollTop = chatWindow.scrollHeight;
} 