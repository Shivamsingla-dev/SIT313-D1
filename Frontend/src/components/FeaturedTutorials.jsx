import TutorialCard from "./TutorialCard";

const tutorials = [
    {
        id: 1,
        title: "React Basics",
        description: "Learn about components and the basic structure of React.",
        rating: 5,
        username: "Dhruv",
        image:
            "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=600&q=80",
    },
    {
        id: 2,
        title: "JavaScript Tutorial",
        description: "A simple tutorial covering important JavaScript concepts.",
        rating: 4.9,
        username: "Harsh",
        image:
            "https://images.unsplash.com/photo-1516116216624-53e697fedbea?auto=format&fit=crop&w=600&q=80",
    },
    {
        id: 3,
        title: "Express.js Basics",
        description: "Get started with routes and applications using Express.js.",
        rating: 4.8,
        username: "Dev",
        image:
            "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=600&q=80",
    },
];

function FeaturedTutorials() {
    return (
        <section className="section" id="tutorials">
            <h2>Featured Tutorials</h2>

            <div className="cards">
                {tutorials.map((tutorial) => (
                    <TutorialCard key={tutorial.id} tutorial={tutorial} />
                ))}
            </div>

            <button className="view-button">See all tutorials</button>
        </section>
    );
}

export default FeaturedTutorials;