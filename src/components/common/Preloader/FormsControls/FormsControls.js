import React from "react";
import { Field } from "redux-form";
import s from "./FormsControls.module.css";

const FormControl = ({ input, meta: { touched, error }, children }) => {
  const hasError = touched && error;
  return (
    <div className={s.formControl + " " + (hasError ? s.error : "")}>
      {/* если есть hasError то доьавит класс Error иначе посутота */}
      <div>{children}</div>
      {hasError && <span>{error}</span>}{" "}
      {/* Если был тронут error есть покажи span если нет не показывай */}
    </div>
  );
};

export const Textarea = (props) => {
  const { input, meta, child, ...restProps } = props;
  return (
    <FormControl {...props}>
      <textarea {...input} {...restProps} />
    </FormControl>
  );
};

/* Делаем для инпута такую же валидацию */

export const Input = (props) => {
  const { input, meta, child, ...restProps } = props;
  return (
    <FormControl {...props}>
      <input {...input} {...restProps} />
    </FormControl>
  );
};

export const createField = (
  placeholder,
  name,
  validators,
  component,
  type,
  props = {},
  text = ""
) => (
  <div>
    <Field
      placeholder={placeholder}
      name={name}
      validate={validators}
      component={component}
      type={type}
      {...props}
    />
    {text}
  </div>
);
{
  /* component={"input"} говорим нарисовать input 
name={"login"} имя под которым удёт на сервак
*/
}
