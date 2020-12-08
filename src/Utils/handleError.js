const handleError = (error: any) => {
  const { status, message } = error;
  switch (status) {
    case 401:
      alert("Error 401", message);
      break;
    case 403:
      alert("Error 403");
      break;
    case 500:
      alert("Error 500");
      break;
    default:
      alert("Something went wrong" +message);
      break;
  }
  return error
};

export default handleError;
