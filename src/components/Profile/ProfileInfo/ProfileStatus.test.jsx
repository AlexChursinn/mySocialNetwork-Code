import React from "react";
import { create } from "react-test-renderer";
import ProfileStatus from "./ProfileStatus";

describe("ProfileStatus component", () => {
  /* Тестим ProfileStatus component */
  test("status from props should be in the state", () => {
    /* мы должны state запихнуть в state */
    const component = create(
      <ProfileStatus status="Hello there" />
    ); /* create типо создает отрисосывает компоненту для тест */
    const instance =
      component.getInstance(); /* getInstance дай мне экзмепляр обьекта с которым я взаимодейтсвую */
    expect(instance.state.status).toBe(
      "Hello there"
    ); /* мы берем статус и проверяем что у него в Hello there */
  });

  test("after creation span with status should be displayed with correct status", () => {
    /* мы должны создать спан с нужным статусом*/
    const component = create(
      <ProfileStatus status="Hello there" />
    ); /* create типо создает отрисосывает компоненту для тест */
    const root =
      component.root; /* root дай мне экзмепляр обьекта с которым я взаимодейтсвую */
    let span = root.findByType("span");
    expect(
      span
    ).not.toBeNull(); /* мы берем span и проверяем что он не равнялся null */
  });

  test("after creation span with status should be displayed with correct status", () => {
    /* мы должны создать спан с нужным статусом*/
    const component = create(
      <ProfileStatus status="Hello there" />
    ); /* create типо создает отрисосывает компоненту для тест */
    const root =
      component.root; /* root дай мне экзмепляр обьекта с которым я взаимодейтсвую */
    let span = root.findByType("span");
    expect(
      span
    ).not.toBeNull(); /* мы берем span и проверяем что он не равнялся null */
  });
});
// Набираем npm test в консоли и он тестирует все файлы с припиской test
//Тест прошёл
