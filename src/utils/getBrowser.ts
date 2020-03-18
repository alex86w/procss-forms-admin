export type BrowserType =
  | 'Opera'
  | 'Firefox'
  | 'Chrome'
  | 'Safari'
  | 'IE'
  | undefined;

export const getBrowser: () => BrowserType = function() {
  const userAgent = navigator.userAgent;
  const isOpera = userAgent.indexOf('Opera') > -1;
  const isFirefox = userAgent.indexOf('Firefox') > -1;
  const isChrome = userAgent.indexOf('Chrome') > -1;
  const isSafari = userAgent.indexOf('Safari') > -1;
  const isIE =
    userAgent.indexOf('compatible') > -1 &&
    userAgent.indexOf('MSIE') > -1 &&
    !isOpera;
  if (isOpera) {
    return 'Opera';
  }
  if (isFirefox) {
    return 'Firefox';
  }
  if (isChrome) {
    return 'Chrome';
  }
  if (isSafari) {
    return 'Safari';
  }
  if (isIE) {
    return 'IE';
  }
};
