const byte = 1;
const kiloByte = 1000 * byte;
const megaByte = 1000 * kiloByte;
const gigaByte = 1000 * megaByte;
const teraByte = 1000 * gigaByte;
const petaByte = 1000 * teraByte;
const zetaByte = 1000 * petaByte;

const parseBytes = (bytes = 0) => {
  bytes = Number.parseInt(bytes);
  switch (true) {
  case bytes >= zetaByte:
    return `${(bytes / zetaByte).toFixed(2)} ZB`;
  case bytes >= petaByte:
    return `${(bytes / petaByte).toFixed(2)} PB`;
  case bytes >= teraByte:
    return `${Number((bytes / teraByte).toFixed(2)).toLocaleString()} TB`;
  case bytes >= gigaByte:
    return `${Number((bytes / gigaByte).toFixed(2)).toLocaleString()} GB`;
  case bytes >= megaByte:
    return `${Number((bytes / megaByte).toFixed(2)).toLocaleString()} MB`;
  case bytes >= kiloByte:
    return `${Number((bytes / kiloByte).toFixed(2)).toLocaleString()} KB`;
  default:
    return `${Number(bytes).toLocaleString()} Bytes`;
  }
};

export { parseBytes as default, parseBytes };
