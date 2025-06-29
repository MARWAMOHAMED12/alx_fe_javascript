// مصفوفة من الاقتباسات، كل واحدة عبارة عن نص ونوع
let quotes = [
  { text: "Be yourself; everyone else is already taken.", category: "Inspiration" },
  { text: "So many books, so little time.", category: "Books" },
  { text: "No one can make you feel inferior without your consent.", category: "Motivation" }
];

// وظيفة لعرض اقتباس عشوائي
function showRandomQuote() {
  const randomIndex = Math.floor(Math.random() * quotes.length);
  const quote = quotes[randomIndex];

  // نحدث الـ DOM علشان نعرض الاقتباس
  document.getElementById("quoteDisplay").innerText = `"${quote.text}" - ${quote.category}`;
}

// لما المستخدم يضغط زرار Show New Quote، نشغل الوظيفة
document.getElementById("newQuote").addEventListener("click", showRandomQuote);

// وظيفة لإضافة اقتباس جديد
function addQuote() {
  const text = document.getElementById("newQuoteText").value;
  const category = document.getElementById("newQuoteCategory").value;

  if (text && category) {
    // نضيف الاقتباس للمصفوفة
    quotes.push({ text, category });

    // ننضف الـ inputs
    document.getElementById("newQuoteText").value = "";
    document.getElementById("newQuoteCategory").value = "";

    // نعرض رسالة للمستخدم
    alert("Quote added successfully!");
  } else {
    alert("Please enter both quote text and category.");
  }
}
