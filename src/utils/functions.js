export const setIntoLocalStorage = (key, value) => {
  return localStorage.setItem(key, JSON.stringify(value));
}

export const getFromLocalStorage = (key) => {
  return JSON.parse(localStorage.getItem(key))
}