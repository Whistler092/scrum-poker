import { v4 as uid } from "uuid";
import { CURRENT_USER } from "../../utils/constants";

export default function LoginForm({ handleLogin }) {
  const handleLoginSubmit = (e) => {
    console.log("LoginForm.handleLoginSubmit", e);

    e.preventDefault();
    const userName = e.target.userName.value;
    console.log(userName);

    const localStorageUser = {
      userName,
      uid: uid(),
    };

    localStorage.removeItem(CURRENT_USER);
    localStorage.setItem(CURRENT_USER, JSON.stringify(localStorageUser));

    handleLogin(localStorageUser);
  };

  const handleSignOut = () => {};

  return (
    <>
      <form onSubmit={handleLoginSubmit}>
        <div className="login-box">
          <label>
            Name to display: {"  "}
            <input type="text" id="userName" />
          </label>
          <button
            type="submit"
            className="mdc-icon-button material-icons small-icon"
            onClick={() => handleSignOut()}
          >
            <div className="mdc-icon-button__ripple"></div>
            login
          </button>
        </div>
      </form>
    </>
  );
}
