import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import AuthForm from "../components/AuthForm/AuthForm";
import { authUser } from '../app/userSlice';

export default function Login(){
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const handleAuthSubmit = async (data) => {
    try{
      const user = await dispatch(authUser(data));

      console.log(user)

      if (user.payload.success) {
        // Successful login, navigate to the home/Product page
        navigate('/ProductList');
        
      } else {
        alert("Invalid username or password");
      }
    } catch (err) {
      console.error('Authentication failed:', err);
    }
  };

    return (
    <div>
      <AuthForm onAuthSubmit={handleAuthSubmit} scenario="login"/>
    </div>
  );

}







// import axios from "axios";
// import AuthForm from "../components/AuthForm";

// const Login = () => {
//   const handleAuthSubmit = async (formData) => {
//     const { scenario, email, password } = formData;
//     // console.log(scenario, email, password);

//     // fetch data
//     try {
//       if (scenario === "login" || scenario === "signup") {
//         const response = await axios.post(
//           `http://localhost:3000/api/${scenario}`,
//           scenario === "login"
//             ? { email, password }
//             : { email, password, admin: formData.admin }
//         );
//         const { id, token } = response.data;
//         console.log(id);
//         console.log(token);
//         console.log(response.data)

//       }
//     } catch (error) {
//       console.error(`Error during ${scenario}:`, error.message);
//     }
//   };

//   return (
//     <div>
//       <AuthForm onAuthSubmit={handleAuthSubmit} />
//     </div>
//   );
// };

// export default Login;
