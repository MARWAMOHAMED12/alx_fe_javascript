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
