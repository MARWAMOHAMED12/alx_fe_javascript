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
