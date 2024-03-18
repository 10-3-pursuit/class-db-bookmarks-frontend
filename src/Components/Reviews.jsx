// src/Reviews.jsx
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Review from "./Review";
import ReviewForm from "./ReviewForm";

const API = import.meta.env.VITE_BASE_URL;

function Reviews() {
  const [reviews, setReviews] = useState([]);
  let { id } = useParams();

  const handleDelete = (id) => {
    fetch(`${API}/bookmarks/${id}/reviews/${id}`, { method: "DELETE" })
      .then((res) => res.json())
      .then(() => {
        const copyReviewArray = [...reviews];
        const indexDeletedReview = copyReviewArray.findIndex((review) => {
          return review.id === id;
        });
        copyReviewArray.splice(indexDeletedReview, 1);
        setReviews(copyReviewArray);
      })
      .catch((err) => console.log(err));
  };

  const handleAdd = (newReview) => {
    console.log("review", newReview);
    const options = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newReview),
    };

    fetch(`${API}/bookmarks/${id}/reviews`, options)
      .then((res) => res.json())
      .then((data) => setReviews([data, ...reviews]))
      .catch((err) => console.log(err));
  };

  const handleEdit = (updatedReview) => {
    const options = {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(updatedReview),
    };
    fetch(`${API}/bookmarks/${id}/reviews/${updatedReview.id}`, options)
      .then((res) => res.json())
      .then((data) => {
        const copyReviewArray = [...reviews];
        const indexUpdatedReview = copyReviewArray.findIndex((review) => {
          return review.id === updatedReview.id;
        });
        copyReviewArray[indexUpdatedReview] = data;
        setReviews(copyReviewArray);
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    fetch(`${API}/bookmarks/${id}/reviews`)
      .then((response) => response.json())
      .then((response) => {
        setReviews(response.allReviews);
      });
  }, [id]);

  return (
    <section className="Reviews">
      <h2>Reviews</h2>
      <ReviewForm handleAdd={handleAdd}>
        <h3>Add a New Review</h3>
      </ReviewForm>
      {console.log("reviews", reviews)}
      {reviews.map((review) => (
        <Review
          key={review.id}
          review={review}
          handleAdd={handleAdd}
          handleEdit={handleEdit}
          handleDelete={handleDelete}
        />
      ))}
    </section>
  );
}

export default Reviews;
