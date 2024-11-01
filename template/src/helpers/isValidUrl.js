const isValidURL = (url = "") => {
  if (url && url.length > 0 && url.match(/^(https?:\/\/)(localhost|\w+([-.]\w+)*(\.[a-z]{2,})?)(:\d+)?(\/.*)?$/gs)) {
    return true;
  }
  return false;
};

export { isValidURL as default, isValidURL };
