import { Link } from "react-router-dom";

const AuthForm = ({ confirmPw }: { confirmPw: boolean }) => {
  return (
    <>
      <form className="generic-component">
        <fieldset>
          <div className="generic-column">
            <label htmlFor="username">User name</label>
            <input type="text" name="username" />
            <label htmlFor="password">Password</label>
            <input type="text" name="password" />
            {confirmPw && (
              <>
                <label htmlFor="confirm-password">Confirm Password</label>
                <input type="text" name="confirm-password" />
              </>
            )}
          </div>
        </fieldset>
      </form>
      <br />
      {!confirmPw && <Link to={"/sign-up"}>No account? Sign up here</Link>}
    </>
  );
};

export default AuthForm;
