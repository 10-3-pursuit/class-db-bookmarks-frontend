import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import Review from './Review'
import ReviewForm from "./ReviewForm"

const API = import.meta.env.VITE_BASE_URL

function Reviews() {
  const [reviews, setReviews] = useState([])
  let { id } = useParams()

  useEffect(() => {
    fetch(`${API}/bookmarks/${id}/reviews`)
      .then((response) => response.json())
      .then((data) => setReviews(data.allReviews))
  }, [id])

  const handleAdd = (newReview) => {
    fetch(`${API}/bookmarks/${id}/reviews`, {
      method: 'POST',
      body: JSON.stringify(newReview),
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((response) => response.json())
      .then((data) => setReviews([data, ...reviews]))
      .catch((error) => console.error('catch', error))
  }

  const handleDelete = (review_id) => {
    fetch(`${API}/bookmarks/${id}/reviews/${review_id}`, {
      method: 'DELETE',
    })
      .then(
        (response) => {
          const copyReviewArray = [...reviews]
          const indexDeletedReview = copyReviewArray.findIndex((review) => {
            return review.id === id
          })
          copyReviewArray.splice(indexDeletedReview, 1)
          setReviews(copyReviewArray)
        },
        (error) => console.error(error)
      )
      .catch((error) => console.warn('catch', error))
  }

  const handleEdit = (updatedReview) => {
    fetch(`${API}/bookmarks/${id}/reviews/${updatedReview.id}`, {
      method: 'PUT',
      body: JSON.stringify(updatedReview),
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((response) => response.json())
      .then((responseJSON) => {
        const copyReviewArray = [...reviews]
        const indexUpdatedReview = copyReviewArray.findIndex((review) => {
          return review.id === updatedReview.id
        })
        copyReviewArray[indexUpdatedReview] = responseJSON
        setReviews(copyReviewArray)
      })
      .catch((error) => console.error(error))
  }
  

  return (
    <section className="Reviews">
      <h2>Reviews</h2>
      <ReviewForm handleAdd={handleAdd}>
        <h3>Add a New Review</h3>
        {/* <div>Please write a short review</div> */}
      </ReviewForm>
      {reviews.map((review) => (
        <Review key={review.id} review={review} handleDelete={handleDelete} handleEdit={handleEdit} />
      ))}
    </section>
  )
}

export default Reviews