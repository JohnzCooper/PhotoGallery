const HttpClient = (() => {
  const Request = (type, dataType, url, data) => {
    return $.ajax({
      type: type,
      dataType: dataType,
      url: url,
      data: JSON.stringify(data),
      headers: {"token": App.Token},
      beforeSend: (xhr) => {
        xhr.setRequestHeader("Content-type", "application/json");
      },
    });
  };

  return {
      Request
  }
})();
