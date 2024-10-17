import { useEffect, useState, useRef } from 'react';
import { styled } from 'styled-components';
import { GoChevronDown } from 'react-icons/go';

function Dropdown({
  item,
  value,
  onChange,
  isRace,
  register,
  selection,
  options,
  groupIdx,
}) {
  const [isOpen, setIsOpen] = useState(false);
  const divEl = useRef();

  const nameLength = item.name.length - 1;
  const shortenedName = item.name.slice(0, nameLength);
  const selectName =
    item.total_choices > 1 ? `${item.name}-${groupIdx}` : item.name;
  const defaultOption =
    item.name === undefined
      ? '- Choose an Option -'
      : `- Choose a ${selection.name}'s ${shortenedName} -`;

  console.log('in Dropdown -> options:', options);

  useEffect(() => {
    // create event handler function
    const handler = (event) => {
      console.log('target was clicked:', event.target);
      console.log('ref divEl:', divEl.current);

      // a check to make sure if the divEl has not been assigned just return
      if (!divEl.current) {
        return;
      }

      // check to see if the click was NOT inside of our dropdown
      if (!divEl.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    // listening for a click event on entire document, and with 3rd arg we are watching during the capture phase
    document.addEventListener('click', handler, true);
  }, []);

  const handleClick = () => {
    setIsOpen((prevState) => !prevState);
  };

  const handleOptionClick = (option) => {
    // Close dropdown
    setIsOpen(false);
    onChange(option);
  };

  const renderedOptions = options.map((option) => {
    return (
      <div
        className='hover:bg-sky-100 rounded cursor-pointer p-1'
        key={option.value}
        onClick={() => handleOptionClick(option)}
      >
        {option.label}
      </div>
    );
  });

  let content = defaultOption;
  // if null wont enter loop
  if (value) {
    content = value.label;
  }

  return (
    <div ref={divEl} className='w-48 relative' style={{ marginBottom: '20px' }}>
      <div
        onClick={handleClick}
        className='flex justify-between items-center cursor-pointer'
      >
        {value?.label || defaultOption}
        <GoChevronDown className='text-lg' />
      </div>
      {isOpen && <div className='absolute top-full'>{renderedOptions}</div>}
    </div>
  );
}

export default Dropdown;
