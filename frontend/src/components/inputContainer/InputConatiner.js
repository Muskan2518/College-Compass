import React from 'react';
import PropTypes from 'prop-types';
import styles from './InputContainer.module.css'; // Make sure to create and import your CSS module

export default function InputContainer({ label, bgColor, children }) {
  return (
    <div className={styles.container} style={{ backgroundColor: bgColor }}>
      {label && <label className={styles.label}>{label}</label>}
      <div className={styles.content}>{children}</div>
    </div>
  );
}

InputContainer.propTypes = {
  label: PropTypes.string,
  bgColor: PropTypes.string,
  children: PropTypes.node.isRequired
};

InputContainer.defaultProps = {
  bgColor: '#ffffff'
};
