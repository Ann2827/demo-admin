const beginSlash = (data: string) => (data[0] === '/' ? data : `/${data}`);

export const withSlash = (data: string | Array<string | undefined>): string => {
  if (Array.isArray(data)) {
    return data.reduce((result: string, item) => (item ? result + beginSlash(item) : result), '').replaceAll('//', '/');
  }
  return beginSlash(data);
};

const getParams = (search: string): Record<string, string> => {
  const list: Record<string, string> = {};
  search
    .replace('?', '')
    .split('&')
    .forEach((item) => {
      const [key, value] = item.split('=');
      if (key && value) {
        list[key] = value;
      }
    });
  return list;
};
export const getParamsValueByKey = (url: string, key: string): string | null => {
  let result: string | null = '';
  try {
    const urlObject = new URL(url);

    // urlObject.searchParams.get(key) декодируют '+'
    const params = getParams(urlObject.search);
    if (params[key]) {
      result = decodeURIComponent(params[key]);
    } else if (urlObject.search.includes(key)) {
      result = null;
    }
  } catch {
    result = null;
    // sentryException(`Invalid URL: ${url}`, 'warning');
  }
  return result;
};
