export const arrToStr = (arr?: string[] | string, splitter = ', '): string => {
  if (!arr) return '';
  if (typeof arr === 'string') return arr;
  return arr.join(splitter);
};

export const getFirstItem = (arr?: string[] | string): string => {
  if (!arr) return '';
  if (typeof arr === 'string') return arr;
  return arr[0];
};

/**
 * @function Replace placeholders
 * @param content
 * @param placeholders
 * @param startTag
 * @param endTag
 */
export const replacer = (
  content: string,
  placeholders: Record<string, unknown>,
  startTag = '{{',
  endTag = '}}',
): string => {
  if (!content || Object.keys(placeholders).length === 0) return content;

  const fileContent = content.split(/\n/);
  Object.keys(placeholders).forEach((key) => {
    const replace = `${startTag}${key}${endTag}`;
    const value = placeholders[key];
    const replaceValue: string = typeof value === 'string' ? value : JSON.stringify(value);
    fileContent.forEach((item, index) => {
      fileContent[index] = item.replaceAll(replace, replaceValue);
    });
  });
  return fileContent.reduce(
    (prev, item, index, array) => (index === array.length - 1 ? prev + item : prev + item + '\n'),
    '',
  );
};

type TMaskProps = { mask: string; realStart: number; realEnd: number };
export const maskString = (str?: string, props: Partial<TMaskProps> = {}): string => {
  const { mask = '...', realStart = 4, realEnd = 4 } = props;
  if (!str) return '';
  return str.slice(0, Math.max(0, realStart)) + mask + str.slice(Math.max(0, str.length - realEnd));
};
