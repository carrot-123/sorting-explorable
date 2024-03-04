export default class ComputerSort {
  constructor(sortedArray, workingArray, number) {
    this.selectedNums = [];
    this.sortedArray = sortedArray;
    this.workingArray = workingArray;
    this.number = number;
    this._handleSwap = this._handleSwap.bind(this);
    this.posIndex = 1;
    this.nextIndex = 2;
    this.posUpperBound = 5;
    this._nextStep = this._nextStep.bind(this);
    document
      .querySelector("#step" + this.number)
      .addEventListener("click", this._nextStep);
    document
      .querySelectorAll(".sort" + this.number)
      .forEach((box) => box.addEventListener("click", this._handleSwap));
  }
  _nextStep(event) {
    this.selectedNums = [];
    let posElem = document.getElementById(
      "sort" + this.number + "box" + this.posIndex
    );
    let nextElem = document.getElementById(
      "sort" + this.number + "box" + this.nextIndex
    );
    if (this.posIndex === this.posUpperBound) {
      this.posIndex = 1;
      this.nextIndex = 2;
    } else {
      this.posIndex += 1;
      this.nextIndex += 1;
    }
    let newPosElem = document.getElementById(
      "sort" + this.number + "box" + this.posIndex
    );
    let newNextElem = document.getElementById(
      "sort" + this.number + "box" + this.nextIndex
    );
    posElem.classList.add("hideBox");
    nextElem.classList.add("hideBox");
    newPosElem.classList.remove("hideBox");
    newNextElem.classList.remove("hideBox");
  }
  _handleSwap(event) {
    let targetId = event.target.id;
    let value = document.getElementById(targetId).children[0];
    if (this.selectedNums.length === 0) {
      this.selectedNums.push(value);
      value.classList.add("selected");
    } else if (this.selectedNums[0] === value) {
      this.selectedNums.pop();
      value.classList.remove("selected");
    } else {
      // swap html elements
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

      // swap workingArray elements
      let pos1 = this.workingArray.indexOf(child1.textContent);
      let pos2 = this.workingArray.indexOf(child2.textContent);
      let temp = child1.textContent;
      this.workingArray[pos1] = child2.textContent;
      this.workingArray[pos2] = temp;
      console.log(this.workingArray);

      // check if the array is sorted
      if (
        JSON.stringify(this.workingArray) === JSON.stringify(this.sortedArray)
      ) {
        console.log("sorted!");
      }
    }
  }
}
