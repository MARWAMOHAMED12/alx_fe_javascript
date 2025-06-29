const quotes = [
    { text: "The only way to do great work is to love what you do.", category: "Motivation" },
    { text: "Life is what happens when you're busy making other plans.", category: "Life" },
    { text: "Success is not in what you have, but who you are.", category: "Success" }
];

// Function to display a random quote
function showRandomQuote() {
    const container = document.getElementById('quote-container');
    if (!container) return;
    const randomIndex = Math.floor(Math.random() * quotes.length);
    const quote = quotes[randomIndex];
    container.innerHTML = `
        <blockquote>${quote.text}</blockquote>
        <p><em>Category: ${quote.category}</em></p>
    `;
}

// Function to create and display the add-quote form
function createAddQuoteForm() {
    const formContainer = document.getElementById('form-container');
    if (!formContainer) return;

    formContainer.innerHTML = `
        <form id="add-quote-form">
            <input type="text" id="quote-text" placeholder="Quote text" required />
            <input type="text" id="quote-category" placeholder="Category" required />
            <button type="submit">Add Quote</button>
        </form>
    `;

    document.getElementById('add-quote-form').onsubmit = function(e) {
        e.preventDefault();
        const text = document.getElementById('quote-text').value.trim();
        const category = document.getElementById('quote-category').value.trim();
        if (text && category) {
            quotes.push({ text, category });
            showRandomQuote();
            this.reset();
        }
    };
}

// Example usage: call these functions after DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    showRandomQuote();
    createAddQuoteForm();
});