import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { login, registration } from "../../service/API/axios";
import { useAuthMutation } from "../../service/reactQuery/reactMutation";
import SelectSmall from "../smallComponent/SelectSmall";
import { Copyright } from "../muicomponent/Typography";
import { useState } from "react";
import {
  ErrorMessage,
  FormWrapper,
  Icon,
  Input,
  SubmitButton,
  Title,
  Toggle,
  Wrapper,
} from "../../styled/AuthFormStyled";

const AuthForm = () => {
  const [isLogin, setIsLogin] = useState(false);
  const loginMutation = useAuthMutation(login);
  const registrationMutation = useAuthMutation(registration);
  const navigate = useNavigate();

  const toggleForm = () => {
    setIsLogin(!isLogin);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const values = Object.fromEntries(formData.entries());
    const mutation = isLogin ? loginMutation : registrationMutation;
    mutation.mutate(values, {
      onSuccess: () => {
        navigate("/task");
      },
    });
  };

  return (
    <Wrapper>
      <FormWrapper
        as={motion.div}
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <Icon>🔒</Icon>
        <Title>{isLogin ? "Login" : "Register"}</Title>
        <form onSubmit={handleSubmit} autoComplete="off">
          {!isLogin && (
            <>
              <Input name="name" placeholder="Name" required />
              <Input name="lastName" placeholder="Last Name" required />
              <SelectSmall
                name="role"
                options={["user", "super user", "admin"]}
              />
            </>
          )}
          <Input name="email" placeholder="Email" required />
          <Input
            name="password"
            placeholder="Password"
            type="password"
            required
          />
          {!isLogin && (
            <Input
              name="confirmPassword"
              placeholder="Confirm Password"
              type="password"
              required
            />
          )}
          <SubmitButton type="submit">
            {isLogin ? "Login" : "Register"}
          </SubmitButton>

          {(loginMutation.error || registrationMutation.error) && (
            <ErrorMessage>
              {loginMutation.error?.response?.data?.message ||
                registrationMutation.error?.response?.data?.message ||
                "Невірний логін чи пароль"}
            </ErrorMessage>
          )}

          <Toggle onClick={toggleForm}>
            {isLogin
              ? "Don't have an account? Register"
              : "Already have an account? Login"}
          </Toggle>
        </form>
        <Copyright />
      </FormWrapper>
    </Wrapper>
  );
};

// Styled Components
// const Wrapper = styled.div`
//   min-height: 100vh;
//   display: flex;
//   align-items: center;
//   justify-content: center;
//   padding: 1rem;
//   background: linear-gradient(to bottom right, #e0eafc, #cfdef3);
// `;

// const FormWrapper = styled.div`
//   width: 100%;
//   max-width: 400px;
//   padding: 2rem;
//   background: white;
//   border-radius: 1rem;
//   box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
// `;

// const Icon = styled.div`
//   font-size: 3rem;
//   text-align: center;
//   margin-bottom: 1rem;
// `;

// const Title = styled.h2`
//   text-align: center;
//   margin-bottom: 1rem;
//   font-size: 1.75rem;
// `;

// const Input = styled.input`
//   width: 90%;
//   padding: 0.75rem 1rem;
//   margin-bottom: 1rem;
//   border: 1px solid #ccc;
//   border-radius: 0.75rem;
//   font-size: 1rem;

//   &:focus {
//     border-color: #3f51b5;
//     outline: none;
//   }
// `;

// const SubmitButton = styled.button`
//   width: 100%;
//   padding: 0.75rem 1rem;
//   background: #3f51b5;
//   color: white;
//   border: none;
//   border-radius: 0.75rem;
//   font-size: 1rem;
//   cursor: pointer;
//   transition: background 0.3s;

//   &:hover {
//     background: #303f9f;
//   }
// `;

// const Toggle = styled.button`
//   background: none;
//   border: none;
//   color: #3f51b5;
//   margin-top: 1rem;
//   cursor: pointer;
//   width: 100%;
//   text-align: center;
//   font-size: 0.9rem;
// `;

// const ErrorMessage = styled.div`
//   margin-top: 1rem;
//   color: #d32f2f;
//   font-size: 0.9rem;
//   text-align: center;
// `;

export default AuthForm;
