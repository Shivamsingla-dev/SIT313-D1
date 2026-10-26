
import { useState } from "react";
import "./NewPost.css";

function NewPost() {
    const [postType, setPostType] = useState("Question");
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [abstract, setAbstract] = useState("");
    const [articleText, setArticleText] = useState("");
    const [tags, setTags] = useState("");

    function handleSubmit(e) {
        e.preventDefault();

        const tagList = tags
            .split(",")
            .map((tag) => tag.trim())
            .filter(Boolean);

        if (tagList.length > 3) {
            alert("Please enter a maximum of 3 tags.");
            return;
        }

        if (postType === "Question" && !description.trim()) {
            alert("Please describe your problem.");
            return;
        }

        if (
            postType === "Article" &&
            (!abstract.trim() || !articleText.trim())
        ) {
            alert("Please complete the abstract and article text.");
            return;
        }

        alert(
            `${postType} submitted successfully! Actual publishing will be implemented in a future task.`
        );
    }

    return (
        <main className="new-post-page">
            <form className="new-post-form" onSubmit={handleSubmit}>
                <h2 className="new-post-heading">New Post</h2>

                <div className="post-type-row">
                    <span className="post-type-label">Select Post Type:</span>

                    <label className="post-radio">
                        <input
                            type="radio"
                            name="postType"
                            value="Question"
                            checked={postType === "Question"}
                            onChange={() => setPostType("Question")}
                        />
                        Question
                    </label>

                    <label className="post-radio">
                        <input
                            type="radio"
                            name="postType"
                            value="Article"
                            checked={postType === "Article"}
                            onChange={() => setPostType("Article")}
                        />
                        Article
                    </label>
                </div>

                <h3 className="post-section-heading">
                    {postType === "Question"
                        ? "What do you want to ask or share"
                        : "What do you want to share"}
                </h3>

                <p className="post-description">
                    {postType === "Question"
                        ? "This section is designed based on the type of post. Describe your problem clearly so others can help."
                        : "Share an informative article with the DEV@Deakin community."}
                </p>

                <div className="post-field">
                    <label htmlFor="post-title">Title</label>
                    <input
                        id="post-title"
                        type="text"
                        placeholder={
                            postType === "Question"
                                ? "Start your question with how, what, why, etc."
                                : "Enter a descriptive title"
                        }
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        required
                    />
                </div>

                {postType === "Question" ? (
                    <div className="post-field">
                        <label htmlFor="problem-description">
                            Describe your problem
                        </label>
                        <textarea
                            id="problem-description"
                            className="question-textarea"
                            placeholder="Explain your problem in detail..."
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            required
                        />
                    </div>
                ) : (
                    <>
                        <div className="post-field">
                            <label htmlFor="article-abstract">Abstract</label>
                            <textarea
                                id="article-abstract"
                                className="abstract-textarea"
                                placeholder="Enter a one-paragraph abstract"
                                value={abstract}
                                onChange={(e) => setAbstract(e.target.value)}
                                required
                            />
                        </div>

                        <div className="post-field">
                            <label htmlFor="article-text">Article Text</label>
                            <textarea
                                id="article-text"
                                className="article-textarea"
                                placeholder="Write your article here..."
                                value={articleText}
                                onChange={(e) => setArticleText(e.target.value)}
                                required
                            />
                        </div>
                    </>
                )}

                <div className="post-field post-tags-field">
                    <label htmlFor="post-tags">Tags</label>
                    <input
                        id="post-tags"
                        type="text"
                        placeholder="Please add up to 3 tags, separated by commas"
                        value={tags}
                        onChange={(e) => setTags(e.target.value)}
                    />
                    <span className="post-help">
                        Enter up to three tags separated by commas, e.g. Java, React
                    </span>
                </div>

                <div className="post-actions">
                    <button type="submit" className="post-button">
                        Post
                    </button>
                </div>
            </form>
        </main>
    );
}

export default NewPost;
