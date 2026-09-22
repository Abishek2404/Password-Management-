import {Component} from 'react'
import './index.css'

class PasswordManager extends Component {
  state = {
    website: '',
    username: '',
    password: '',
    searchInput: '',
    showPassword: false,
    passwordsList: [],
  }

  onChangeWebsite = event => {
    this.setState({
      website: event.target.value,
    })
  }

  onChangeUsername = event => {
    this.setState({
      username: event.target.value,
    })
  }

  onChangePassword = event => {
    this.setState({
      password: event.target.value,
    })
  }

  onChangeSearchInput = event => {
    this.setState({
      searchInput: event.target.value,
    })
  }

  onChangeShowPassword = event => {
    this.setState({
      showPassword: event.target.checked,
    })
  }

  onAddPassword = event => {
    event.preventDefault()

    const {website, username, password} = this.state

    if (
      website.trim() !== '' &&
      username.trim() !== '' &&
      password.trim() !== ''
    ) {
      const newPassword = {
        id: Date.now(),
        website,
        username,
        password,
      }

      this.setState(prevState => ({
        passwordsList: [...prevState.passwordsList, newPassword],
        website: '',
        username: '',
        password: '',
      }))
    }
  }

  onDeletePassword = id => {
    const {passwordsList} = this.state

    const updatedPasswordsList = passwordsList.filter(
      eachPassword => eachPassword.id !== id,
    )

    this.setState({
      passwordsList: updatedPasswordsList,
    })
  }

  getFilteredPasswords = () => {
    const {passwordsList, searchInput} = this.state

    return passwordsList.filter(eachPassword => {
      const {website} = eachPassword

      return website.toLowerCase().includes(searchInput.toLowerCase())
    })
  }

  renderPasswordItem = eachPassword => {
    const {showPassword} = this.state
    const {id, website, username, password} = eachPassword

    return (
      <li className="password-item" key={id}>
        <div className="password-icon">{website.charAt(0).toUpperCase()}</div>

        <div className="password-details">
          <p className="website-text">{website}</p>
          <p className="username-text">{username}</p>

          {showPassword ? (
            <p className="password-text">{password}</p>
          ) : (
            <img
              src="https://assets.ccbp.in/frontend/react-js/password-manager-stars-img.png"
              alt="stars"
              className="stars-image"
            />
          )}
        </div>

        <button
          type="button"
          className="delete-button"
          data-testid="delete"
          onClick={() => this.onDeletePassword(id)}
        >
          <img
            src="https://assets.ccbp.in/frontend/react-js/password-manager-delete-img.png"
            alt="delete"
            className="delete-image"
          />
        </button>
      </li>
    )
  }

  renderNoPasswordsView = () => (
    <div className="no-passwords-container">
      <img
        src="https://assets.ccbp.in/frontend/react-js/no-passwords-img.png"
        alt="no passwords"
        className="no-passwords-image"
      />
      <p className="no-passwords-text">No Passwords</p>
    </div>
  )

  render() {
    const {
      website,
      username,
      password,
      searchInput,
      showPassword,
      passwordsList,
    } = this.state

    const filteredPasswords = this.getFilteredPasswords()

    return (
      <div className="app-container">
        <header className="header">
          <img
            src="https://assets.ccbp.in/frontend/react-js/password-manager-logo-img.png"
            alt="app logo"
            className="app-logo"
          />
        </header>

        <main className="main-container">
          <section className="add-password-section">
            <div className="password-manager-image-container">
              <img
                src="https://assets.ccbp.in/frontend/react-js/password-manager-lg-img.png"
                alt="password manager"
                className="password-manager-image"
              />
            </div>

            <form className="add-password-form" onSubmit={this.onAddPassword}>
              <h1 className="form-heading">Add New Password</h1>

              <div className="input-container">
                <div className="input-icon-container">
                  <img
                    src="https://assets.ccbp.in/frontend/react-js/password-manager-website-img.png"
                    alt="website"
                    className="input-icon"
                  />
                </div>

                <input
                  type="text"
                  className="input-element"
                  placeholder="Enter Website"
                  value={website}
                  onChange={this.onChangeWebsite}
                />
              </div>

              <div className="input-container">
                <div className="input-icon-container">
                  <img
                    src="https://assets.ccbp.in/frontend/react-js/password-manager-username-img.png"
                    alt="username"
                    className="input-icon"
                  />
                </div>

                <input
                  type="text"
                  className="input-element"
                  placeholder="Enter Username"
                  value={username}
                  onChange={this.onChangeUsername}
                />
              </div>

              <div className="input-container">
                <div className="input-icon-container">
                  <img
                    src="https://assets.ccbp.in/frontend/react-js/password-manager-password-img.png"
                    alt="password"
                    className="input-icon"
                  />
                </div>

                <input
                  type="password"
                  className="input-element"
                  placeholder="Enter Password"
                  value={password}
                  onChange={this.onChangePassword}
                />
              </div>

              <div className="add-button-container">
                <button type="submit" className="add-button">
                  Add
                </button>
              </div>
            </form>
          </section>

          <section className="passwords-section">
            <div className="passwords-header">
              <div className="passwords-title-container">
                <h1 className="passwords-heading">Your Passwords</h1>

                <p className="password-count">{passwordsList.length}</p>
              </div>

              <div className="search-container">
                <div className="search-icon-container">
                  <img
                    src="https://assets.ccbp.in/frontend/react-js/password-manager-search-img.png"
                    alt="search"
                    className="search-icon"
                  />
                </div>

                <input
                  type="search"
                  className="search-input"
                  placeholder="Search"
                  value={searchInput}
                  onChange={this.onChangeSearchInput}
                />
              </div>
            </div>

            <hr className="separator" />

            <div className="show-password-container">
              <input
                type="checkbox"
                id="showPassword"
                className="show-password-checkbox"
                checked={showPassword}
                onChange={this.onChangeShowPassword}
              />

              <label htmlFor="showPassword" className="show-password-label">
                Show passwords
              </label>
            </div>

            {filteredPasswords.length > 0 ? (
              <ul className="passwords-list">
                {filteredPasswords.map(this.renderPasswordItem)}
              </ul>
            ) : (
              this.renderNoPasswordsView()
            )}
          </section>
        </main>
      </div>
    )
  }
}

export default PasswordManager
