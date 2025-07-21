import { useState } from "react";
import styled from "styled-components";
import { motion, AnimatePresence } from "framer-motion";

const SelectSmall = ({ name, options = [] }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selected, setSelected] = useState(options[0]);

  const handleSelect = (option) => {
    setSelected(option);
    setIsOpen(false);
  };

  return (
    <Wrapper>
      <HiddenInput type="hidden" name={name} value={selected} />
      <SelectBox onClick={() => setIsOpen((prev) => !prev)}>
        {selected}
        <Arrow $isOpen={isOpen}>▾</Arrow>
      </SelectBox>
      <AnimatePresence>
        {isOpen && (
          <OptionsList
            as={motion.ul}
            initial={{ opacity: 0, y: -5 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -5 }}
            transition={{ duration: 0.2 }}
          >
            {options.map((option) => (
              <OptionItem
                key={option}
                onClick={() => handleSelect(option)}
                selected={option === selected}
              >
                {option}
              </OptionItem>
            ))}
          </OptionsList>
        )}
      </AnimatePresence>
    </Wrapper>
  );
};

export default SelectSmall;

// Styled Components

const Wrapper = styled.div`
  position: relative;
  margin-bottom: 1rem;
`;

const HiddenInput = styled.input`
  display: none;
`;

const SelectBox = styled.div`
  width: 90%;
  padding: 0.75rem 1rem;
  border: 1px solid #ccc;
  border-radius: 0.75rem;
  font-size: 1rem;
  background: white;
  cursor: pointer;
  display: flex;
  justify-content: space-between;
  align-items: center;

  &:focus-within {
    border-color: #3f51b5;
  }
`;

const Arrow = styled.span.attrs(() => ({
  // нічого не передаємо в DOM
}))`
  transition: transform 0.2s ease;
  transform: ${({ $isOpen }) => ($isOpen ? "rotate(180deg)" : "rotate(0deg)")};
`;

const OptionsList = styled.ul`
  position: absolute;
  width: 100%;
  top: 110%;
  left: 0;
  background: white;
  border: 1px solid #ccc;
  border-radius: 0.75rem;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  z-index: 10;
  overflow: hidden;
`;

const OptionItem = styled.li`
  padding: 0.75rem 1rem;
  cursor: pointer;
  background: ${({ selected }) => (selected ? "#f0f0ff" : "white")};
  transition: background 0.2s;

  &:hover {
    background: #eaeaff;
  }
`;
