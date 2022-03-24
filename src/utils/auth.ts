import { TOKEN_NAME } from '@/config/global';

/**
 * 获取token
 * @param {string} rename
 * @returns {string} token
 */
export function getToken(rename = TOKEN_NAME) {
  return localStorage.getItem(rename);
}

/**
 * 设置token
 * @param {string} token
 * @param {string} rename
 */
export function setToken(token, rename = TOKEN_NAME) {
  localStorage.setItem(rename, token);
}

/**
 * 删除token
 * @param {string} rename
 */
export function removeToken(rename = TOKEN_NAME) {
  localStorage.removeItem(rename);
}

/**
 * 清空localStorage
 */
export function clearLocal() {
  localStorage.clear();
}

/**
 * 设置localStorage
 * @param {string} keyName
 * @param {string} value
 */
export function setLocal(keyName = '', value = '') {
  localStorage.setItem(keyName, value);
}

/**
 * 删除localStorage指定项
 * @param {string} keyName
 */
export function removeLocal(keyName = '') {
  localStorage.removeItem(keyName);
}
