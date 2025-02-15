const apiKey = "50e4651a3ccd497c867cba2e19369059";

const blogContainerEl = document.querySelector("#blog-container");

const searchInputEl = document.querySelector("#search-input");
const searchButtonEl = document.querySelector("#search-button");

async function fetchRandomNews() {
  try {
    const apiUrl = `https://newsapi.org/v2/top-headlines?country=us&pageSize=12&apikey=${apiKey}`;

    const response = await fetch(apiUrl);
    const data = await response.json();

    return data.articles;
  } catch (error) {
    console.error("Error fetching random news", error);
    return [];
  }
}

searchButtonEl.addEventListener("click", async () => {
  const query = searchInputEl.value.trim();
  if (query !== "") {
    try {
      const articles = await fetchNewsQuery(query);
      displayBlogs(articles);
    } catch (error) {
      return "Error fetching news by query", error;
    }
  }
});

async function fetchNewsQuery(query) {
  try {
    const apiUrl = `https://newsapi.org/v2/everything?q=${query}&pageSize=12&apikey=${apiKey}`;

    const response = await fetch(apiUrl);
    const data = await response.json();

    return data.articles;
  } catch (error) {
    console.log("Error fetching random news", error);
    return [];
  }
}

function displayBlogs(articles) {
  blogContainerEl.innerHTML = "";
  articles.forEach((article) => {
    const blogCard = document.createElement("div");
    blogCard.classList.add("blog-card");

    const img = document.createElement("img");
    img.src = article.urlToImage;
    img.alt = article.title;
    const title = document.createElement("h2");

    const truncatedTitle =
      article.title.length > 30
        ? article.title.slice(0, 30) + "..."
        : article.title;
    title.textContent = truncatedTitle;

    const description = document.createElement("p");

    const truncatedDes =
      article.description.length > 150
        ? article.description.slice(0, 150) + "..."
        : article.description;
    description.textContent = truncatedDes;

    description.textContent = article.description;

    blogCard.appendChild(img);
    blogCard.appendChild(title);
    blogCard.appendChild(description);

    blogCard.addEventListener("click", () => {
      window.open(article.url, "_blank");
    });

    blogContainerEl.appendChild(blogCard);
  });
}

(async () => {
  try {
    const articles = await fetchRandomNews();
    displayBlogs(articles);
  } catch (error) {
    return "Error fetching random news", error;
  }
})();
