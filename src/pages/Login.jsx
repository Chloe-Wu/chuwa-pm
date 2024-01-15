import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import AuthForm from "../components/AuthForm/AuthForm";
import { authUser } from '../slices/userSlice';
import { setCurrentUser, setCurrentToken } from '../slices/userSlice';
import { jwtDecode } from "jwt-decode";
import Header from '../components/Framework/Header';
import Footer from "../components/Framework/Footer";

export default function Login(){
  const dispatch = useDispatch();
  const navigate = useNavigate();


  const handleAuthSubmit = async (data) => {
    try{
      const user = await dispatch(authUser(data));

      console.log(user);

      if (user.payload.success) {
        // Successful login, navigate to the home/Product page
        console.log('Successful login');
        // console.log('user',user);
        // console.log(user.payload.id);
        // console.log(user.payload.token);
        // console.log(user.payload.admin);

        dispatch(setCurrentUser(user.payload.id));
        dispatch(setCurrentToken(user.payload.token));

        navigate('/product-list');
        
      } else {
        alert("Invalid username or password");
      }
    } catch (err) {
      console.error('Authentication failed:', err);
    }
  };

    return (
    <div>
      <Header/>
      <AuthForm onAuthSubmit={handleAuthSubmit} scenario="login"/>
      <Footer/>
    </div>
  );

}





// import axios from "axios";
// import AuthForm from "../components/AuthForm";
// import { useSelector, useDispatch } from "react-redux";
// import { addToken, removeToken, addId, removeId } from "../slices/TokenSlice.jsx";
// import { useLocation, useNavigate } from 'react-router-dom';

// const Login = () => {
//   const user_id = useSelector((state) => state.info.id);
//   const user_token = useSelector((state) => state.info.token);
//   const dispatch = useDispatch();
//   const navigate = useNavigate();

//   const handleAuthSubmit = async (formData) => {
//     const { scenario, email, password } = formData;
//     // console.log(scenario, email, password);

//     // fetch data
//     try {
//       if (scenario === "login" || scenario === "signup") {
//         const response = await axios.post(
//           `/api/${scenario}`,
//           scenario === "login"
//             ? { email, password }
//             : { email, password, admin: formData.admin }
//         );
//         const { id, token } = response.data;
//         console.log(id);
//         console.log(token);
//         console.log(response.data);
        
//         navigate('/main');

//         dispatch(addToken(token));
//         dispatch(addId(id));

//         // const data = await response.json();

//         // if (response.ok) {
//         //   console.log(`${scenario} successful:`, data);
//         // } else {
//         //   console.error(`${scenario} failed:`, data.message);
//         // }
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