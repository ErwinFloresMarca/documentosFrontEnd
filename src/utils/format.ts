export declare interface instanceObject {
  [key: string]: string;
}

/**
 * JSON转url参数
 * @param data Json格式数据
 * */
export const formatJsonToUrlParams = (data: instanceObject) => {
  return typeof data === 'object'
    ? Object.keys(data)
        .map((key) => {
          return `${encodeURIComponent(key)}=${encodeURIComponent(data[key])}`;
        })
        .join('&')
    : '';
};

export const unCamelCase = (str: string): string => {
  return (
    str
      // insert a space before all caps
      .replace(/([A-Z])/g, ' $1')
      // uppercase the first character
      .replace(/^./, function (str1: string) {
        return str1.toUpperCase();
      })
  );
};

export default formatJsonToUrlParams;
