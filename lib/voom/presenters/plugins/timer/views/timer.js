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
      let seconds = Math.floor((distance % (1000 * 60)) / 1000);

      this.component.querySelector(".time-display").innerHTML = (hours > 0 ? hours+":"+minutes+":"+seconds : minutes+":"+seconds);

      if (distance < 0) {
        clearInterval(x);
        this.component.querySelector(".time-display").innerHTML = this.data.expiredMessage;
      }
    }, 1000);
  }
}