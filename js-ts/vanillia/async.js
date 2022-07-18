function loadDataFromAPI() {
  return new Promise((resolve, reject) => {
    const apiUrl = 'http://www.angular.at/api/';
    const xmlHttp = new XMLHttpRequest();
    xmlHttp.onreadystatechange = function () {
      if (this.readyState == 4 && this.status == 200) {
        console.info('[xhr] readyState: ' + this.readyState);
        console.info('[xhr] status: ' + this.status);
        resolve(JSON.parse(this.responseText));
      } else if (this.status && this.status !== 200) {
        console.warn('[xhr] readyState: ' + this.readyState);
        console.warn('[xhr] status: ' + this.status);
        reject(this);
      } else {
        console.debug('[xhr] readyState: ' + this.readyState);
        console.debug('[xhr] status: ' + this.status);
      }
    };
    xmlHttp.open('GET', apiUrl + 'passagier?name=Muster', true);
    xmlHttp.send();
  });
}
