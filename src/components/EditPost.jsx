import { useEffect, useState } from "react";

function EditPost({ Post, setEditPostId, handleEditComponent }) {
  const [editFormData, setEditFormData] = useState({
    title: "",
    content: "",
  });

  useEffect(() => {
    setEditFormData({ title: Post.title, content: Post.content });
  }, [Post]);

  function handleEditData(e) {
    setEditFormData({ ...editFormData, [e.target.name]: e.target.value });
  }
  function handleSubmit(e) {
    e.preventDefault();
    handleEditComponent(editFormData);
    setEditPostId(null);
  }

  return (
    <>
      <div className="create-post-container">
        <form onSubmit={handleSubmit} className="create-post-form">
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
          <button type="submit" className="submit-button">
            Save
          </button>
          <button
            onClick={() => setEditPostId(null)}
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
