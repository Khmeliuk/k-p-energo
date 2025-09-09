import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { login, registration } from "../service/API/axios";
import { useAuthMutation } from "../service/reactQuery/reactMutation";
import SelectSmall from "../Components/smallComponent/SelectSmall";
import { Copyright } from "../Components/muicomponent/Typography";
import { useState, useEffect } from "react";
import styled from "styled-components";

const registrationFormField = {
  name: "",
  lastName: "",
  role: "",
  email: "",
  password: "",
  confirmPassword: "",
  department: "",
};

export default function AuthForm() {
  const [isLogin, setIsLogin] = useState(false);
  const [formValues, setFormValues] = useState({ ...registrationFormField });
  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const loginMutation = useAuthMutation(login);
  const registrationMutation = useAuthMutation(registration);

  const navigate = useNavigate();

  const toggleForm = () => {
    setFormValues({ ...registrationFormField });
    setIsLogin(!isLogin);
    setErrors({});
    setShowPassword(false);
    setShowConfirmPassword(false);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues((prev) => ({ ...prev, [name]: value }));

    console.log(formValues);
    setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const handleRoleChange = (value) => {
    setFormValues((prev) => ({ ...prev, role: value }));
    setErrors((prev) => ({ ...prev, role: "" }));
  };

  const handleDepartmentChange = (value) => {
    setFormValues((prev) => ({ ...prev, department: value }));
    setErrors((prev) => ({ ...prev, department: "" }));
  };

  useEffect(() => {
    const backendError =
      loginMutation.error?.response?.data?.errors ||
      registrationMutation.error?.response?.data?.errors;

    if (backendError && typeof backendError === "object") {
      setErrors(backendError);
    } else if (
      loginMutation.error?.response?.data?.message ||
      registrationMutation.error?.response?.data?.message
    ) {
      setErrors({
        general:
          loginMutation.error?.response?.data?.message ||
          registrationMutation.error?.response?.data?.message,
      });
    }
  }, [loginMutation.error, registrationMutation.error]);

  const validateForm = () => {
    const newErrors = {};

    if (!isLogin) {
      if (!formValues.name.trim()) newErrors.name = "Required";
      if (!formValues.lastName.trim()) newErrors.lastName = "Required";
      if (!formValues.role) newErrors.role = "Required";
      if (formValues.password !== formValues.confirmPassword)
        newErrors.confirmPassword = "No match";
    }

    if (!formValues.email.trim()) newErrors.email = "Required";
    if (!formValues.password.trim()) newErrors.password = "Required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    const payload = isLogin
      ? { email: formValues.email, password: formValues.password }
      : formValues;

    console.log(payload);

    const mutation = isLogin ? loginMutation : registrationMutation;

    mutation.mutate(payload, {
      onSuccess: () => navigate("/task"),
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
        <Title>{isLogin ? "Залогінитись" : "Зареєструватись"}</Title>

        <form onSubmit={handleSubmit} autoComplete="off">
          {!isLogin && (
            <>
              <InputWrapper>
                <Input
                  name="name"
                  placeholder="Ім'я"
                  value={formValues.name}
                  onChange={handleChange}
                  $hasError={!!errors.name}
                />
                {errors.name && <ErrorInside>{errors.name}</ErrorInside>}
              </InputWrapper>

              <InputWrapper>
                <Input
                  name="lastName"
                  placeholder="Фамілія"
                  value={formValues.lastName}
                  onChange={handleChange}
                  $hasError={!!errors.lastName}
                />
                {errors.lastName && (
                  <ErrorInside>{errors.lastName}</ErrorInside>
                )}
              </InputWrapper>

              {/* <InputWrapper>
                <Input
                  name="department"
                  placeholder="Department"
                  value={formValues.department}
                  onChange={handleChange}
                  $hasError={!!errors.department}
                />
                {errors.department && (
                  <ErrorInside>{errors.department}</ErrorInside>
                )}
              </InputWrapper> */}

              <SelectWrapper>
                <SelectSmall
                  name="role"
                  value={formValues.role}
                  onChange={handleRoleChange}
                  options={["user", "super user", "admin"]}
                />
                {errors.role && <SelectError>{errors.role}</SelectError>}
              </SelectWrapper>

              <SelectWrapper>
                <SelectSmall
                  name="department"
                  value={formValues.department}
                  onChange={handleDepartmentChange}
                  options={["1", "2", "3"]}
                />
                {errors.department && (
                  <SelectError>{errors.department}</SelectError>
                )}
              </SelectWrapper>
            </>
          )}

          <InputWrapper>
            <Input
              name="email"
              placeholder="Email"
              value={formValues.email}
              onChange={handleChange}
              $hasError={!!errors.email}
            />
            {errors.email && <ErrorInside>{errors.email}</ErrorInside>}
          </InputWrapper>

          <InputWrapper>
            <Input
              name="password"
              placeholder="Пароль"
              type={showPassword ? "text" : "password"}
              value={formValues.password}
              onChange={handleChange}
              $hasError={!!errors.password}
              $hasToggle={true}
            />
            <PasswordToggle
              type="button"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? "👁️" : "👁️‍🗨️"}
            </PasswordToggle>
            {errors.password && <ErrorInside>{errors.password}</ErrorInside>}
          </InputWrapper>

          {!isLogin && (
            <InputWrapper>
              <Input
                name="confirmPassword"
                placeholder="Повторіть пароль"
                type={showConfirmPassword ? "text" : "password"}
                value={formValues.confirmPassword}
                onChange={handleChange}
                $hasError={!!errors.confirmPassword}
                $hasToggle={true}
              />
              <PasswordToggle
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              >
                {showConfirmPassword ? "👁️" : "👁️‍🗨️"}
              </PasswordToggle>
              {errors.confirmPassword && (
                <ErrorInside>{errors.confirmPassword}</ErrorInside>
              )}
            </InputWrapper>
          )}

          <SubmitButton
            type="submit"
            disabled={loginMutation.isPending || registrationMutation.isPending}
          >
            {isLogin ? "Увійти" : "Зареєструватись"}
          </SubmitButton>

          {(loginMutation.error || registrationMutation.error) && (
            <ErrorMessage>
              {loginMutation.error?.response?.data?.message ||
                registrationMutation.error?.response?.data?.message ||
                "Невірний логін чи пароль"}
            </ErrorMessage>
          )}

          {errors.general && <ErrorInside>{errors.general}</ErrorInside>}

          <Toggle type="button" onClick={toggleForm}>
            {isLogin ? "Створити новий акаунт" : "Вже маєте акаунт? Увійти"}
          </Toggle>
        </form>

        <Copyright />
      </FormWrapper>
    </Wrapper>
  );
}

// ================= STYLES =================
const Wrapper = styled.div`
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background: linear-gradient(145deg, #f0f0f0, #d0d0d0);
  padding: 16px;
`;

const FormWrapper = styled(motion.div)`
  background-color: #fff;
  border-radius: 12px;
  padding: 24px;
  box-shadow: 0 6px 18px rgba(0, 0, 0, 0.08);
  width: 100%;
  max-width: 360px;
  display: flex;
  flex-direction: column;
`;

const Icon = styled.div`
  font-size: 2rem;
  text-align: center;
  margin-bottom: 12px;
`;

const Title = styled.h2`
  text-align: center;
  font-weight: 700;
  font-size: 20px;
  color: #1976d2;
  margin-bottom: 20px;
`;

const InputWrapper = styled.div`
  position: relative;
  margin-bottom: 15px;
`;

const SelectWrapper = styled.div`
  position: relative;
  margin-bottom: 15px;
`;

const Input = styled.input`
  width: 100%;
  padding: 10px;
  padding-right: ${({ $hasToggle, $hasError }) =>
    $hasToggle && $hasError
      ? "70px"
      : $hasToggle
      ? "40px"
      : $hasError
      ? "60px"
      : "10px"};
  border: 2px solid ${({ $hasError }) => ($hasError ? "red" : "#ccc")};
  border-radius: 6px;
  outline: none;
  font-size: 14px;

  &:focus {
    border-color: ${({ $hasError }) => ($hasError ? "red" : "#007bff")};
    box-shadow: 0 0 8px rgba(25, 118, 210, 0.25);
  }

  &:hover {
    border-color: #1976d2;
    box-shadow: 0 3px 6px rgba(25, 118, 210, 0.12);
  }
`;

const PasswordToggle = styled.button`
  position: absolute;
  right: 8px;
  top: 50%;
  transform: translateY(-50%);
  background: none;
  border: none;
  cursor: pointer;
  font-size: 16px;
  z-index: 2;
  padding: 2px;

  &:hover {
    opacity: 0.7;
  }
`;

const ErrorInside = styled.span`
  position: absolute;
  right: ${({ theme }) => "35px"};
  top: 50%;
  transform: translateY(-50%);
  font-size: 12px;
  color: red;
  background: white;
  padding: 0 4px;
  border-radius: 3px;
  z-index: 1;
`;

const SelectError = styled.span`
  position: absolute;
  right: 35px;
  top: 50%;
  transform: translateY(-50%);
  font-size: 12px;
  color: red;
  background: white;
  padding: 0 4px;
  border-radius: 3px;
  z-index: 10;
  pointer-events: none;
`;

const SubmitButton = styled.button`
  width: 100%;
  padding: 10px;
  background: #007bff;
  border: none;
  color: white;
  border-radius: 6px;
  font-size: 14px;
  cursor: pointer;

  &:hover {
    background: #0056b3;
  }

  &:active {
    transform: scale(0.98);
  }

  &:disabled {
    background: gray;
    cursor: not-allowed;
  }
`;

const Toggle = styled.button`
  margin-top: 14px;
  background: none;
  border: none;
  color: #1976d2;
  font-size: 13px;
  cursor: pointer;
  text-align: center;
  width: 100%;
  transition: color 0.3s ease;

  &:hover {
    color: #125a9c;
    text-decoration: underline;
  }
`;

const ErrorMessage = styled.div`
  margin-top: 10px;
  color: #d32f2f;
  font-size: 13px;
  text-align: center;
`;
