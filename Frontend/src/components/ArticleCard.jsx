function ArticleCard({ article }) {
    return (
        <div className="card">
            <img src={article.image} alt={article.title} />

            <div className="card-details">
                <h3>{article.title}</h3>
                <p>{article.description}</p>

                <div className="card-footer">
                    <span>★ {article.rating}</span>
                    <span>{article.author}</span>
                </div>
            </div>
        </div>
    );
}

export default ArticleCard;