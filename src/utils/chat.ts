export const parseMessageString = (text: string) => {
  const urlRegex = /(https?:\/\/[^\s]+)/g;
  return text.split(urlRegex).map((part, i) => {
    if (urlRegex.test(part)) {
      return {
        type: "link",
        value: part,
        key: i,
      };
    }
    return {
      type: "text",
      value: part,
      key: i,
    };
  });
};
