import React, { useRef } from 'react';
import InputContainer from '../inputContainer/InputConatiner';
import styles from '../inputContainer/InputContainer.module.css'

function Input({ label, type, defaultValue, onChange, onBlur, name, error }, ref) {
  const inputRef = useRef(null);

  const getErrorMessage = () => {
    if (!error) return;
    if (error.message) return error.message;

    // defaults
    switch (error.type) {
      case 'required':
        return 'This Field Is Required';
      case 'minLength':
        return 'Field Is Too Short';
      default:
        return '*';
    }
  };

  return (
    <InputContainer label={label}>
      <input
        defaultValue={defaultValue}
        className={styles.Input}
        type={type}
        placeholder={label}
        ref={ref || inputRef}
        name={name}
        onChange={onChange}
        onBlur={onBlur}
      />
      {error && <div className={styles.error}>{getErrorMessage()}</div>}
    </InputContainer>
  );
}

export default React.forwardRef(Input);
