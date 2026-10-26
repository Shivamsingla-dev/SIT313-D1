import ArticleCard from "./ArticleCard";

const articles = [
    {
        id: 1,
        title: "Introduction to React",
        description: "Learn the basics of React components and how they work.",
        rating: 5,
        author: "Shivam",
        image:
            "https://images.unsplash.com/photo-1633356122544-f134324a6cee?auto=format&fit=crop&w=600&q=80",
    },
    {
        id: 2,
        title: "Learning JavaScript",
        description: "Understand the main concepts used in modern JavaScript.",
        rating: 4.8,
        author: "vansh",
        image:
            "https://images.unsplash.com/photo-1627398242454-45a1465c2479?auto=format&fit=crop&w=600&q=80",
    },
    {
        id: 3,
        title: "Web Development",
        description: "Explore some useful ideas for building web applications.",
        rating: 4.9,
        author: "Shaurya",
        image:
            "https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=600&q=80",
    },
];

function FeaturedArticles() {
    return (
        <section className="section" id="articles">
            <h2>Featured Articles</h2>

            <div className="cards">
                {articles.map((article) => (
                    <ArticleCard key={article.id} article={article} />
                ))}
            </div>

            <button className="view-button">See all articles</button>
        </section>
    );
}

export default FeaturedArticles;