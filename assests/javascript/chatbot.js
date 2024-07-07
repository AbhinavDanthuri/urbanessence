// assets/javascript/chatbot.js

const botResponses = {
    "hello": "Hi there! How can I assist you today?",
    "hi": "Hello! How can I help you?",
    "how are you": "I'm a chatbot, so I'm always good! How can I assist you?",
    "what is your name": "I am UrbanEssence's customer support chatbot.",
    "bye": "Goodbye! Have a great day!",
    "default": "I'm sorry, I didn't understand that. Can you please rephrase?"
};

// Add more comprehensive responses here
const advancedBotResponses = [
    {
        keywords: ["price", "cost"],
        response: "Our products range in price. Can you specify which product you're interested in?"
    },
    {
        keywords: ["shipping", "delivery"],
        response: "We offer free shipping on orders over $50. Delivery usually takes 3-5 business days."
    },
    {
        keywords: ["return", "refund"],
        response: "You can return any item within 30 days for a full refund. Please visit our return policy page for more details."
    }
];

function sendMessage() {
    const userInput = document.getElementById('userInput').value.trim().toLowerCase();
    if (userInput === "") return;

    displayMessage(userInput, 'user-message');
    document.getElementById('userInput').value = "";

    const botResponse = getBotResponse(userInput);
    displayMessage(botResponse, 'bot-message');
}

function displayMessage(message, className) {
    const messageContainer = document.createElement('div');
    messageContainer.classList.add('message', className);
    messageContainer.textContent = message;
    document.getElementById('messages').appendChild(messageContainer);
    document.getElementById('chatbox').scrollTop = document.getElementById('chatbox').scrollHeight;
}

function getBotResponse(userInput) {
    // Check if the input matches any advanced response
    for (let i = 0; i < advancedBotResponses.length; i++) {
        const responseEntry = advancedBotResponses[i];
        for (let j = 0; j < responseEntry.keywords.length; j++) {
            if (userInput.includes(responseEntry.keywords[j])) {
                return responseEntry.response;
            }
        }
    }

    // Check if the input matches any predefined simple response
    return botResponses[userInput] || botResponses["default"];
}
