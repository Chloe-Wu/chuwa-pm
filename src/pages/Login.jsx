import AuthForm from "../components/AuthForm";

const Login = () => {

  const handleAuthSubmit = async (formData) => {

    const { scenario, email, password } = formData;
    console.log(scenario, email, password);
    
// fetch data
    try {
      if (scenario === "login" || scenario === "signup") {
        const response = await fetch(`/api/${scenario}`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            email: email,
            password: password,
          }),
        });

        const data = await response.json();

        if (response.ok) {
          console.log(`${scenario} successful:`, data);
        } else {
          console.error(`${scenario} failed:`, data.message);
        }
      }
    } catch (error) {
      console.error(`Error during ${scenario}:`,error.message);
    }
  }

  return (
    <div>
      <AuthForm onAuthSubmit={handleAuthSubmit} />
    </div>
  );
};

export default Login;
