const fileDownloadHandler = ({ file = null, name = "" }) => {
  if (file) {
    const link = document.createElement("a");
    link.href = file;
    link.setAttribute("download", name);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }
  return;
};

export { fileDownloadHandler as default, fileDownloadHandler };
