import Cookie, { CookieAttributes, CookiesStatic } from "js-cookie";

interface StorageInterface {

  /** 设置 localStorage */
  set: (key: string, value: any) => void

  /** 获取 localStorage */
  get: (key: string) => any;

  /** 删除 */
  remove: (key: string) => void;

  /** 清空 */
  clear?: () => void;

}


class SessionStorage implements StorageInterface{

  private storage: Storage;
  
  constructor(storage: Storage) {
    this.storage = storage;
  }

  get(key: string): any {
    const val: string = this.storage.getItem(key) as string;
    if (typeof val == "object") {
      return JSON.parse(val);
    } else {
      return val;
    }
  }

  set(key: string, value: any): void {
    if (typeof value == "object") {
      this.storage.setItem(key, JSON.stringify(value));
    } else {
      this.storage.setItem(key, value);
    }
  }

  /** 删除 */
  remove(key: string): void {
    this.storage.removeItem(key);
  }

  clear(): void {
    this.storage.clear();
  }

}

class LocalStorage extends SessionStorage{
  constructor(storage: Storage) {
    super(storage);
  }
}

class CookieStorage implements StorageInterface{
  private cookie: CookiesStatic<object>;
  constructor(cookie: CookiesStatic<object>) {
    this.cookie = cookie;
  }
  get(key: string): any {
    return this.cookie.get(key);
  }

  set(key: string, value: any, options?: CookieAttributes): void {
    this.cookie.set(key, value, options);
  }

  remove(key: string, options?: CookieAttributes): void {
    this.cookie.remove(key);
  }
}


export const sessionStorage = new SessionStorage(window.sessionStorage);
export const localStorage = new LocalStorage(window.localStorage);
export const cookie = new CookieStorage(Cookie);