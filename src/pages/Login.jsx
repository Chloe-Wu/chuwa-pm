import axios from "axios";
import AuthForm from "../components/AuthForm";

const Login = () => {
  const handleAuthSubmit = async (formData) => {
    const { scenario, email, password, admin } = formData;
    console.log(scenario, email, password, admin);

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
        console.log(response.data)

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
