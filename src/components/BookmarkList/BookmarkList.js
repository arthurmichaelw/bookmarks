import Bookmark from '../Bookmark/Bookmark'

export default function BookmarkList ({
  bookmarks,
  updateBookmark,
  deleteBookmark
}) {
  return (
    <div id="bookmark-list">
    <ul>
      {
            bookmarks.length
              ? bookmarks.map(bookmark => (
                <Bookmark
                  key={bookmark._id}
                  bookmark={bookmark}
                  updateBookmark={updateBookmark}
                  deleteBookmark={deleteBookmark}
                />
              ))
              : <li>
                <h2 id="no-bookmark">No Bookmarks Yet... Add one in the Form Above</h2>
                </li>
        }
    </ul>
    </div>
  )
}