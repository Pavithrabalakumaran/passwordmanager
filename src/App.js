import {Component} from 'react'

import {v4} from 'uuid'

import './App.css'

const colorList = ['yellow', 'green', 'brown', 'orange', 'blue']

class App extends Component {
  state = {
    website: '',
    userName: '',
    passWord: '',
    newList: 0,
    searchInput: '',
    isTrue: false,
    isShow: false,
    latestList: [],
    eachValue: '',
  }

  onChangeWebsite = event => {
    this.setState({website: event.target.value})
  }

  onChangeUserName = event => {
    this.setState({userName: event.target.value})
  }

  onChangePassword = event => {
    this.setState({passWord: event.target.value})
  }

  addContent = event => {
    event.preventDefault()
    const {userName, website, passWord} = this.state
    const initial = website.slice(0, 1).toUpperCase()
    const classValue = colorList[Math.floor(Math.random() * 5)]
    const newValues = {
      id: v4(),
      initialValue: initial,
      website,
      userName,
      passWord,
      classAdd: classValue,
    }
    this.setState(prevState => ({
      latestList: [...prevState.latestList, newValues],
      website: '',
      userName: '',
      passWord: '',
      isTrue: true,
      searchInput: '',
    }))
  }

  onChangeCheckBox = event => {
    if (event.target.checked) {
      this.setState({isShow: true})
    } else {
      this.setState({isShow: false})
    }
  }

  searchList = event => {
    this.setState({searchInput: event.target.value})
  }

  deleteItem = id => {
    const {latestList, eachValue} = this.state
    const newList = latestList.filter(eachValue !== eachValue.id)

    const caseOf = newList.length !== 0
    this.setState({latestList: newList, isTrue: caseOf})
  }

  render() {
    const {
      website,
      userName,
      passWord,
      latestList,
      searchInput,
      isTrue,
      isShow,
    } = this.state

    const newList = latestList.filter(eachValue =>
      eachValue.website.toLowerCase().includes(searchInput.toLowerCase()),
    )
    if (newList.length === 0) {
      isTrue = false
    } else {
      isTrue = true
    }

    return (
      <div className="main-container">
        <img
          src="https://assets.ccbp.in/frontend/react-js/password-manager-logo-img.png"
          className="app-logo"
          alt="app logo"
        />
        <div className="inner-container">
          <img
            src="https://assets.ccbp.in/frontend/react-js/password-manager-sm-img.png"
            alt="password manager"
            className="password-manager"
          />
          <form className="form-details" onSubmit={this.addContent}>
            <h1 className="add-heading">Add New Password</h1>

            <div className="input-folder">
              <img
                src="https://assets.ccbp.in/frontend/react-js/password-manager-website-img.png"
                alt="website"
                className="input-image"
              />
              <input
                type="text"
                className="input-element"
                placeholder="Enter Website"
                onChange={this.onChangeWebsite}
                value={website}
              />
            </div>

            <div className="input-folder">
              <img
                src="https://assets.ccbp.in/frontend/react-js/password-manager-username-img.png"
                alt="username"
                className="input-image"
              />
              <input
                type="text"
                className="input-element"
                placeholder="Enter Username"
                onChange={this.onChangeUserName}
                value={userName}
              />
            </div>

            <div className="input-folder">
              <img
                src="https://assets.ccbp.in/frontend/react-js/password-manager-password-img.png"
                alt="password"
                className="input-image"
              />
              <input
                type="text"
                className="input-element"
                placeholder="Enter Password"
                onChange={this.onChangePassword}
                value={passWord}
              />
            </div>

            <button type="submit" className="add-button">
              Add
            </button>
          </form>

          <img
            src="https://assets.ccbp.in/frontend/react-js/password-manager-lg-img.png"
            className="password-manager-large-image"
            alt="password manager"
          />
        </div>

        <div className="second-container">
          <div className="first-part">
            <div className="your-password-container">
              <h1 className="password-heading">Your Passwords</h1>
              <p className="password-length">{newList.length}</p>
            </div>

            <div className="search-place">
              <img
                src="https://assets.ccbp.in/frontend/react-js/password-manager-search-img.png "
                className="input-image"
                alt="search"
              />
              <input
                type="search"
                placeholder="Search"
                className="input-element"
                onChange={this.searchList}
                value={searchInput}
              />
            </div>
          </div>

          <hr className="horizontal-line" />
          <div className="show-passwords">
            <input
              type="checkbox"
              className="check-box"
              id="check"
              onChange={this.onChangeCheckBox}
            />
            <label htmlFor="check" className="label-password">
              Show Passwords
            </label>
          </div>

          {!isTrue && (
            <div className="empty-state">
              <img
                src="https://assets.ccbp.in/frontend/react-js/no-passwords-img.png "
                alt="no passwords"
                className="empty-image"
              />
              <p className="no-passwords">No Passwords</p>
            </div>
          )}
          {isTrue && (
            <ul className="result-container">
              {newList.map(eachValue => (
                <li className="item-list" id={eachValue.id} key={eachValue.id}>
                  <p className={`initial ${eachValue.classAdd}`}>
                    {eachValue.initialValue}
                  </p>
                  <div className="list-content">
                    <p className="website">{eachValue.website}</p>
                    <p className="website">{eachValue.userName}</p>
                    {!isShow && (
                      <img
                        src="https://assets.ccbp.in/frontend/react-js/password-manager-stars-img.png"
                        alt="stars"
                        className="stars-image"
                      />
                    )}
                    {isShow && <p className="website">{eachValue.passWord}</p>}
                  </div>
                  <button
                    type="button"
                    data-testid="delete"
                    className="del-button"
                    onClick={() => this.deleteItem(eachValue.id)}
                  >
                    <img
                      src="https://assets.ccbp.in/frontend/react-js/password-manager-delete-img.png"
                      className="del-image"
                      alt="delete"
                    />
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    )
  }
}
export default App
