export default class RestrictedSort {
  constructor(steps, workingArray, number) {
    // add markersteps (have markers follow a predetermined order)
    this.selectedNums = [];
    this.steps = steps; // check which step we are on...
    this.workingArray = workingArray;
    this.number = number;

    this._handleSwap = this._handleSwap.bind(this);
    document
      .querySelectorAll(".sort" + this.number)
      .forEach((box) => box.addEventListener("click", this._handleSwap));
    this._nextStep = this._nextStep.bind(this);
    document.querySelector("#next5").addEventListener("click", this._nextStep);
    this._toggleSwap = this._toggleSwap.bind(this);
    document
      .querySelector("#toggle")
      .addEventListener("change", this._toggleSwap);

    this.stepsIndex = 0;
    this.posIndex = 1;
    this.swapIndex = 2;
    this.posUpperBound = 5;
    this.showSwap = false;

    document
      .getElementById("sort" + this.number + "box" + this.posIndex)
      .classList.add("posBox");
  }
  _nextStep() {
    this.selectedNums = [];
    let posElem = document.getElementById(
      "sort" + this.number + "box" + this.posIndex
    );
    let posVal = posElem.children[0].id[8];
    let swapElem = document.getElementById(
      "sort" + this.number + "box" + this.swapIndex
    );
    let swapVal = swapElem.children[0].id[8];
    if (
      this.steps[this.stepsIndex].indexOf(posVal) === -1 ||
      this.steps[this.stepsIndex].indexOf(swapVal) === -1
    ) {
      if (this.posIndex === this.posUpperBound) {
        // if you are not supposed to swap the current values, move on
        // the steps below are only true for bubble sort
        document
          .getElementById(
            "sort" + this.number + "box" + (this.posUpperBound + 1)
          )
          .classList.add("sorted");
        this.posIndex = 1;
        this.swapIndex = 2;
        this.posUpperBound -= 1;
      } else {
        this.posIndex += 1;
        this.swapIndex += 1;
      }
      let newPosElem = document.getElementById(
        "sort" + this.number + "box" + this.posIndex
      );
      posElem.classList.remove("posBox");
      newPosElem.classList.add("posBox");
      if (this.showSwap) {
        let newSwapElem = document.getElementById(
          "sort" + this.number + "box" + this.swapIndex
        );
        swapElem.classList.remove("swapBox");
        newSwapElem.classList.add("swapBox");
      }
    } else {
      console.log("you are supposed to swap the current values");
    }
  }
  _handleSwap(event) {
    // after x amount of steps, give option to move on

    let posVal = document.getElementById(
      "sort" + this.number + "box" + this.posIndex
    ).children[0].id[8];

    let swapVal = document.getElementById(
      "sort" + this.number + "box" + this.swapIndex
    ).children[0].id[8];

    if (this.stepsIndex < this.steps.length) {
      //let targetId = event.target.id;
      //let value = document.getElementById(targetId).children[0];
      let value = event.target;
      if (this.selectedNums.length === 0) {
        this.selectedNums.push(value);
        value.classList.add("selected");
      } else if (this.selectedNums[0] === value) {
        this.selectedNums.pop();
        value.classList.remove("selected");
      } else if (
        // need to make sure that the current positions have been selected
        this.steps[this.stepsIndex].indexOf(this.selectedNums[0].id[8]) ===
          -1 ||
        this.steps[this.stepsIndex].indexOf(value.id[8]) === -1
      ) {
        this.selectedNums[0].classList.remove("selected");

        console.log("invalid move"); // highlight the hint/the correct elements to swap
        this.selectedNums = []; // add animation
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
        this.selectedNums[0].classList.remove("selected");
        this.selectedNums[1].classList.remove("selected");
        this.selectedNums = [];

        console.log(this.steps);
        if (this.stepsIndex === this.steps.length - 1) {
          console.log("sorted!");
          // turn all the shells into colors
        } else {
          this.stepsIndex += 1;
        }
      }
    }
  }
  _toggleSwap() {
    this.showSwap = !this.showSwap;
    let posElem = document.getElementById(
      "sort" + this.number + "box" + this.swapIndex
    );
    if (this.showSwap) {
      posElem.classList.add("swapBox");
    } else {
      posElem.classList.remove("swapBox");
    }
  }
}
