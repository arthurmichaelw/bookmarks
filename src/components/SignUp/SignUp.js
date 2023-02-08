export default function SignUp ({
    credentials,
    signUp,
    handleChangeAuth
  }) {
    return (
      <div>
        <form onSubmit={(e) => {
          e.preventDefault()
          signUp()
        }}
        >
          <input type='text' value={credentials.email} name='email' onChange={handleChangeAuth} placeholder='Email' />
          <input type='text' value={credentials.name} name='name' onChange={handleChangeAuth} placeholder='Name' />
          <input type='password' value={credentials.password} name='password' onChange={handleChangeAuth} placeholder='password' />
          <input type='submit' id="sign-up-button" value='Sign Up' />
        </form>
      </div>
    )
  }