import moment from 'moment';

export const _now = new Date();

export const phoneFormat = /[^0-9]/gm;

export const phoneRegExp =
  // eslint-disable-next-line no-useless-escape
  /^(?!(-))((([(][+]?[0-9]+[)]|([+][(][0-9]+[)])))|[+]{0,1})?([-\s]?[0-9])*$/g;

export const formatNumber = (num: number) => {
  return num < 10 ? '0' + num.toString() : num.toString();
};

export const escapeHtml = (unsafe: string) => {
  return unsafe
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#039;');
};

export const validPhoneNumber = (str: string) => {
  const pattern = new RegExp(phoneRegExp); // fragment locator
  return !!pattern.test(str);
};

export const validURL = (str: string) => {
  const pattern = new RegExp(
    '^(https?:\\/\\/)?' + // protocol
      '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|' + // domain name
      '((\\d{1,3}\\.){3}\\d{1,3}))' + // OR ip (v4) address
      '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*' + // port and path
      '(\\?[;&a-z\\d%_.~+=-]*)?' + // query string
      '(\\#[-a-z\\d_]*)?$',
    'i',
  ); // fragment locator
  return !!pattern.test(str);
};

export const formatHours = (date: string) => {
  return moment(date).format('h a');
};

export const reviewsColourCodes = (number: number) => {
  if (number >= 85) return '#00A175';
  if (number >= 75) return '#03C691';
  if (number >= 50) return '#FFBE00';
  if (number >= 30) return '#FF7456';
  return 'red';
};

export const slugify = (text: string) => {
  if (!text) return '';
  return (
    text
      .toString()
      .normalize('NFKD') // The normalize() using NFKD method returns the Unicode Normalization Form of a given string.
      .replace(/[đĐ]/g, 'd') // đ is not transformed by NFKD
      .replace(/[\u0300-\u036f]/g, '')
      .toLowerCase() // Convert the string to lowercase letters
      .trim() // Remove whitespace from both sides of a string (optional)
      .replace(/\s+/g, '-') // Replace spaces with -
      // eslint-disable-next-line no-useless-escape
      .replace(/[^\w\-]+/g, '') // Remove all non-word chars
      // eslint-disable-next-line no-useless-escape
      .replace(/\-\-+/g, '-')
  ); // Replace multiple - with single -
};

export const createRestaurantDetailHref = (slug = '') => `/restaurant/${slug}`;

export const scrollToId = (id: string, fixedHeaderHeight = 0) => {
  const ref = document.getElementById(id);
  if (ref)
    window.scrollTo({
      behavior: 'smooth',
      top: ref?.offsetTop - fixedHeaderHeight,
    });
};

export const getFullImageUrl = (path: string) => {
  if (path.includes('http')) return path;
  return `${process.env.CDN_IMAGE_URL}/${path}`;
};

export const formatTime = (time: string) => {
  let formatTime = time;
  formatTime = time.replace(/^0|:00/gm, '');
  if (formatTime[0] === ':' || formatTime[0] === ' ')
    return (formatTime = `0${formatTime}`);
  return formatTime;
};
