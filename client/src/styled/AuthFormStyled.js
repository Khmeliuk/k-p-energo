import styled from "styled-components";
import { motion } from "framer-motion";

export const Wrapper = styled.div`
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background: linear-gradient(145deg, #f0f0f0, #d0d0d0);
  padding: 16px;

  @media (min-width: 768px) {
    padding: 24px;
  }
`;

export const FormWrapper = styled(motion.div)`
  background-color: #fff;
  border-radius: 12px;
  padding: 24px;
  box-shadow: 0 6px 18px rgba(0, 0, 0, 0.08);
  width: 100%;
  max-width: 360px;
  display: flex;
  flex-direction: column;

  @media (min-width: 768px) {
    padding: 32px;
    border-radius: 16px;
    max-width: 400px;
  }
`;

export const Icon = styled.div`
  font-size: 40px;
  text-align: center;
  margin-bottom: 12px;

  @media (min-width: 768px) {
    font-size: 48px;
    margin-bottom: 16px;
  }
`;

export const Title = styled.h2`
  text-align: center;
  font-weight: 700;
  font-size: 20px;
  color: #1976d2;
  margin-bottom: 20px;

  @media (min-width: 768px) {
    font-size: 24px;
    margin-bottom: 24px;
  }
`;

export const Input = styled.input`
  padding: 10px;
  margin-bottom: 14px;
  border-radius: 6px;
  border: 1px solid #ccc;
  font-size: 15px;
  width: 100%;
  background-color: #fff;
  color: #333;
  transition: all 0.3s ease;

  &:hover {
    border-color: #1976d2;
    box-shadow: 0 3px 6px rgba(25, 118, 210, 0.12);
  }

  &:focus {
    outline: none;
    border-color: #1976d2;
    box-shadow: 0 0 8px rgba(25, 118, 210, 0.25);
  }
`;

export const SubmitButton = styled.button`
  padding: 10px;
  background-color: #1976d2;
  color: #fff;
  font-size: 15px;
  border: none;
  border-radius: 6px;
  width: 100%;
  cursor: pointer;
  transition: background-color 0.3s ease, transform 0.2s;

  &:hover {
    background-color: #125a9c;
    transform: scale(1.02);
  }

  &:active {
    transform: scale(0.98);
  }
`;

export const Toggle = styled.button`
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

export const ErrorMessage = styled.div`
  margin-top: 10px;
  color: #d32f2f;
  font-size: 13px;
  text-align: center;

  @media (min-width: 768px) {
    font-size: 14px;
    margin-top: 12px;
  }
`;
