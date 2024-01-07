import axios from "axios";
import AuthForm from "../components/AuthForm";
import { useAuth } from '../AuthContext';

const Login = () => {
  const { addToken } = useAuth();

  const handleAuthSubmit = async (formData) => {
    const { scenario, email, password } = formData;
    // console.log(scenario, email, password);

    // fetch data
    try {
      if (scenario === "login" || scenario === "signup") {
        const response = await axios.post(
          `http://localhost:3000/api/${scenario}`,
          scenario === "login"
            ? { email, password }
            : { email, password, admin: formData.admin }
        );
        const { id, token } = response.data;
        console.log(id);
        console.log(token);
        console.log(response.data);
        addToken(token);

        // const data = await response.json();

        // if (response.ok) {
        //   console.log(`${scenario} successful:`, data);
        // } else {
        //   console.error(`${scenario} failed:`, data.message);
        // }
      }
    } catch (error) {
      console.error(`Error during ${scenario}:`, error.message);
    }
  };

  return (
    <div>
      <AuthForm onAuthSubmit={handleAuthSubmit} />
    </div>
  );
};

export default Login;
