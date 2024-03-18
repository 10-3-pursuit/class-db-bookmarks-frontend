import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

// purposely using the word props now so i can distinguish between handleEdit and handleAdd
function ReviewForm({
  reviewDetails,
  handleEdit,
  handleAdd,
  toggleView,
  children,
}) {
  const { id } = useParams();

  const [newOrUpdatedReview, setNewOrUpdatedReview] = useState({
    reviewer: "",
    title: "",
    content: "",
    rating: "",
    bookmark_id: id,
  });

  const handleTextChange = (event) => {
    setNewOrUpdatedReview({
      ...newOrUpdatedReview,
      [event.target.id]: event.target.value,
    });
  };

  useEffect(() => {
    if (reviewDetails) {
      setNewOrUpdatedReview(reviewDetails);
    }
  }, [id, reviewDetails]);

  const handleSubmit = (event) => {
    event.preventDefault();
    //if there are reviewDetails, it means that we are editing, otherwise we are creating a new review.
    // here we are now using the actual function names instead of handleSubmit for both functions
    if (reviewDetails) {
      handleEdit(newOrUpdatedReview, id);
    } else {
      console.log(newOrUpdatedReview);
      handleAdd(newOrUpdatedReview);
    }

    //after i submit, toggle this view back to displaying the review
    if (reviewDetails) {
      toggleView();
    }
    setNewOrUpdatedReview({
      reviewer: "",
      title: "",
      content: "",
      rating: "",
      bookmark_id: id,
    });
  };
  return (
    <div className="Edit">
      {children}
      <form onSubmit={handleSubmit}>
        <label htmlFor="reviewer">Name:</label>
        <input
          id="reviewer"
          value={newOrUpdatedReview.reviewer}
          type="text"
          onChange={handleTextChange}
          placeholder="Your name"
          required
        />
        <label htmlFor="title">Title:</label>
        <input
          id="title"
          type="text"
          required
          value={newOrUpdatedReview.title}
          onChange={handleTextChange}
        />
        <label htmlFor="rating">Rating:</label>
        <input
          id="rating"
          type="number"
          name="rating"
          min="0"
          max="5"
          step="1"
          value={newOrUpdatedReview.rating}
          onChange={handleTextChange}
        />
        <label htmlFor="content">Review:</label>
        <textarea
          id="content"
          type="text"
          name="content"
          value={newOrUpdatedReview.content}
          placeholder="What do you think..."
          onChange={handleTextChange}
        />

        <br />

        <input type="submit" />
      </form>
    </div>
  );
}

export default ReviewForm;
