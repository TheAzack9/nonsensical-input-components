
import React, { useState } from "react";
import { FaChevronUp, FaChevronDown } from 'react-icons/fa';
import PropTypes from 'prop-types';



const Collapsable = ({ open, children, title }) => {
  const [isOpen, setIsOpen] = useState(open);

  const handleFilterOpening = () => {
    setIsOpen((prev) => !prev);
  };

  return (
    <>
      <div className="card">
        <div>
          <div className="p-3 border-bottom d-flex justify-content-between">
            <h6 className="font-weight-bold">{title}</h6>
            <button type="button" className="btn" onClick={handleFilterOpening}>
              {!isOpen ? (
                <FaChevronDown />
              ) : (
                <FaChevronUp />
              )}
            </button>
          </div>
        </div>
        <div className="border-bottom">
          <div>{isOpen && <div className="p-3">{children}</div>}</div>
        </div>
      </div>
    </>
  );
};

Collapsable.propTypes = {
  open: PropTypes.bool,
  title: PropTypes.string.isRequired,
};

export default Collapsable;
