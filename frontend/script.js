document.addEventListener("DOMContentLoaded", () => {
    const searchInput = document.getElementById("searchInput");
    const categoryButtons = document.querySelectorAll(".cat-btn");
    const articles = document.querySelectorAll(".article-card");

    // Search Filter Logic
    if (searchInput) {
        searchInput.addEventListener("input", (e) => {
            const query = e.target.value.toLowerCase();
            articles.forEach(article => {
                const text = article.innerText.toLowerCase();
                if (text.includes(query)) {
                    article.style.display = "flex";
                } else {
                    article.style.display = "none";
                }
            });
        });
    }

    // Category Filter Logic
    categoryButtons.forEach(button => {
        button.addEventListener("click", () => {
            categoryButtons.forEach(btn => btn.classList.remove("active"));
            button.classList.add("active");

            const selectedCategory = button.getAttribute("data-category");

            articles.forEach(article => {
                const articleCategory = article.getAttribute("data-category");
                if (selectedCategory === "all" || articleCategory === selectedCategory) {
                    article.style.display = "flex";
                } else {
                    article.style.display = "none";
                }
            });
        });
    });
});
