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
  minLangth?: {
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
    if ((option?.minLangth?.value || 0) > value.length) {
      setErrors(prev => {
        return { ...prev, [name]: option?.minLangth?.message };
      });
    } else if (!value.includes(option?.pattern?.value || "")) {
      setErrors(prev => {
        return { ...prev, [name]: option?.pattern?.message };
      });
    } else {
      setErrors(prev => {
        return { ...prev, [name]: "" };
      });
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
      onChange: (e: ChangeEvent<HTMLInputElement>) => onChange(e, option),
    };
  };

  return { value, register, onSubmit, errors, isUnsubmittable };
};

export default useForm;
