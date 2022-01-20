interface StorageInterface {

  /** 设置 localStorage */
  set: (key: string, value: any) => void

  /** 获取 localStorage */
  get: (key: string) => string | Record<any, any>;

  /** 删除 */
  remove: (key: string) => void;

  /** 清空 */
  clear: () => void;

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

export const session = new SessionStorage(window.sessionStorage);
export const local = new LocalStorage(window.localStorage);