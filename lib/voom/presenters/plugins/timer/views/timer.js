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
}
