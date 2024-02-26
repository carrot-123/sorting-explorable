export default class RestrictedSort {
  constructor(steps, workingArray, sortNumber) {
    this.selectedNums = [];
    this.steps = steps; // check which step we are on...
    this.workingArray = workingArray;
    this.sortNumber = ".sort" + sortNumber;
    this._handleSwap = this._handleSwap.bind(this);
    document
      .querySelectorAll(this.sortNumber)
      .forEach((box) => box.addEventListener("click", this._handleSwap));
    this.index = 0;
  }
  _handleSwap(event) {
    // after x amount of steps, give option to move on
    if (this.index < this.steps.length) {
      let targetId = event.target.id;
      let value = document.getElementById(targetId).children[0];
      if (this.selectedNums.length === 0) {
        this.selectedNums.push(value);
      } else if (this.selectedNums[0] === value) {
        this.selectedNums.pop();
      } else if (
        this.steps[this.index].indexOf(this.selectedNums[0].textContent) ===
          -1 ||
        this.steps[this.index].indexOf(value.textContent) === -1
      ) {
        console.log("invalid move"); // highlight the hint/the correct elements to swap
        this.selectedNums = [];
      } else {
        this.selectedNums.push(value);
        let child1 = this.selectedNums[0];
        let parent1 = child1.parentElement;
        let child2 = this.selectedNums[1];
        let parent2 = child2.parentElement;
        parent1.prepend(child2);
        parent2.prepend(child1);
        this.selectedNums = [];

        if (this.index === this.workingArray.length - 1) {
          console.log("sorted!");
        } else {
          this.index += 1;
        }
      }
    }
  }
}
