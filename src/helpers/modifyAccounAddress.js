const modifyAccounAddress = (adderss = "") => {
  return `${adderss.slice(0, 8)}...${adderss.slice(adderss.length - 8, adderss.length)}`;
};

export { modifyAccounAddress as default, modifyAccounAddress };
