class Timer {
  constructor(component) {
    console.log('\tTimer');
    this.component = component;
    this.data = this.component.dataset;
    const countDownDate = new Date(this.data.endTime).getTime();

    const counter = setInterval(() => {
      const now = new Date().getTime();
      const distance = countDownDate - now;

      let hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      let minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
      let seconds = ('0' + Math.floor((distance % (1000 * 60)) / 1000)).slice(-2);
      let time = (hours > 0) ? hours+':'+('0'  + minutes).slice(-2) : minutes
      time = time+':'+seconds
      this.component.querySelector(".time-display").innerHTML = time;

      if (distance < 0) {
        clearInterval(counter);
        this.component.querySelector(".time-display").innerHTML = this.data.expiredMessage;
      }
    }, 1000);
  }
}