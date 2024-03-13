// rename to bubble sort
export default class BubbleSort {
  constructor(steps, workingArray, number) {
    // add markersteps (have markers follow a predetermined order)
    this.selectedNums = []; // array to track which shells are selected to be swapped
    this.steps = steps; // track where we are in the steps array
    this.workingArray = workingArray;
    this.number = number;
    this._numSwaps = 0;
    this._numLooks = 2;
    this._sorted = false;
    this._swapped = false;

    this.stepsIndex = 0;
    this.posIndex = 1;
    this.swapIndex = 2;
    this.posUpperBound = 5;
    this.showAll = false;

    this._handleSwap = this._handleSwap.bind(this);
    document
      .querySelectorAll(".sort" + this.number)
      .forEach((box) => box.addEventListener("click", this._handleSwap));
    this._nextStep = this._nextStep.bind(this);
    document.querySelector("#next5").addEventListener("click", this._nextStep);
    this._toggleShowAll = this._toggleShowAll.bind(this);
    document
      .querySelector("#toggle")
      .addEventListener("change", this._toggleShowAll);

    document
      .getElementById("sort" + this.number + "box" + this.posIndex)
      .classList.add("posBox");
  }
  _nextStep() {
    // pressing next
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
      // if you are not supposed to swap the shells
      this.steps[this.stepsIndex].indexOf(posVal) === -1 ||
      this.steps[this.stepsIndex].indexOf(swapVal) === -1
    ) {
      if (this.posIndex === this.posUpperBound) {
        // if we reached the end of the array
        // reaching the end of an array in bubble sort means that the last element is in its correct place
        document
          .getElementById("sort5pic" + (this.posUpperBound + 1))
          .classList.add("hidden");
        document
          .getElementById("sort5pic" + (this.posUpperBound + 1) + "color")
          .classList.remove("hidden");
        posElem.classList.add(".sorted");

        this.posIndex = 1;
        this.swapIndex = 2;
        this.posUpperBound -= 1;
        this._numLooks += 2;
        document.getElementById("looks5").textContent =
          "Number of looks: " + this._numLooks;
      } else {
        this.posIndex += 1;
        this.swapIndex += 1;
        this._numLooks += 1;
        document.getElementById("looks5").textContent =
          "Number of looks: " + this._numLooks;
      }
      let newPosElem = document.getElementById(
        "sort" + this.number + "box" + this.posIndex
      );
      posElem.classList.remove("posBox");
      newPosElem.classList.add("posBox");
      let newSwapElem = document.getElementById(
        "sort" + this.number + "box" + this.swapIndex
      );
      document.getElementById("varBox5").src = newSwapElem.children[0].src;
      this._swapped = false;
      if (!this.showAll) {
        posElem.classList.add("hideBox");
        swapElem.classList.remove("hideBox");
        newSwapElem.classList.remove("hideBox");
      }
    } else if (!this._sorted) {
      // if you are supposed to swap the current values
      console.log("you are supposed to swap the current values");
      document.getElementById("sort5step1").classList.remove("highlight");
      void document.getElementById("sort5step1").offsetWidth;
      document.getElementById("sort5step1").classList.add("highlight");
    }
  }
  _handleSwap(event) {
    // after x amount of steps, give option to move on
    if (!this._sorted) {
      let posVal = document.getElementById(
        "sort" + this.number + "box" + this.posIndex
      ).children[0].id[8];
      let swapVal = document.getElementById(
        "sort" + this.number + "box" + this.swapIndex
      ).children[0].id[8];
      if (this.stepsIndex < this.steps.length) {
        let value = event.target;
        console.log("value:");
        console.log(value);
        if (this.selectedNums.length === 0) {
          // if this is the first shell to be selected
          this.selectedNums.push(value);
          value.classList.add("selected");
          console.log("here!!");
        } else if (this.selectedNums[0] === value) {
          // if the user clicks the same shell, cancel the selection
          this.selectedNums.pop();
          value.classList.remove("selected");
          console.log("here?");
        } else if (
          // if they are trying to perform an invalid move (either swapping wrong shells or not pressing next)
          this._swapped ||
          this.steps[this.stepsIndex].indexOf(this.selectedNums[0].id[8]) ===
            -1 ||
          this.steps[this.stepsIndex].indexOf(value.id[8]) === -1
        ) {
          if (!this._sorted) {
            if (
              // if they already swapped the correct elements but they are not pressing next (trying to keep swapping)
              this.steps[this.stepsIndex].indexOf(posVal) === -1
            ) {
              document
                .getElementById("sort5step2")
                .classList.remove("highlight");
              void document.getElementById("sort5step2").offsetWidth;
              document.getElementById("sort5step2").classList.add("highlight");
            } else {
              // if they are trying to swap the wrong shells
              document
                .getElementById("sort5step1")
                .classList.remove("highlight");
              void document.getElementById("sort5step1").offsetWidth;
              document.getElementById("sort5step1").classList.add("highlight");
            }
          }

          this.selectedNums[0].classList.remove("selected");
          console.log("invalid move");
          this.selectedNums = [];
        } else if (
          this.steps[this.stepsIndex].indexOf(posVal) > -1 &&
          this.steps[this.stepsIndex].indexOf(swapVal) > -1
        ) {
          // if they are swapping the correct shells, perform the swap
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
          document.getElementById("varBox5").src = document.getElementById(
            "sort" + this.number + "box" + this.swapIndex
          ).children[0].src;
          this._numSwaps += 1;
          document.getElementById("swaps5").textContent =
            "Number of swaps: " + this._numSwaps;
          this._swapped = true;

          console.log(this.steps);
          if (this.stepsIndex === this.steps.length - 1) {
            // if the array is sorted
            this._sorted = true;
            console.log("sorted!");
            for (let i = 1; i <= 6; i++) {
              document.getElementById("sort5pic" + i).classList.add("hidden");
              document
                .getElementById("sort5pic" + i + "color")
                .classList.remove("hidden");
              document
                .getElementById("sort" + this.number + "box" + i)
                .classList.remove("hideBox");
            }
            document
              .getElementById("sort" + this.number + "box" + this.posIndex)
              .classList.remove("posBox");
          } else {
            // if the array is not yet sorted, continue to the next step
            console.log("here");
            this.stepsIndex += 1;
          }
        } else {
          console.log("sadge");
        }
      }
    } else {
    }
  }
  _toggleShowAll() {
    this.showAll = !this.showAll;
    let swapElem = document.getElementById(
      "sort" + this.number + "box" + this.swapIndex
    );
    let posElem = document.getElementById(
      "sort" + this.number + "box" + this.posIndex
    );
    if (this.showAll) {
      document
        .querySelectorAll(".sort5")
        .forEach((box) => box.classList.remove("hideBox"));
    } else {
      for (let i = 1; i <= this.posUpperBound + 1; i++) {
        document
          .getElementById("sort" + this.number + "box" + i)
          .classList.add("hideBox");
      }
      posElem.classList.remove("hideBox");
      swapElem.classList.remove("hideBox");
    }
  }
}
