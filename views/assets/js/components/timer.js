const MILLIS_IN_MIN = 1000 * 60;
const MILLIS_IN_HOUR = MILLIS_IN_MIN * 60;
const MILLIS_IN_DAY = MILLIS_IN_HOUR * 24;
const WARN_THRESHOLD = MILLIS_IN_MIN * 2;

class Timer {
  constructor(component) {
    this.component = component;
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
    if (distance < WARN_THRESHOLD) {
      this.component.style.backgroundColor = this.data.warnColor;
    } else {
      this.component.style.backgroundColor = this.data.color;
    }

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
              const redirect = new URL(this.data.redirectUrl, location.origin);
              const redirectParams = JSON.parse(this.data.redirectParams);
              for (const key in redirectParams) {
                redirect.searchParams.append(key, redirectParams[key]);
              }
              redirect.searchParams.append('snackbar', this.data.expiredMessage);
              window.location = redirect.href;
            }
          }
        }
        ;
        const formData = new FormData();
        const deleteParams = JSON.parse(this.data.deleteParams)
        for (const [name, value] of Object.entries(deleteParams)) {
          formData.append(name, value);
        }

        const csrf_meta_token = document.querySelector('meta[name=csrf-token]');
        const csrf_meta_param = document.querySelector('meta[name=csrf-param]');
        if (csrf_meta_token && csrf_meta_param) {
          formData.append(csrf_meta_param.content, csrf_meta_token.content);
        }

        xhr.open("DELETE", this.data.deleteUrl, true);
        xhr.send(formData);
      }, distance);
    }
  }
}
