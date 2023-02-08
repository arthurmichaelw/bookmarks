export default function CreateBookmark ({
    createBookmark,
    bookmark,
    handleChange
  }) {
    return (
      <>
      <div id="create-bookmark">
        <h2 id="create-bookmark-title">Create A Bookmark</h2>
        <form id="create-bookmark-form" onSubmit={(e) => {
          e.preventDefault()
          createBookmark()
        }}
        >
          <input type='text' value={bookmark.title} name='title' onChange={handleChange} placeholder='Title' />
          <input type='text' value={bookmark.url} name='url' onChange={handleChange} placeholder='URL' />
          <input type='submit' id="create-button" value='Create Bookmark' />
        </form>
        </div>
      </>
    )
  }