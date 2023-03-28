export const required = (value) => {
  if (value) return undefined;

  return "Field is required";
};

/* Если придёт value то underfined , если нет то "Field is required"*/

export const maxLengthCreator = (maxLength) => (value) => {
  if (value.length > maxLength) return `Max length is ${maxLength} symbols`;

  return undefined;
};
/* Санка для обозначения максм количества симовол */

export const maxLength30 = (value) => {
  if (value.length > 30) return "Max length is 30 symbols";

  return undefined;
};

/* Если придёт есть value и value больше 30 то максимальная 30 сиволов либо ничего"*/
