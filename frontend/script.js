// Supabase credentials (Updated with your URL and Anon Key)
const SUPABASE_URL = 'https://cgpwkxvpterwjjmvycmd.supabase.co';[span_0](start_span)[span_0](end_span)
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImNncHdreHZwdGVyd2pqbXZ5Y21kIiwicm9sZSI6ImFub24iLCJpYXQiOjE3OTE2NDY5NjUsImV4cCI6MjEwNzIyMjk2NX0.oDA47jyZfpzvY3IpFAmKyyiSEkkL5m7fUDb4ouPCorc';

// Supabase client initialize kar rahe hain
const supabaseClient = window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

document.addEventListener("DOMContentLoaded", async () => {
    const articlesGrid = document.getElementById("articlesGrid");
    const searchInput = document.getElementById("searchInput");
    const categoryButtons = document.querySelectorAll(".cat-btn");

    let allPosts = [];

    // 1. Supabase database se posts fetch karne ka function
    async function fetchPosts() {
        try {
            const { data, error } = await supabaseClient
                .from('posts')
                .select('*')
                .order('created_at', { ascending: false });

            if (error) {
                console.error("Error fetching posts:", error);
                articlesGrid.innerHTML = `<p style="grid-column: 1 / -1; text-align: center; color: red;">Articles load nahi ho paaye.</p>`;
                return;
            }

            allPosts = data;
            displayArticles(allPosts);
        } catch (err) {
            console.error("Unexpected error:", err);
        }
    }

    // 2. Articles ko website par dikhane ka function
    function displayArticles(posts) {
        if (!posts || posts.length === 0) {
            articlesGrid.innerHTML = `<p style="grid-column: 1 / -1; text-align: center; color: #6b7280;">Abhi koi article nahi hai. Supabase mein naya post add karein!</p>`;
            return;
        }

        articlesGrid.innerHTML = "";
        posts.forEach(post => {
            const articleCard = document.createElement("article");
            articleCard.className = "article-card";
            articleCard.setAttribute("data-category", post.category ? post.category.toLowerCase() : "general");

            articleCard.innerHTML = `
                <div class="card-content">
                    <span class="badge">${post.category || 'General'}</span>
                    <h2>${post.title}</h2>
                    <p class="excerpt">${post.excerpt}</p>
                    <div class="card-footer">
                        <span>New</span>
                        <a href="#" class="read-more">Read Guide &rarr;</a>
                    </div>
                </div>
            `;
            articlesGrid.appendChild(articleCard);
        });
    }

    // Pehle articles load karo
    await fetchPosts();

    // 3. Search Bar Logic
    if (searchInput) {
        searchInput.addEventListener("input", (e) => {
            const query = e.target.value.toLowerCase();
            const filtered = allPosts.filter(post => 
                post.title.toLowerCase().includes(query) || 
                post.excerpt.toLowerCase().includes(query)
            );
            displayArticles(filtered);
        });
    }

    // 4. Category Filter Buttons Logic
    categoryButtons.forEach(button => {
        button.addEventListener("click", () => {
            categoryButtons.forEach(btn => btn.classList.remove("active"));
            button.classList.add("active");

            const selectedCategory = button.getAttribute("data-category");

            if (selectedCategory === "all") {
                displayArticles(allPosts);
            } else {
                const filtered = allPosts.filter(post => 
                    post.category && post.category.toLowerCase() === selectedCategory
                );
                displayArticles(filtered);
            }
        });
    });
});
