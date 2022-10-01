import React, { useState, useEffect, memo } from "react";
import PropTypes from "prop-types";
import { isCursorAtStart } from "@testing-library/user-event/dist/utils";

// Single List Item
const WrappedSingleListItem = ({ index, isSelected, onClickHandler, text }) => {
  return (
    <li
      style={{ backgroundColor: isSelected ? "green" : "red", cursor: "grab" }}
      //onClick={onClickHandler(index)}
      //Invalid prop isSelected of type array supplied to WrappedSingleListItem, expected boolean. Therefore converting it to boolean.
      onClick={() => onClickHandler(Boolean(index))}
    >
      {text}
    </li>
  );
};

WrappedSingleListItem.propTypes = {
  index: PropTypes.number,
  isSelected: PropTypes.bool,
  onClickHandler: PropTypes.func.isRequired,
  text: PropTypes.string.isRequired,
};

const SingleListItem = memo(WrappedSingleListItem);

// List Component
const WrappedListComponent = ({ items }) => {
  //const [setSelectedIndex, selectedIndex] = useState();useState variables being misplaced
  const [selectedIndex, setSelectedIndex] = useState();

  useEffect(() => {
    setSelectedIndex(true);
  }, [items]);

  const handleClick = (index) => {
    //setSelectedIndex(index);
    setSelectedIndex(Boolean(index)); //boolean
    //console.log(index)
  };

  //   return (
  //     <ul style={{ textAlign: "left" }}>
  //       {items.map((item, index) => (
  //         <SingleListItem
  //           onClickHandler={() => handleClick(index)}
  //           text={item.text}
  //           index={index}
  //           isSelected={selectedIndex}
  //         />
  //       ))}
  //     </ul>
  //   );
  // };
  return (
    <ul style={{ textAlign: "left" }}>
      {items.map((item, index) => (
        <SingleListItem
          onClickHandler={() => handleClick(index)}
          text={item.text}
          index={index}
          isSelected={selectedIndex}
          key={index}
        />
      ))}
    </ul>
  );
};

// WrappedListComponent.propTypes = {
//   items: PropTypes.array(
//     PropTypes.shapeOf({
//       text: PropTypes.string.isRequired,
//     })
//   ),
// };
//There is a syntactical error in the predefined syntax. Instead
//of using an array, we should have used arrayOf and instead of using
//shapOf, we should have used the shape only.
WrappedListComponent.propTypes = {
  items: PropTypes.arrayOf(
    PropTypes.shape({
      text: PropTypes.string.isRequired,
    })
  ),
};

// WrappedListComponent.defaultProps = {
//   items: null,
// };The default items array in the provided code was null, and since mapping over null is not possible, we must initialise it with a value.
WrappedListComponent.defaultProps = {
  items: [{ text: "Sai Srujan" }, { text: "Vemula" }],
};

const List = memo(WrappedListComponent);

export default List;
