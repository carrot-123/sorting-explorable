export default class ComputerSort {
  constructor(sortedArray, workingArray, number) {
    this.selectedNums = [];
    this.sortedArray = sortedArray;
    this.workingArray = workingArray;
    this.number = number;
    this._handleSwap = this._handleSwap.bind(this);
    //this._posIndex = 1;
    //this._nextIndex = 2;
    //this.posUpperBound = 5;
    //this._nextStep = this._nextStep.bind(this);
    this._swap = false;
    this._prevVal = null;
    this._currVal = null;
    this._numLooks = 0;
    this._numSwaps = 0;
    this._sorted = false;
    /*document
      .querySelector("#next" + this.number)
      .addEventListener("click", this._nextStep);*/
    document
      .querySelectorAll(".sort" + this.number)
      .forEach((box) => box.addEventListener("click", this._handleSwap));
  }
  /*_nextStep(event) {
    this.selectedNums = [];
    let posElem = document.getElementById(
      "sort" + this.number + "box" + this._posIndex
    );
    let nextElem = document.getElementById(
      "sort" + this.number + "box" + this._nextIndex
    );
    if (this._posIndex === this.posUpperBound) {
      this._posIndex = 1;
      this._nextIndex = 2;
    } else {
      this._posIndex += 1;
      this._nextIndex += 1;
    }
    let newPosElem = document.getElementById(
      "sort" + this.number + "box" + this._posIndex
    );
    let newNextElem = document.getElementById(
      "sort" + this.number + "box" + this._nextIndex
    );
    posElem.classList.add("hideBox");
    nextElem.classList.add("hideBox");
    newPosElem.classList.remove("hideBox");
    newNextElem.classList.remove("hideBox");
  }*/
  _handleSwap(event) {
    if (!this._sorted) {
      let value = event.target;
      if (!this._swap) {
        console.log("here");
        console.log(value.parentElement);
        value.parentElement.classList.remove("hideBox");
        if (this._numLooks === 0) {
          this._numLooks += 1;
          document.getElementById("looks4").textContent =
            "Number of looks: " + this._numLooks;
        }
        /*if (!this._currVal) {
          this._currVal = value;
        } else {
          console.log(this._currVal);
          this._currVal.parentElement.classList.add("hideBox");
          this._currVal = value;
        }*/
        if (value === this._prevVal) {
          console.log("changing to swap");
          this._swap = true;
        } else if (this._prevVal) {
          console.log("preval");
          console.log(this._prevVal);
          this._prevVal.parentElement.classList.add("hideBox");

          this._prevVal = value;
          this._numLooks += 1;
          document.getElementById("looks4").textContent =
            "Number of looks: " + this._numLooks;
        } else {
          this._prevVal = value;
        }
      }
      //let targetId = event.target.id;
      //let value = document.getElementById(targetId).children[0];
      if (this._swap) {
        if (this.selectedNums.length === 0) {
          this.selectedNums.push(value);
          value.classList.add("selected");
        } else if (this.selectedNums[0] === value) {
          this.selectedNums.pop();
          value.classList.remove("selected");
          this._swap = false;
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
          this._prevVal.parentElement.classList.remove("hideBox");
          this.selectedNums[1].parentElement.classList.add("hideBox");
          this.selectedNums = [];
          this._swap = false;
          this._numSwaps += 1;
          document.getElementById("swaps4").textContent =
            "Number of swaps: " + this._numSwaps;

          // swap workingArray elements
          /*let pos1 = this.workingArray.indexOf(child1.textContent);
          let pos2 = this.workingArray.indexOf(child2.textContent);
          let temp = child1.textContent;
          this.workingArray[pos1] = child2.textContent;
          this.workingArray[pos2] = temp;
          console.log(this.workingArray);*/
          let pos1 = this.workingArray.indexOf(child1.id[8].toString());
          console.log(pos1);
          let pos2 = this.workingArray.indexOf(child2.id[8].toString());
          let temp = child1.id[8].toString();
          this.workingArray[pos1] = child2.id[8].toString();
          this.workingArray[pos2] = temp;
          console.log(this.workingArray);

          // check if the array is sorted
          if (
            JSON.stringify(this.workingArray) ===
            JSON.stringify(this.sortedArray)
          ) {
            this._sorted = true;

            for (let i = 1; i <= 6; i++) {
              /*console.log(i);
              console.log(document.getElementById("sort3pic" + i));
              document.getElementById("sort3pic" + i).src =
                "images/" + i + "_color.png";*/
              document.getElementById("sort4pic" + i).classList.add("hidden");
              document
                .getElementById("sort4pic" + i + "color")
                .classList.remove("hidden");
              document
                .getElementById("sort" + this.number + "box" + i)
                .classList.remove("hideBox");
            }
            document
              .getElementById("followUp" + this.number)
              .classList.remove("hidden");
            document
              .getElementById("cont" + this.number)
              .classList.remove("hidden");
          }
        }
      }
    }
  }
}
