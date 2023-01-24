import { useState, useEffect } from ' react'

export default function App(){
  // Login, SignUp, CreateBookmark, ListBookmarkByUser, DeleteBookmark, UpdateBookmark

const [credentials, setCredentials] = useStat({
  email: '',
  password: '',
  name: ''
})
const [bookmark, setBookmark] = useState({
  title: '',
  url: ''
})
const [bookmarks, setBookmarks] = useState([])
const [token, setToken] = useState('')
const login = async () => {
  try {
    const response = await fetch('/api/users/login', {
      method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ email: credentials.email, password: credentials.password })
  })
  const tokenResponse = await response.json()
  setToken(tokenResponse)
  localStorage.setItem('token', JSON.stringify(tokenResponse))
 } catch (error) {
    console.error(error)
  }
}
const signUp = async () => {
  try {
    const response = await fetch('/api/users', {
      method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ ...credentials })
  })
  const tokenResponse = await response.json()
  setToken(tokenResponse)
  localStorage.setItem('token', JSON.stringify(tokenResponse))
 } catch (error) {
    console.error(error)
  }
}
const createBookmark = async () => {
  try {
    const response = await fetch('/api/bookmarks', {
      method : 'POST',
      headers: {
        'Content-Type': 'applicatioin/json',
        Authorization : `Bearer ${token}`
      },
      body : JSON.stringify({...bookmark})
    })
    const data = await response.json
    setBookmarks([data, ...bookmarks])
    setBookmark({
      title: '',
      url: ''
    })

  } catch (error) {
      console.error(error)
  }
}
const listBookmarkByUser = async () => {
  try {
    const response = await fetch('/api/users/bookmarks')
    const data = await response.json()
    setBookmarks(data)
  } catch (error) {
    console.error(error)
  }
}
const deleteBookmark = async(id) => {
  try {
    const response = await fetch(`/api/bookmarks/${id}`, {
      method: 'DELETE',
      header: {
        'Content-Type': 'application.json',
        Authorization: `Bearer ${token}`
      }
    })
    const data = await response.json()
    const bookmarksCopy = [...bookmarks]
    const index = bookmarksCopy.findIndex( bookmark => id === bookmark.id )
    bookmarksCopy.splice(index, 1)
    setBookmarks(bookmarksCopy)
  } catch (error) {
    console.error(error)
  }
}
const updateBookmark = async(id, updatedData) => {
  try {
    const response = await fetch(`/api/bookmarks/${id}`, {
      method: 'PUT',
      header: {
        'Content-Typ': 'application/json',
        Authorization: `Bearer ${token}`
    
      },
      body: JSON.stringify(updatedData)
    })
    const data = await response.json()
    const bookmarksCopy = [...bookmarks]
    const index = bookmarksCopy.findIndex( bookmark => id === bookmark.id )
    bookmarksCopy[index] = {...bookmarksCopy[index], ...updatedData}
    setBookmarks(bookmarksCopy)
  } catch (error) {
    console.error(error)
  }
}

useEffect(() => {
  listBookmarkByUser()
}, [])

  return (
    <>
    <ul>
      { bookmarks.length ? bookmarks.map(item => (
        <li key={item.id}>
          <h4>{item.title}</h4>
          <a href={item.url} target='_blank'>{item.url}</a>
        </li>
      )): <>No Bookmarks Added</>}
    </ul>
    </>
  )
}