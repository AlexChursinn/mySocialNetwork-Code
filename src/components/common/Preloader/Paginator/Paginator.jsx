import React, { useState } from "react";
import s from "./Paginator.module.css";
import cn from "classnames";

/* totalItemsCount сделали вместо totalUsersCount чтобы можно было сделать как общую логику чтобы испольщовать на разных стнанцах потом
 */

let Paginator = ({
  totalUsersCount,
  pageSize,
  currentPage,
  onPageChanged,
  portionSize = 10 /* Приходит из пропсов  чтобы в разных местах настраивать количество отображаемых страницы по разному */,
}) => {
  let pagesCount = Math.ceil(totalUsersCount / pageSize);

  let pages = [];
  for (let i = 1; i <= pagesCount; i++) {
    pages.push(i);
  }

  let portionCount = Math.ceil(
    pagesCount / portionSize
  ); /* Дробим на порции получаем сколько всего порций получится */
  let [portionNumber, setPortionNumber] =
    useState(
      1
    ); /* храним первую порцию страниц и функция которая будет их менять */
  let leftPortionPageNumber =
    (portionNumber - 1) * portionSize + 1; /* расчет сколько страниц слева */
  let rightPortionPageNumber =
    portionNumber * portionSize; /* расчет сколько страниц справа */

  return (
    <div className={s.paginator}>
      {" "}
      {portionNumber > 1 && (
        <button
          onClick={() => {
            setPortionNumber(portionNumber - 1);
          }}
        >
          PREV
        </button>
      )}{" "}
      {/* Добавили логику что если порция номера больше единица показываем стрелку назад */}
      {pages
        .filter(
          (p) => p >= leftPortionPageNumber && p <= rightPortionPageNumber
        ) /* Перед тем как мапить наши страницы мы добавили некую фильтрацию и проверяем здесь какие страницы отрисовать и нам нужно отрисовать те страницы которые больше левой границы или правой границы */
        .map((p) => {
          return (
            <span
              className={cn(
                { [s.selectedPage]: currentPage === p },
                s.pageNumber
              )}
              key={p}
              onClick={(e) => {
                onPageChanged(p);
              }}
            >
              {p}
            </span>
          );
          {
            /* <span className={true ? s.selectedPage : " "}>{p}</span>; */
          }
        })}
      {portionCount > portionNumber && (
        <button
          onClick={() => {
            setPortionNumber(portionNumber + 1);
          }}
        >
          NEXT
        </button>
      )}
    </div> /* Добавили логику что если порция номера больше единица показываем стрелку вперед  */
  );
};

export default Paginator;
