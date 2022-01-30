const singletonEnforcer = Symbol();

class CookieHandler {
  static cookieHandlerInstance: any;
  constructor(enforcer: any) {
    if (enforcer !== singletonEnforcer) {
      throw new Error('Cannot initialize Cookie single instance');
    }
  }
  static get instance() {
    if (!this.cookieHandlerInstance) {
      this.cookieHandlerInstance = new CookieHandler(singletonEnforcer);
    }
    return this.cookieHandlerInstance;
  }
  setCookie(name: string, value: any, minutesExpired: number) {
    const date = new Date();
    date.setMinutes(date.getMinutes() + minutesExpired);
    const expires = `expires=${date.toUTCString()}`;
    document.cookie = `${name}=${value};${expires};path=/`;
  }
  removeCookie(name: string) {
    try {
      document.cookie = `${name}=;expires=Thu, 01 Jan 1970 00:00:01 GMT;path=/`;
    } catch (error) {
      console.log(error);
    }
  }
  getCookie(name: string) {
    try {
      const value = `; ${document.cookie}`;
      const parts = value.split(`; ${name}=`);
      if (parts.length === 2) {
        const partsPop = parts.pop();
        if (partsPop)
          return partsPop.split(';').shift();
      }
      return '';
    } catch (error) {
      return '';
    }
  }
  checkCookie(name: string) {
    try {
      const value = this.getCookie(name);

      if (value !== '' && value) {
        return true;
      }
      return false;
    } catch (error) {
      return false;
    }
  }
}
export default CookieHandler.instance;