const quotes = [
    { text: "The only way to do great work is to love what you do.", category: "Motivation" },
    { text: "Life is what happens when you're busy making other plans.", category: "Life" },
    { text: "Success is not in what you have, but who you are.", category: "Success" },
];

function showRandomQuote(category = null) {
    let filteredQuotes = quotes;
    if (category && category !== "All") {
        filteredQuotes = quotes.filter(q => q.category === category);
    }
    if (filteredQuotes.length === 0) {
        document.getElementById('quoteDisplay').textContent = "No quotes available for this category.";
        return;
    }
    const randomIndex = Math.floor(Math.random() * filteredQuotes.length);
    const quote = filteredQuotes[randomIndex];
    document.getElementById('quoteDisplay').textContent = `"${quote.text}" — ${quote.category}`;
}

function addQuote() {
    const textInput = document.getElementById('newQuoteText');
    const categoryInput = document.getElementById('newQuoteCategory');
    const text = textInput.value.trim();
    const category = categoryInput.value.trim();
    if (!text || !category) {
        alert("Please enter both quote text and category.");
        return;
    }
    quotes.push({ text, category });
    updateCategoryOptions();
    textInput.value = '';
    categoryInput.value = '';
    showRandomQuote();
}

function updateCategoryOptions() {
    const select = document.getElementById('categorySelect');
    if (!select) return;
    const categories = Array.from(new Set(quotes.map(q => q.category)));
    select.innerHTML = '<option value="All">All</option>';
    categories.forEach(cat => {
        const option = document.createElement('option');
        option.value = cat;
        option.textContent = cat;
        select.appendChild(option);
    });
}

function createAddQuoteForm() {
    const formDiv = document.createElement('div');
    formDiv.innerHTML = `
        <input id="newQuoteText" type="text" placeholder="Enter a new quote" />
        <input id="newQuoteCategory" type="text" placeholder="Enter quote category" />
        <button id="addQuoteBtn">Add Quote</button>
    `;
    document.body.appendChild(formDiv);
    document.getElementById('addQuoteBtn').addEventListener('click', addQuote);
}

function createCategorySelector() {
    const label = document.createElement('label');
    label.textContent = "Filter by category: ";
    const select = document.createElement('select');
    select.id = 'categorySelect';
    select.addEventListener('change', function () {
        showRandomQuote(this.value);
    });
    label.appendChild(select);
    document.body.insertBefore(label, document.getElementById('quoteDisplay'));
    updateCategoryOptions();
}

document.addEventListener('DOMContentLoaded', function () {
    createCategorySelector();
    createAddQuoteForm();
    showRandomQuote();

    document.getElementById('newQuote').addEventListener('click', function () {
        const select = document.getElementById('categorySelect');
        showRandomQuote(select ? select.value : null);
    });
});

// ...existing code...

function populateCategories() {
    const select = document.getElementById('categorySelect');
    if (!select) return;
    const categories = Array.from(new Set(quotes.map(q => q.category)));
    select.innerHTML = '<option value="All">All</option>';
    categories.forEach(cat => {
        const option = document.createElement('option');
        option.value = cat;
        option.textContent = cat;
        select.appendChild(option);
    });

    // استرجاع الفئة المختارة من Local Storage
    const savedCategory = localStorage.getItem('selectedCategory');
    if (savedCategory && Array.from(select.options).some(opt => opt.value === savedCategory)) {
        select.value = savedCategory;
    }
}

function filterQuotes() {
    const select = document.getElementById('categorySelect');
    const category = select.value;
    localStorage.setItem('selectedCategory', category); // حفظ الفئة المختارة
    showRandomQuote(category);
}

function updateCategoryOptions() {
    populateCategories();
}

// عدّل createCategorySelector ليستخدم populateCategories و filterQuotes
function createCategorySelector() {
    const label = document.createElement('label');
    label.textContent = "Filter by category: ";
    const select = document.createElement('select');
    select.id = 'categorySelect';
    select.addEventListener('change', filterQuotes);
    label.appendChild(select);
    document.body.insertBefore(label, document.getElementById('quoteDisplay'));
    populateCategories();
}

// عند تحميل الصفحة، طبّق الفلتر المحفوظ
document.addEventListener('DOMContentLoaded', function () {
    createCategorySelector();
    createAddQuoteForm();

    // استرجاع الفئة المختارة من Local Storage
    const savedCategory = localStorage.getItem('selectedCategory');
    showRandomQuote(savedCategory && savedCategory !== "All" ? savedCategory : null);

    // زر عرض اقتباس جديد
    document.getElementById('newQuote').addEventListener('click', function () {
        const select = document.getElementById('categorySelect');
        showRandomQuote(select ? select.value : null);
    });
});

/*
Checklist:

1. Check if requisite files exist:
    - The script is in `/f:/alx_fe_javascript-2/dom-manipulation/script.js`.
    - Assumes an HTML file exists with elements: 'quoteDisplay', 'newQuote', etc.

2. Check for the populateCategories function:
    - Yes, function populateCategories() is defined.

3. Check for extracting unique categories and populating the dropdown menu:
    - Yes, categories are extracted using:
      const categories = Array.from(new Set(quotes.map(q => q.category)));
    - The dropdown is populated with these categories.

4. Check for the filterQuotes function:
    - Yes, function filterQuotes() is defined.

5. Check for logic to filter and update the displayed quotes based on the selected category:
    - filterQuotes() calls showRandomQuote(category) after saving to localStorage.
    - showRandomQuote(category) filters and displays a random quote.

6. Check for saving the selected category to local storage:
    - filterQuotes() saves the selected category:
      localStorage.setItem('selectedCategory', category);

7. Check for restoring the last selected category when the page loads:
    - On DOMContentLoaded, the saved category is retrieved and used:
      const savedCategory = localStorage.getItem('selectedCategory');
      showRandomQuote(savedCategory && savedCategory !== "All" ? savedCategory : null);
    - populateCategories() also restores the selected value in the dropdown.

All required logic is present in the code.
*/