const MILLIS_IN_MIN = 1000 * 60;
const MILLIS_IN_HOUR = MILLIS_IN_MIN * 60;
const MILLIS_IN_DAY = MILLIS_IN_HOUR * 24;

class Timer {
  constructor(component) {
    this.displayComponent = component.querySelector('.time-display');
    this.data = component.dataset;

    this.countDownDate = new Date(this.data.endTime).getTime();
    this.counter = setInterval(this.setTimer.bind(this), 1000);
    this.setTimer();
    this.setTimeoutRedirect();
  }

  setTimer() {
    const now = new Date().getTime();
    const distance = this.countDownDate - now;

    const hours = Math.floor((distance % MILLIS_IN_DAY) / MILLIS_IN_HOUR);
    const minutes = Math.floor((distance % MILLIS_IN_HOUR) / MILLIS_IN_MIN);
    const seconds = ('0' + Math.floor((distance % MILLIS_IN_MIN) / 1000)).slice(-2);
    let time = (hours > 0) ? hours+':'+('0'  + minutes).slice(-2) : minutes
    time = time+':'+seconds
    this.displayComponent.innerHTML = time;

    if (distance < 0) {
      clearInterval(this.counter);
      this.displayComponent.innerHTML = this.data.expiredMessage;
    }
  }

  setTimeoutRedirect() {
    if (this.data.deleteUrl){
      const now = new Date().getTime();
      const distance = this.countDownDate - now;
      setTimeout(() => {
        const xhr = new XMLHttpRequest();
        xhr.onreadystatechange = () => {
          if (xhr.readyState === XMLHttpRequest.DONE) {
            if (xhr.status >= 200 && xhr.status < 300) {
              let redirect = new URL(this.data.redirectUrl, location.origin);
              for (let key in this.data.redirectParams) {
                redirect.searchParams.append(key, this.data.redirectParams[key]);
              }
              redirect.searchParams.append('snackbar', encodeURI(this.data.expiredMessage));
              window.location = redirect.href;
            }
          }
        };
        xhr.open("DELETE", this.data.deleteUrl, true);
        xhr.setRequestHeader('Content-Type', 'application/json');
        xhr.send(decodeURIComponent(this.data.deleteParams));
      }, distance);
    }
  }
}
