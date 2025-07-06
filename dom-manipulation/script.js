function importFromJsonFile(event) {
    const fileReader = new FileReader();
    fileReader.onload = function(event) {
        try {
            const importedQuotes = JSON.parse(event.target.result);
            if (Array.isArray(importedQuotes)) {
                quotes.push(...importedQuotes);
                saveQuotes();
                alert('Quotes imported successfully!');
            } else {
                alert('Invalid file format.');
            }
        } catch (e) {
            alert('Error reading JSON file.');
        }
    };
    fileReader.readAsText(event.target.files[0]);
}
let quotes = [];

function loadQuotes() {
  const savedQuotes = localStorage.getItem('quotes');
  if (savedQuotes) {
    quotes = JSON.parse(savedQuotes);
  }
}

function saveQuotes() {
  localStorage.setItem('quotes', JSON.stringify(quotes));
}

function saveLastQuote(quote) {
  sessionStorage.setItem('lastQuote', quote);
}

function addQuote(quoteText) {
  quotes.push(quoteText);
  saveQuotes();
  saveLastQuote(quoteText);
  displayQuote(quoteText);
}

function displayQuote(quote) {
  const quoteContainer = document.getElementById('quoteContainer');
  quoteContainer.textContent = quote;
}

// ======= JSON Export ========
function exportToJsonFile() {
  const dataStr = JSON.stringify(quotes, null, 2);
  const blob = new Blob([dataStr], { type: "application/json" });
  const url = URL.createObjectURL(blob);

  const a = document.createElement('a');
  a.href = url;
  a.download = "quotes.json";
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
}

// ======= JSON Import ========
function importFromJsonFile(event) {
  const fileReader = new FileReader();
  fileReader.onload = function (event) {
    try {
      const importedQuotes = JSON.parse(event.target.result);
      if (Array.isArray(importedQuotes)) {
        quotes.push(...importedQuotes);
        saveQuotes();
        alert('Quotes imported successfully!');
      } else {
        alert('Invalid file format.');
      }
    } catch (e) {
      alert('Error reading JSON file.');
    }
  };
  fileReader.readAsText(event.target.files[0]);
}

// ======= Initialization ========
document.addEventListener('DOMContentLoaded', () => {
  loadQuotes();
  const lastQuote = sessionStorage.getItem('lastQuote');
  if (lastQuote) {
    displayQuote(lastQuote);
  }
});

let quotes = [];
let selectedCategory = 'all';

function loadQuotes() {
  const stored = localStorage.getItem('quotes');
  if (stored) {
    quotes = JSON.parse(stored);
  }

  const savedFilter = localStorage.getItem('selectedCategory');
  if (savedFilter) {
    selectedCategory = savedFilter;
    document.getElementById('categoryFilter').value = selectedCategory;
  }
}

function saveQuotes() {
  localStorage.setItem('quotes', JSON.stringify(quotes));
}

function saveSelectedCategory(category) {
  localStorage.setItem('selectedCategory', category);
}

function addQuote() {
  const quoteText = document.getElementById('quoteInput').value.trim();
  const categoryText = document.getElementById('categoryInput').value.trim();

  if (quoteText === '' || categoryText === '') {
    alert('Please enter both quote and category.');
    return;
  }

  const newQuote = { text: quoteText, category: categoryText };
  quotes.push(newQuote);
  saveQuotes();

  // لو التصنيف جديد نحدث الليستة
  populateCategories();
  filterQuotes();

  document.getElementById('quoteInput').value = '';
  document.getElementById('categoryInput').value = '';
}

function populateCategories() {
  const select = document.getElementById('categoryFilter');
  const categories = ['all', ...new Set(quotes.map(q => q.category))];

  // مسح الخيارات القديمة
  select.innerHTML = '';

  categories.forEach(cat => {
    const option = document.createElement('option');
    option.value = cat;
    option.textContent = cat;
    select.appendChild(option);
  }

  );

  // إعادة تعيين الاختيار السابق
  select.value = selectedCategory;
}

function filterQuotes() {
  const filter = document.getElementById('categoryFilter').value;
  selectedCategory = filter;
  saveSelectedCategory(filter);

  const filtered = (filter === 'all') ? quotes : quotes.filter(q => q.category === filter);

  const list = document.getElementById('quoteList');
  list.innerHTML = '';

  filtered.forEach(q => {
    const li = document.createElement('li');
    li.textContent = `"${q.text}" - [${q.category}]`;
    list.appendChild(li);
  });
}

// ===== Initialization =====
document.addEventListener('DOMContentLoaded', () => {
  loadQuotes();
  populateCategories();
  filterQuotes();
});

let quotes = [];
let selectedCategory = 'all';

// Load from localStorage
function loadQuotes() {
  const storedQuotes = localStorage.getItem('quotes');
  if (storedQuotes) {
    quotes = JSON.parse(storedQuotes);
  }

  const storedCategory = localStorage.getItem('selectedCategory');
  if (storedCategory) {
    selectedCategory = storedCategory;
    document.getElementById('categoryFilter').value = storedCategory;
  }
}

// Save quotes
function saveQuotes() {
  localStorage.setItem('quotes', JSON.stringify(quotes));
}

// Save selected category
function saveSelectedCategory(category) {
  localStorage.setItem('selectedCategory', category);
}

// Populate category filter options
function populateCategories() {
  const filter = document.getElementById('categoryFilter');
  const categories = ['all', ...new Set(quotes.map(q => q.category))];

  filter.innerHTML = '';
  categories.forEach(cat => {
    const option = document.createElement('option');
    option.value = cat;
    option.textContent = cat;
    filter.appendChild(option);
  });

  filter.value = selectedCategory;
}

// Add a quote with category
function addQuote(text, category) {
  if (!text || !category) {
    alert('Enter both quote and category');
    return;
  }

  const newQuote = { text, category };
  quotes.push(newQuote);
  saveQuotes();
  populateCategories();
  filterQuotes();
}

// Filter quotes and update display
function filterQuotes() {
  const category = document.getElementById('categoryFilter').value;
  selectedCategory = category;
  saveSelectedCategory(category);

  const display = document.getElementById('quoteDisplay');
  display.innerHTML = '';

  const filtered = category === 'all'
    ? quotes
    : quotes.filter(q => q.category === category);

  if (filtered.length === 0) {
    display.textContent = 'No quotes in this category.';
    return;
  }

  // Display random quote from filtered list
  const randomIndex = Math.floor(Math.random() * filtered.length);
  const quote = filtered[randomIndex];
  display.textContent = `"${quote.text}" — [${quote.category}]`;
}

// On page load
document.addEventListener('DOMContentLoaded', () => {
  loadQuotes();
  populateCategories();
  filterQuotes();
});
