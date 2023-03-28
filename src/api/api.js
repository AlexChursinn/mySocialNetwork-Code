import axios from "axios";

const instance = axios.create({
  /* Который хранит методы axios */ withCredentials: true,
  baseURL: "https://social-network.samuraijs.com/api/1.0/",
  headers: {
    "API-KEY": "c4336df1-8ee5-44e0-8988-9078117aeb3c",
  },
});

/* и теперть вместо axios обращаемся к  instance и больше не передаем ему методы так как они уже сидят в instance*/
export const usersAPI = {
  getUsers(currentPage = 1, pageSize = 10) {
    /* Закинул наш запрос в отедльную функцию */
    return instance
      .get(`users?page=${currentPage}&count=${pageSize}`)
      .then((response) => {
        return response.data;
      }); /* Сейчас мы брали весь response где приходит много чего лишнего а теперь мы берем только data от туда */
  },
  follow(userId) {
    return instance.post(`follow/${userId}`);
  },
  unfollow(userId) {
    return instance.delete(
      `follow/${userId}`
      /* подписаться и на какой id вместо default должно быть delete 
    в delete {} второй тип параметром должен быть объект натсройки*/
    );
  },
  getProfile(userId) {
    console.warn(
      "Obsolete method. Please use profileAPI object"
    ); /* В консоли говорим что используем старый метод использования запроса и по хорошему надо его использовать из profileAPI*/
    return profileAPI.getProfile(userId); /* Переделигировал из  profileAPI*/
  },
  /* this. тут больше нет так как нет класса больше нет this
props тоже теперь нет и если нашей функции нужны параметры то просто передадим их в (currentPage, pageSize) их передаст тот кто будет вызывать эту функцию
*/
};

export const profileAPI = {
  getProfile(userId) {
    return instance.get(
      `profile/` + userId
    ); /* Вынес запрос с profileContainer */
  },
  getStatus(userId) {
    return instance.get(
      `profile/status/` + userId
    ); /* Делаем get запрос за статусом */
  },
  updateStatus(status) {
    return instance.put(`profile/status`, {
      status: status,
    }); /* Делаем put запрос за статусом мы что-то отправляем на сервак с помощью такого запроса
    put имеет второй параметр {status: status} делает новым статус по документации API
    */
  },
  savePhoto(photoFile) {
    const formData =
      new FormData(); /* Так как мы отправляем на сервак фото то это не JSON и надо писать так */
    formData.append(
      "image",
      photoFile
    ); /* append добавить в конец image это из API что ожидает и photoFile сам файл */
    return instance.put(`profile/photo`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }); /* Вторым параметрам отправляем на сервак formData, третьим параметрам настраиваем специфические заголовки headers: {
      "Content-Type": "multipart/form-data",
    },  так как фото */
  },
  saveProfile(profile) {
    /* Передаем наш профайл */
    return instance.put(`profile`, profile);
  },
};

/* Для HeaderContainer */
export const authAPI = {
  me() {
    return instance.get(`auth/me`);
  },
  /* По документации API смотрим что мы должны отправить 
  капчу будем позже разбирать */
  login(email, password, rememberMe = false, captcha = null) {
    return instance.post(`auth/login`, {
      email,
      password,
      rememberMe,
      captcha,
    });
  },
  logout() {
    return instance.delete(`auth/login`);
  },
}; /* login(email, password, rememberMe = false) если данные не придут то будет false */

/* Для Captcha */
export const securityAPI = {
  getCaptchaUrl() {
    return instance.get(`security/get-captcha-url`);
  },
};
