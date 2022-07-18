function loadDataFromAPI() {
  const xmlHttp = new XMLHttpRequest();
  xmlHttp.onreadystatechange = function () {
    if (this.readyState == 4 && this.status == 200) {
      console.log(this.responseText);
    }
  };

  xmlHttp.open('GET', apiUrl + 'passagier?name=Muster', true);
  xmlHttp.send();
}
