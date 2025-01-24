export const hasCookie = (cookieName:string) => {
    const cookies = document.cookie.split(';').map(cookie => cookie.trim());
    return cookies.some(cookie => cookie.startsWith(`${cookieName}=`));
  };