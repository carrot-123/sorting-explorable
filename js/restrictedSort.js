export default class RestrictedSort {
  constructor(steps, workingArray, sortNumber) {
    // add markersteps (have markers follow a predetermined order)
    this.selectedNums = [];
    this.steps = steps; // check which step we are on...
    this.workingArray = workingArray;
    this.number = sortNumber;
    this.sortNumber = ".sort" + sortNumber;
    this._handleSwap = this._handleSwap.bind(this);
    document
      .querySelectorAll(this.sortNumber)
      .forEach((box) => box.addEventListener("click", this._handleSwap));
    this._stepOne = this._stepOne.bind(this);
    document.querySelector("#step").addEventListener("click", this._stepOne);
    this.stepsIndex = 0;
    this.posIndex = 1;
    this.swapIndex = 2;
    this.posUpperBound = 5;
  }
  _stepOne() {
    this.selectedNums = [];
    let posVal = document.getElementById(
      "sort" + this.number + "box" + this.posIndex
    ).children[0].textContent;
    let swapVal = document.getElementById(
      "sort" + this.number + "box" + this.swapIndex
    ).children[0].textContent;

    if (
      this.steps[this.stepsIndex].indexOf(posVal) === -1 ||
      this.steps[this.stepsIndex].indexOf(swapVal) === -1
    ) {
      if (this.posIndex === this.posUpperBound) {
        // if you are not supposed to swap the current values, move on
        // the steps below are only true for bubble sort
        this.posIndex = 1;
        this.swapIndex = 2;
        this.posUpperBound -= 1;
      } else {
        this.posIndex += 1;
        this.swapIndex += 1;
      }
    } else {
      console.log("you are supposed to swap the current values");
    }
    console.log(this.posIndex);
    console.log(this.swapIndex);
  }
  _handleSwap(event) {
    // after x amount of steps, give option to move on
    let targetId = event.target.id;
    console.log(targetId);
    console.log("sort" + this.number + "box" + this.posIndex);
    let posVal = document.getElementById(
      "sort" + this.number + "box" + this.posIndex
    ).children[0].textContent;
    let swapVal = document.getElementById(
      "sort" + this.number + "box" + this.swapIndex
    ).children[0].textContent;

    if (this.stepsIndex < this.steps.length) {
      let targetId = event.target.id;
      let value = document.getElementById(targetId).children[0];
      if (this.selectedNums.length === 0) {
        this.selectedNums.push(value);
      } else if (this.selectedNums[0] === value) {
        this.selectedNums.pop();
      } else if (
        // need to make sure that the current positions have been selected
        this.steps[this.stepsIndex].indexOf(
          this.selectedNums[0].textContent
        ) === -1 ||
        this.steps[this.stepsIndex].indexOf(value.textContent) === -1
      ) {
        console.log("invalid move"); // highlight the hint/the correct elements to swap
        this.selectedNums = [];
      } else if (
        this.steps[this.stepsIndex].indexOf(posVal) > -1 &&
        this.steps[this.stepsIndex].indexOf(swapVal) > -1
      ) {
        this.selectedNums.push(value);
        let child1 = this.selectedNums[0];
        let parent1 = child1.parentElement;
        let child2 = this.selectedNums[1];
        let parent2 = child2.parentElement;
        parent1.prepend(child2);
        parent2.prepend(child1);
        this.selectedNums = [];

        console.log(this.steps);
        if (this.stepsIndex === this.steps.length - 1) {
          console.log("sorted!");
        } else {
          this.stepsIndex += 1;
        }
      }
    }
  }
}
