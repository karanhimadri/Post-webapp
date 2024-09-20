import { useState, useEffect } from "react";

function EditPost({
  Post,
  setEditPostId,
  handleEditComponent,
}) {
  // Manage form data and selected image state
  const [editFormData, setEditFormData] = useState({
    title: "",
    content: "",
  });
  // const [newImage, setNewImage] = useState(null);
  // const [oldImageId, setOldImageId] = useState(null);

  // Populate form with post data when the component is rendered or when Post changes
  useEffect(() => {
    setEditFormData({ title: Post.title, content: Post.content });
    //setOldImageId(Post.featureImage);
  }, [Post]);

  // Handle form data changes for title and content
  function handleEditData(e) {
    setEditFormData({ ...editFormData, [e.target.name]: e.target.value });
  }

  // Handle New image file selection
  // function handleImageChange(e) {
  //   const file = e.target.files[0];
  //   setNewImage(file);
  // }

  // Handle form submission
  async function handleSubmit(e) {
    e.preventDefault();
    handleEditComponent(editFormData);
    //handleImageUpdation(newImage, oldImageId);
    // Reset form by clearing the edit post ID
    setEditPostId(null);
  }

  // Reset the form data and selected image when cancel is clicked
  function handleCancel() {
    setEditPostId(null); // Close the edit form
    setEditFormData({ title: "", content: "" }); // Clear form data
  }

  return (
    <>
      <div className="create-post-container">
        <form onSubmit={handleSubmit} className="create-post-form">
          {/* Title Input */}
          <div className="form-group">
            <label htmlFor="title">Title</label>
            <input
              type="text"
              id="title"
              name="title"
              value={editFormData.title}
              placeholder="Enter post title"
              onChange={handleEditData}
              required
            />
          </div>

          {/* Content Input */}
          <div className="form-group">
            <label htmlFor="content">Content</label>
            <textarea
              id="content"
              name="content"
              value={editFormData.content}
              placeholder="Enter post content"
              onChange={handleEditData}
              required
            />
          </div>

          {/* <div className="form-group">
            <label htmlFor="image">Upload Image</label>
            <input
              type="file"
              id="image"
              name="image"
              accept="image/*"
              onChange={handleImageChange}
            />
            {newImage && (
              <div className="image-preview">
                <img
                  src={URL.createObjectURL(newImage)}
                  alt="Selected Preview"
                  className="image-preview-img"
                />
              </div>
            )}
          </div> */}

          {/* Save and Cancel Buttons */}
          <button type="submit" className="submit-button">
            Save
          </button>
          <button
            onClick={handleCancel}
            style={{ marginTop: "10px" }}
            type="button"
            className="btn btn-danger"
          >
            Cancel
          </button>
        </form>
      </div>
    </>
  );
}

export default EditPost;
