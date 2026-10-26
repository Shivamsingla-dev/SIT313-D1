function TutorialCard({ tutorial }) {
    return (
        <div className="card">
            <img src={tutorial.image} alt={tutorial.title} />

            <div className="card-details">
                <h3>{tutorial.title}</h3>
                <p>{tutorial.description}</p>

                <div className="card-footer">
                    <span>★ {tutorial.rating}</span>
                    <span>{tutorial.username}</span>
                </div>
            </div>
        </div>
    );
}

export default TutorialCard;