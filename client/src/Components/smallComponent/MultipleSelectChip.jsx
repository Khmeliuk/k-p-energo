import { useState } from "react";
import styled from "styled-components";
import { motion, AnimatePresence } from "framer-motion";
import PropTypes from "prop-types";

const MAX_VISIBLE_CHIPS = 3;

const MultipleSelectChip = ({ name, value = [], onChange, options }) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleToggleOption = (option) => {
    const newValue = value.includes(option)
      ? value.filter((item) => item !== option)
      : [...value, option];
    onChange(newValue);
  };

  const visibleChips = value.slice(0, MAX_VISIBLE_CHIPS);
  const hiddenCount = value.length - MAX_VISIBLE_CHIPS;

  return (
    <Wrapper>
      {/* <Label>{name}</Label> */}
      <SelectBox onClick={() => setIsOpen((prev) => !prev)}>
        <SelectedChips>
          {value.length > 0 ? (
            <>
              {visibleChips.map((item) => (
                <Chip key={item} as={motion.span} layout>
                  {item}
                </Chip>
              ))}
              <AnimatePresence>
                {hiddenCount > 0 && (
                  <MoreChips
                    as={motion.span}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.8 }}
                    transition={{ duration: 0.25 }}
                    key="more-chips"
                  >
                    +{hiddenCount}
                  </MoreChips>
                )}
              </AnimatePresence>
            </>
          ) : (
            <Placeholder>Оберіть задачі</Placeholder>
          )}
        </SelectedChips>
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
                onClick={() => handleToggleOption(option)}
                selected={value.includes(option)}
                as={motion.li}
                whileTap={{ scale: 0.95 }}
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

MultipleSelectChip.propTypes = {
  name: PropTypes.string.isRequired,
  value: PropTypes.arrayOf(PropTypes.string).isRequired,
  onChange: PropTypes.func.isRequired,
  options: PropTypes.arrayOf(PropTypes.string).isRequired,
};

export default MultipleSelectChip;

// Styled Components
const Wrapper = styled.div`
  position: relative;
  margin-bottom: 1rem;
`;

const SelectBox = styled.div`
  max-width: 90%;
  width: 90%;
  min-height: 48px;
  padding: 0.6rem 1rem;
  border: 1px solid #ccc;
  border-radius: 0.75rem;
  background: white;
  display: flex;
  justify-content: space-between;
  align-items: center;
  cursor: pointer;
  overflow: hidden;

  &:hover {
    border-color: #4a90e2;
  }
`;

const SelectedChips = styled.div`
  display: flex;
  flex-wrap: nowrap;
  gap: 6px;
  max-width: 100%;
  overflow: hidden;
`;

const Chip = styled.span`
  background: #e3f2fd;
  color: #1565c0;
  padding: 4px 10px;
  border-radius: 12px;
  font-size: 0.85rem;
  font-weight: 500;
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
`;

const MoreChips = styled(motion.span)`
  background: #c5cae9;
  color: #303f9f;
  padding: 4px 10px;
  border-radius: 12px;
  font-size: 0.85rem;
  font-weight: 600;
  white-space: nowrap;
`;

const Placeholder = styled.span`
  color: #999;
  font-size: 0.9rem;
`;

const Arrow = styled.span`
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
  max-height: 200px;
  overflow-y: auto;
  list-style: none;
  padding: 0;
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
