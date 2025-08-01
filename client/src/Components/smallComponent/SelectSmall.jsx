import PropTypes from "prop-types";
import styled from "styled-components";
import { motion } from "framer-motion";
import { useState } from "react";

const Wrapper = styled.div`
  margin-bottom: 16px;
  display: flex;
  flex-direction: column;
  width: 90%;
`;

const Label = styled.label`
  font-size: 14px;
  font-weight: 600;
  margin-bottom: 6px;
  color: #333;
`;

const SelectElement = styled(motion.select)`
  padding: 12px;
  border-radius: 8px;
  border: 1px solid #ccc;
  font-size: 16px;
  background-color: #fff;
  color: #333;
  width: 100%;
  cursor: pointer;
  transition: all 0.3s ease;
  appearance: none; /* Прибирає дефолтну стрілку */

  &:hover {
    border-color: #1976d2;
    box-shadow: 0 4px 8px rgba(25, 118, 210, 0.15);
  }

  &:focus {
    outline: none;
    border-color: #1976d2;
    box-shadow: 0 0 10px rgba(25, 118, 210, 0.3);
  }
`;

const Arrow = styled.span`
  position: absolute;
  right: 16px;
  top: 50%;
  transform: translateY(-50%);
  font-size: 18px;
  pointer-events: none;
  color: #666;
`;

export default function SelectSmall({ options, name, onChange }) {
  const [chose, setChose] = useState("");
  const onchangeHandler = (e) => {
    setChose(e.target.value);
    onChange(e.target.value);
  };
  return (
    <Wrapper>
      <Label htmlFor={`${name}-select`}></Label>
      <div style={{ position: "relative" }}>
        <SelectElement
          as={motion.select}
          id={`${name}-select`}
          name={name}
          value={chose}
          onChange={onchangeHandler}
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          <option value="" disabled hidden>
            {` Оберіть ${name}`}
          </option>
          {options?.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </SelectElement>
        <Arrow>▼</Arrow>
      </div>
    </Wrapper>
  );
}

SelectSmall.propTypes = {
  options: PropTypes.arrayOf(PropTypes.string).isRequired,
  name: PropTypes.string.isRequired,
  onChange: PropTypes.func,
};
