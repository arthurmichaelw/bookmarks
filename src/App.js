import { useState, useEffect } from 'react'

export default function App(){
  // Login, SignUp, CreateBookmark, ListBookmarkByUser, DeleteBookmark, UpdateBookmark

const handleChangeAuth = (event) => {
  setCredentials({...credentials, [event.target.name]: event.target.value })
}
const handleChange = (event) => {
  setBookmark({ ...bookmark, [event.target.name]: event.target.value })
}
const [credentials, setCredentials] = useState({
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
  const tokenData = localStorage.getItem('token')
  if(tokenData && tokenData !== 'null' && tokenData !== 'undefined'){
    listBookmarkByUser()
  }
}, [])

useEffect(() => {
  const tokenData = localStorage.getItem('token')
  if(tokenData && tokenData !== 'null' && tokenData !== 'undefined'){
    setToken(tokenData)
  }
}, [])

  return (
    <>
    <h2>Login</h2>
    <form onSubmit={(e) => {
      e.preventDefault()
      login()
    }}>
      <input type="text" value={credentials.email} name="email" onChange={handleChangeAuth} placeholder={'Email'}></input>
      <input type="password" value={credentials.password} name="password" onChange={handleChangeAuth} placeholder={'Password'}></input>
      <input type="submit" value="Login as an existing user"/>
    </form>
    <h2>Sign Up</h2>
    <form onSubmit={(e) => {
      e.preventDefault()
      signUp()
    }}>
      <input type="text" value={credentials.email} name="email" onChange={handleChangeAuth} placeholder={'Email'}></input>
      <input type="text" value={credentials.name} name="name" onChange={handleChangeAuth} placeholder={'Name'}></input>
      <input type="password" value={credentials.password} name="password" onChange={handleChangeAuth} placeholder={'Password'}></input>
      <input type="submit" value="Sign up as a new user"/>
    </form>
    <h2>Create A Bookmark</h2>
    <form onSubmit={(e) => {
      e.preventDefault()
      createBookmark()
    }}>
      <input type="text" value={bookmark.title} name="title" onChange={handleChange} placeholder={'Title'}></input>
      <input type="text" value={bookmark.url} name="url" onChange={handleChange} placeholder={'URL'}></input>
      <input type="submit" value="Create Bookmark"/>
    </form>
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