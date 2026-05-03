import { useState, useCallback } from 'react';

export function useForm(initialValues, validators = {}) {
  const [values, setValues] = useState(initialValues);
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});

  const handleChange = useCallback((e) => {
    const { name, value, type, checked } = e.target;
    setValues((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
    // Clear error on change
    setErrors((prev) => ({ ...prev, [name]: '' }));
  }, []);

  const handleBlur = useCallback(
    (e) => {
      const { name } = e.target;
      setTouched((prev) => ({ ...prev, [name]: true }));
      if (validators[name]) {
        const error = validators[name](values[name], values);
        setErrors((prev) => ({ ...prev, [name]: error || '' }));
      }
    },
    [validators, values]
  );

  const validate = useCallback(() => {
    const newErrors = {};
    let isValid = true;
    Object.keys(validators).forEach((field) => {
      const error = validators[field](values[field], values);
      if (error) {
        newErrors[field] = error;
        isValid = false;
      }
    });
    setErrors(newErrors);
    setTouched(Object.keys(validators).reduce((acc, k) => ({ ...acc, [k]: true }), {}));
    return isValid;
  }, [validators, values]);

  const reset = useCallback(() => {
    setValues(initialValues);
    setErrors({});
    setTouched({});
  }, [initialValues]);

  return { values, errors, touched, handleChange, handleBlur, validate, reset, setValues };
}
