import { useState, useEffect } from 'react'
import Login from '../Login/Login'
import SignUp from '../SignUp/SignUp'
export default function Auth ({
  token,
  login,
  signUp,
  credentials,
  handleChangeAuth
}) {
  const [showSignUp, setShowSignUp] = useState(true)
  const [user, setUser] = useState()

  useEffect(() => {
    const getToken = () => {
      const token = window.localStorage.getItem('token')
      if (!token || token === 'null' || token === 'undefined') return null
      const payload = JSON.parse(window.atob(token.split('.')[1]))
      if (payload.exp < Date.now() / 1000) {
        window.localStorage.removeItem('token')
        return null
      }
      return token
    }
    const token = getToken()
    const data = token ? JSON.parse(window.atob(token.split('.')[1])).user : null
    setUser(data)
  }, [token])
  return (
    <>
      {
            user && user.name
              ? <div id="user-name">
                <h1>Welcome {user.name.toUpperCase()}</h1>
                </div>
              : <div id="sign-up-container">
                {
                  showSignUp
                    ? <div>
                      <h2 className="sign-up-title">Sign Up</h2>
                        <SignUp
                          signUp={signUp}
                          credentials={credentials}
                          handleChangeAuth={handleChangeAuth}
                        />
                  <h2 className="sign-up-title">Already have an Account?</h2>
                        <button id="login-button"
                  onClick={() => {
                    setShowSignUp(!showSignUp)
                  }}
                >
                  {showSignUp ? 'Login' : 'Welcome Back, Login As An Existing User or Click Here To Sign Up With A New Account'}
                </button>
                        </div>
                      : <Login
                          login={login}
                          credentials={credentials}
                          handleChangeAuth={handleChangeAuth}
                        />
                }
              </div>
        }

    </>
  )
}