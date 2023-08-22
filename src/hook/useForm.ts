import { ChangeEvent, FormEvent, useState } from "react";

interface ValidationOption {
  required?: {
    value: boolean;
    message: string;
  };
  pattern?: {
    value: string;
    message: string;
  };
  minLength?: {
    value: number;
    message: string;
  };
}

const useForm = <T extends Record<string, any>>({ initialValue }: { initialValue: T }) => {
  const [value, setValue] = useState(initialValue);
  const [errors, setErrors] = useState(initialValue);
  const hasError = Object.keys(errors).some(key => !!errors[key]);
  const isUnsubmittable = hasError || Object.keys(value).some(key => !value[key]);

  const handleValidation = (name: keyof T, value: string, option: ValidationOption) => {
    const isMinLength = (option?.minLength?.value || 0) > value.length;
    const hasPattern = !value.includes(option?.pattern?.value || "");

    if (isMinLength) {
      setErrors(prev => ({ ...prev, [name]: option?.minLength?.message }));
    } else if (hasPattern) {
      setErrors(prev => ({ ...prev, [name]: option?.pattern?.message }));
    } else {
      setErrors(prev => ({ ...prev, [name]: "" }));
    }
  };

  const onSubmit = (callback: (value: T) => void) => (e: FormEvent) => {
    e.preventDefault();
    callback(value);
  };

  const onChange = ({ target }: ChangeEvent<HTMLInputElement>, option?: ValidationOption) => {
    handleValidation(target.name, target.value, option || {});

    setValue(prev => {
      return { ...prev, [target.name]: target.value };
    });
  };

  const register = (name: keyof T, option?: ValidationOption) => {
    return {
      name,
      value: value[name],
      onChange: (e: ChangeEvent<HTMLInputElement>) => onChange(e, option),
    };
  };

  const resetValue = () => {
    setValue(initialValue);
  };

  return { value, register, onSubmit, resetValue, errors, isUnsubmittable };
};

export default useForm;
