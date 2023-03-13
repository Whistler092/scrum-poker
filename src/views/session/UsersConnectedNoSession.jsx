import { useUserContext } from "../../Context/UsersContext";
import LoginForm from "../shared/LoginForm";

export default function UsersConnectedNoSession() {
  const { setUser } = useUserContext();

  const handleLoginSubmit = (user) => {
    setUser(user);
  };

  return (
    <>
      {" "}
      <LoginForm handleLogin={(e) => handleLoginSubmit(e)} />
    </>
  );
}
