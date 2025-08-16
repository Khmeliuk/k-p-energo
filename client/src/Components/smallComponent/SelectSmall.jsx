import PropTypes from "prop-types";
import styled from "styled-components";
import { motion } from "framer-motion";
import { useState } from "react";

const Wrapper = styled.div`
  margin-bottom: 16px;
  display: flex;
  flex-direction: column;
  width: 100%;
  position: relative;
`;

const SelectContainer = styled.div`
  position: relative;
`;

const SelectElement = styled(motion.select)`
  width: 100%;
  min-width: 220px;
  height: 44px;
  padding: 12px 40px 12px 16px;
  border-radius: 6px;
  border: 2px solid #ccc;
  font-size: 16px;
  line-height: 20px;
  background-color: #fff;
  color: ${(props) => (props.value === "" ? "#808080" : "#333")};
  cursor: pointer;
  appearance: none;
  transition: border-color 0.3s ease, box-shadow 0.3s ease;

  &:hover {
    border-color: #1976d2;
    box-shadow: 0 4px 12px rgba(25, 118, 210, 0.15);
  }

  &:focus {
    outline: none;
    border-color: #1976d2;
    box-shadow: 0 0 10px rgba(25, 118, 210, 0.35);
  }
`;

const Arrow = styled.span`
  pointer-events: none;
  position: absolute;
  top: 50%;
  right: 14px;
  transform: translateY(-50%);
  font-size: 18px;
  color: #666666;
  user-select: none;
`;

export default function SelectSmall({ options, name, onChange }) {
  const [chose, setChose] = useState("");

  const onchangeHandler = (e) => {
    setChose(e.target.value);
    if (onChange) onChange(e.target.value);
  };

  return (
    <Wrapper>
      <SelectContainer>
        <SelectElement
          id={`${name}-select`}
          name={name}
          value={chose}
          onChange={onchangeHandler}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
        >
          <option value="" disabled>
            {`Виберіть ${name}`}
          </option>
          {options?.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </SelectElement>
        <Arrow>▼</Arrow>
      </SelectContainer>
    </Wrapper>
  );
}

SelectSmall.propTypes = {
  options: PropTypes.arrayOf(PropTypes.string).isRequired,
  name: PropTypes.string.isRequired,
  onChange: PropTypes.func,
};
