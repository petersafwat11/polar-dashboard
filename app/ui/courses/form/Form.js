"use client";
import React, { useState, useCallback, memo } from "react";
import classes from "./form.module.css";
import CourseCategory from "../course-category/CourseCategory";
import InputGroup from "../../settings/inputGroup/InputGroup";
import { inter } from "@/app/fonts";
import SaveBtn from "../../saveBtn/SaveBtn";
import DeleteBtn from "../../deleteBtn/DeleteBtn";
import { deleteItem, saveItem } from "@/app/lib/createPages";
import { usePathname, useRouter } from "next/navigation";

const TextArea = memo(
  ({ label, field, placeholder, formData, setFormData }) => {
    const handleInputChange = (field, value) => {
      setFormData({ ...formData, [field]: value });
    };

    return (
      <div className={classes[label.toLowerCase().replace(/\s+/g, "-")]}>
        <h3 className={classes["title"]}>{label}</h3>
        <textarea
          placeholder={placeholder}
          className={`${inter.className} ${classes["text-area"]}`}
          value={formData[field]}
          onChange={(e) => {
            handleInputChange(field, e.target.value);
          }}
        />
      </div>
    );
  }
);

TextArea.displayName = "TextArea";

const ReviewItem = memo(({ review, index, onUpdate, onDelete }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editData, setEditData] = useState(review);

  const handleSave = () => {
    onUpdate(index, editData);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setEditData(review);
    setIsEditing(false);
  };

  return (
    <div className={classes["review-item"]}>
      {isEditing ? (
        <div className={classes["review-edit"]}>
          <input
            type="text"
            placeholder="Reviewer Name"
            value={editData.reviewerName}
            onChange={(e) =>
              setEditData({ ...editData, reviewerName: e.target.value })
            }
            className={classes["review-input"]}
          />
          <textarea
            placeholder="Review Text"
            value={editData.review}
            onChange={(e) =>
              setEditData({ ...editData, review: e.target.value })
            }
            className={classes["review-textarea"]}
          />
          <input
            type="number"
            placeholder="Rating (1-5)"
            min="1"
            max="5"
            value={editData.rating}
            onChange={(e) =>
              setEditData({ ...editData, rating: parseInt(e.target.value) })
            }
            className={classes["review-input"]}
          />
          <div className={classes["review-actions"]}>
            <button onClick={handleSave} className={classes["save-btn"]}>
              Save
            </button>
            <button onClick={handleCancel} className={classes["cancel-btn"]}>
              Cancel
            </button>
          </div>
        </div>
      ) : (
        <div className={classes["review-display"]}>
          <div className={classes["review-header"]}>
            <span className={classes["reviewer-name"]}>
              {review.reviewerName}
            </span>
            <span className={classes["rating"]}>★ {review.rating}/5</span>
          </div>
          <p className={classes["review-text"]}>{review.review}</p>
          <div className={classes["review-actions"]}>
            <button
              onClick={() => setIsEditing(true)}
              className={classes["edit-btn"]}
            >
              Edit
            </button>
            <button
              onClick={() => onDelete(index)}
              className={classes["delete-btn"]}
            >
              Delete
            </button>
          </div>
        </div>
      )}
    </div>
  );
});

ReviewItem.displayName = "ReviewItem";

