import { useState, useEffect } from "react";
import Bookmark from "./Bookmark";

const API = import.meta.env.VITE_BASE_URL;

function Bookmarks() {
  const [bookmarks, setBookmarks] = useState([]);
  useEffect(() => {
    fetch(`${API}/bookmarks`)
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        setBookmarks(data);
      })
      .catch((error) => console.error(error));
  }, []);

  return (
    <div className="Bookmarks">
      <section>
        <table>
          <thead>
            <tr>
              <th></th>
              <th>Take me there</th>
              <th>See this bookmark</th>
            </tr>
          </thead>
          <tbody>
            {bookmarks.map((bookmark) => {
              return <Bookmark key={bookmark.id} bookmark={bookmark} />;
            })}
          </tbody>
        </table>
      </section>
    </div>
  );
}

export default Bookmarks;
