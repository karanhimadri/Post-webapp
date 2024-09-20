import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import Loading from "./Loading";
import dbService from "../AuthService/DB";
import { updatePosts } from "../store/PostSlice";
import "../App.css"

function Home() {
  const [loading, setLoading] = useState(false);
  const { status, userData } = useSelector((store) => store.authStore);
  const { postsData } = useSelector((store) => store.postsStore);
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchPosts = async () => {
      console.log("OK");
      setLoading(true);
      try {
        const response = await dbService.getPosts(userData);
        dispatch(updatePosts(response.documents)); // Dispatch posts to Redux
      } catch (err) {
        console.error("Error fetching posts:", err);
      } finally {
        setLoading(false); // Always stop loading once the fetch is done
      }
    };

    // if (status && postsData.length === 0) {
    //   fetchPosts(); // Fetch posts only if logged in and postsData is empty
    // }
    fetchPosts()
    console.log(postsData);
  }, [status, userData, dispatch]);

  return (
    <>
      {status ? (
        loading ? (
          <Loading />
        ) : (
          <div className="user-posts">
            <h2 className="user-posts-title">Your Posts</h2>
            {postsData.length === 0 ? (
              <p className="user-posts-empty">No posts found</p>
            ) : (
              <ul className="user-posts-list">
                {postsData.map((post) => (
                  <li key={post.$id} className="user-posts-item">
                    {post.featureImage && (
                      <img
                        src={dbService.getFilePreview(`${post.featureImage}`)}
                        alt={post.title}
                        className="user-posts-item-image"
                      />
                    )}
                    <h3 className="user-posts-item-title">{post.title}</h3>
                    <p className="user-posts-item-content">{post.content}</p>
                  </li>
                ))}
              </ul>
            )}
          </div>
        )
      ) : (
        <div className="create-post-hk">
          <h2>You must be logged in to show your posts.</h2>
        </div>
      )}
    </>
  );
}

export default Home;
