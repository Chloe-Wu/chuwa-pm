import axios from 'axios';
import AuthForm from "../components/AuthForm";

const Login = () => {

  const handleAuthSubmit = async (formData) => {

    const { scenario, email, password } = formData;
    // console.log(scenario, email, password);

    // fetch data
    try {
      const user = { email, password }
      if (scenario === "login" || scenario === "signup") {
        const response = await axios.post(`http://localhost:3000/api/${scenario}`, user);
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
  }

  return (
    <div>
      <AuthForm onAuthSubmit={handleAuthSubmit} />
    </div>
  );
};

export default Login;