const ReviewsSection = memo(({ reviews, setFormData, formData }) => {
  const [showAddForm, setShowAddForm] = useState(false);
  const [newReview, setNewReview] = useState({
    reviewerName: "",
    review: "",
    rating: 5,
  });

  const addReview = () => {
    if (newReview.reviewerName && newReview.review && newReview.rating) {
      const updatedReviews = [...reviews, newReview];
      setFormData({ ...formData, reviews: updatedReviews });
      setNewReview({ reviewerName: "", review: "", rating: 5 });
      setShowAddForm(false);
    }
  };

  const updateReview = (index, updatedReview) => {
    const updatedReviews = [...reviews];
    updatedReviews[index] = updatedReview;
    setFormData({ ...formData, reviews: updatedReviews });
  };

  const deleteReview = (index) => {
    const updatedReviews = reviews.filter((_, i) => i !== index);
    setFormData({ ...formData, reviews: updatedReviews });
  };

  return (
    <div className={classes["reviews-section"]}>
      <h3 className={classes["title"]}>Reviews</h3>

      <div className={classes["reviews-list"]}>
        {reviews.map((review, index) => (
          <ReviewItem
            key={index}
            review={review}
            index={index}
            onUpdate={updateReview}
            onDelete={deleteReview}
          />
        ))}
      </div>

      {!showAddForm ? (
        <button
          onClick={() => setShowAddForm(true)}
          className={classes["add-review-btn"]}
        >
          Add Review
        </button>
      ) : (
        <div className={classes["add-review-form"]}>
          <input
            type="text"
            placeholder="Reviewer Name"
            value={newReview.reviewerName}
            onChange={(e) =>
              setNewReview({ ...newReview, reviewerName: e.target.value })
            }
            className={classes["review-input"]}
          />
          <textarea
            placeholder="Review Text"
            value={newReview.review}
            onChange={(e) =>
              setNewReview({ ...newReview, review: e.target.value })
            }
            className={classes["review-textarea"]}
          />
          <input
            type="number"
            placeholder="Rating (1-5)"
            min="1"
            max="5"
            value={newReview.rating}
            onChange={(e) =>
              setNewReview({ ...newReview, rating: parseInt(e.target.value) })
            }
            className={classes["review-input"]}
          />
          <div className={classes["review-actions"]}>
            <button onClick={addReview} className={classes["save-btn"]}>
              Save Review
            </button>
            <button
              onClick={() => setShowAddForm(false)}
              className={classes["cancel-btn"]}
            >
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  );
});

ReviewsSection.displayName = "ReviewsSection";

const Form = ({ data }) => {
  const pathname = usePathname();
  const router = useRouter();

  // Updated to match backend model structure
  const defaultData = {
    category: "",
    title: "",
    details: "",
    description: "",
    price: "",
    discount: "0",
    level: "Beginner",
    reviews: [],
  };

  const [formData, setFormData] = useState(
    data
      ? {
          category: data.category || "",
          title: data.title || "",
          details: data.details || "",
          description: data.description || "",
          price: data.price || "",
          discount: data.discount || "0",
          level: data.level || "Beginner",
          reviews: data.reviews || [],
        }
      : defaultData
  );

  const deletepage = async () => {
    deleteItem(pathname, router, "courses");
  };

  const saveChanges = () => {
    // Transform data to match backend expectations
    saveItem(pathname, formData, setFormData, defaultData, router, "courses");
  };

  const handleDiscountChange = (value) => {
    const numValue = parseInt(value);
    if (numValue >= 0 && numValue <= 99) {
      setFormData({ ...formData, discount: value });
    }
  };

  return (
    <div className={`${inter.className} ${classes["container"]}`}>
      <div className={classes["first-row"]}>
        <div className={classes["category"]}>
          <CourseCategory
            data={{ courseCategory: formData.category }}
            setData={(newData) =>
              setFormData({ ...formData, category: newData.courseCategory })
            }
          />
        </div>

        <TextArea
          label="Course Title"
          field="title"
          placeholder="Enter Course Title"
          formData={formData}
          setFormData={setFormData}
        />

        <TextArea
          label="Course Details"
          field="details"
          placeholder="Enter Course Details"
          formData={formData}
          setFormData={setFormData}
        />
        <TextArea
          label="Course Description"
          field="description"
          placeholder="Enter Course Description"
          formData={formData}
          setFormData={setFormData}
        />
      </div>

      <div className={classes["second-row"]}>
        <div className={classes["price-discount"]}>
          <InputGroup
            placeHolder="Please enter the Course Price"
            id="price"
            type="text"
            label="Course Price"
            data={formData}
            dataKey="price"
            setData={setFormData}
          />

          <div className={classes["discount-field"]}>
            <h3 className={classes["title"]}>Discount (%)</h3>
            <input
              type="number"
              min="0"
              max="99"
              placeholder="Enter discount percentage (0-99)"
              value={formData.discount}
              onChange={(e) => handleDiscountChange(e.target.value)}
              className={classes["discount-input"]}
            />
          </div>
        </div>

        <div className={classes["level-field"]}>
          <InputGroup
            placeHolder="Enter course level (e.g., Beginner, Intermediate, Advanced)"
            id="level"
            type="text"
            label="Course Level"
            data={formData}
            dataKey="level"
            setData={setFormData}
          />
        </div>
      </div>

      <div className={classes["third-row"]}>
        <ReviewsSection
          reviews={formData.reviews}
          setFormData={setFormData}
          formData={formData}
        />
      </div>

      <div className={classes["actions"]}>
        <SaveBtn saveChanges={saveChanges} />
        <DeleteBtn deletepage={deletepage} />
      </div>
    </div>
  );
};

export default Form;
