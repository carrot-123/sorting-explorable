export default class InsertionSort {
  constructor(steps, workingArray, number) {
    this.selectedNums = []; // array to track which shells are selected to be swapped
    this.steps = steps; // track where we are in the steps array
    this.workingArray = workingArray;
    this.number = number;
    this._numSwaps = 0;
    this._numLooks = 2;
    this._sorted = false;
    this._swapped = false;

    this.stepsIndex = 0;
    this.smallestIndex = 1;
    this.posIndex = 1;
    this.swapIndex = 1;
    this.posUpperBound = 6;
    this.showAll = false;
    this.end = false;

    this._handleSwap = this._handleSwap.bind(this);
    document
      .querySelectorAll(".sort" + this.number)
      .forEach((box) => box.addEventListener("click", this._handleSwap));
    this._nextStep = this._nextStep.bind(this);
    document
      .querySelector("#next" + this.number)
      .addEventListener("click", this._nextStep);
    this._toggleShowAll = this._toggleShowAll.bind(this);
    document
      .querySelector("#toggle" + this.number)
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

    let smallestElem = document.getElementById(
      "sort" + this.number + "box" + this.smallestIndex
    );
    let smallestVal = smallestElem.children[0].id[8];
    if (!this._sorted) {
      if (this.posIndex === this.posUpperBound) {
        // if we reached the end of the array
        // reaching the end of an array in insertion sort means that we want to swap an element
        // after swapping, the beginning of the array will be sorted
        this.end = true;
        if (this._swapped) {
          console.log("here");
          this._swapped = false;
          this.swapIndex += 1;
          this.posIndex = this.swapIndex;

          this._numLooks += 1;
          let newSwapElem = document.getElementById(
            "sort" + this.number + "box" + this.swapIndex
          );

          document.getElementById("varBox" + this.number).src =
            newSwapElem.children[0].src;
          document.getElementById("varBox" + this.number + "2").src =
            newSwapElem.children[0].src;
          document.getElementById("looks" + this.number).textContent =
            "Number of looks: " + this._numLooks;
        } else {
          console.log("no next step!!!!!");
        }
      } else {
        this.posIndex += 1;
        //this.swapIndex += 1;
        this._numLooks += 1;
        document.getElementById("looks" + this.number).textContent =
          "Number of looks: " + this._numLooks;
      }
      console.log("setting new posBox");
      let newPosElem = document.getElementById(
        "sort" + this.number + "box" + this.posIndex
      );
      posElem.classList.remove("posBox");
      newPosElem.classList.add("posBox");

      let newPosVal = newPosElem.children[0].id[8];
      console.log(smallestVal);
      let prevSmallestIndex = this.smallestIndex;
      if (newPosVal < smallestVal) {
        document.getElementById("varBox" + this.number + "2").src =
          newPosElem.children[0].src;
        this.smallestIndex = this.posIndex;
      }

      if (!this.showAll) {
        console.log("sort" + this.number + "box" + this.smallestIndex);
        document
          .getElementById("sort" + this.number + "box" + prevSmallestIndex)
          .classList.add("hideBox");
        posElem.classList.add("hideBox");
        swapElem.classList.remove("hideBox");
        document
          .getElementById("sort" + this.number + "box" + this.smallestIndex)
          .classList.remove("hideBox");
      }
      /*} else if (!this._sorted) {
        // if you are supposed to swap the current values
        console.log("you are supposed to swap the current values");
        document
          .getElementById("sort" + this.number + "step1")
          .classList.remove("highlight");
        void document.getElementById("sort" + this.number + "step1").offsetWidth;
        document
          .getElementById("sort" + this.number + "step1")
          .classList.add("highlight");
      }*/
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
                .getElementById("sort" + this.number + "step2")
                .classList.remove("highlight");
              void document.getElementById("sort" + this.number + "step2")
                .offsetWidth;
              document
                .getElementById("sort" + this.number + "step2")
                .classList.add("highlight");
            } else {
              // if they are trying to swap the wrong shells
              document
                .getElementById("sort" + this.number + "step1")
                .classList.remove("highlight");
              void document.getElementById("sort" + this.number + "step1")
                .offsetWidth;
              document
                .getElementById("sort" + this.number + "step1")
                .classList.add("highlight");
            }
          }

          this.selectedNums[0].classList.remove("selected");
          console.log("invalid move");
          this.selectedNums = [];
        } else if (
          this.steps[this.stepsIndex].indexOf(this.selectedNums[0].id[8]) >
            -1 &&
          this.steps[this.stepsIndex].indexOf(value.id[8]) > -1
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
          /*document.getElementById("varBox" + this.number).src =
            document.getElementById(
              "sort" + this.number + "box" + this.swapIndex
            ).children[0].src;*/
          this._numSwaps += 1;
          document.getElementById("swaps" + this.number).textContent =
            "Number of swaps: " + this._numSwaps;
          this._swapped = true;
          let swapElem = document.getElementById(
            "sort" + this.number + "box" + this.swapIndex
          );
          swapElem.classList.add(".sorted");
          console.log("sort" + this.number + "pic" + this.swapIndex);
          document
            .getElementById("sort" + this.number + "pic" + this.swapIndex)
            .classList.add("hidden");
          document
            .getElementById(
              "sort" + this.number + "pic" + this.swapIndex + "color"
            )
            .classList.remove("hidden");
          /*document
            .getElementById("sort" + this.number + "pic" + this.smallestIndex)
            .classList.add("hideBox");*/
          document
            .getElementById("sort" + this.number + "box" + this.smallestIndex)
            .classList.add("hideBox");
          this.smallestIndex = this.posIndex;
          this.end = false;

          console.log(this.steps);
          if (this.stepsIndex === this.steps.length - 1) {
            // if the array is sorted
            this._sorted = true;
            console.log("sorted!");
            for (let i = 1; i <= 6; i++) {
              document
                .getElementById("sort" + this.number + "pic" + i)
                .classList.add("hidden");
              document
                .getElementById("sort" + this.number + "pic" + i + "color")
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
            this.stepsIndex += 1;
          }
        } else {
          console.log(this.end);
          console.log(this._swapped);
          console.log(posVal);
          console.log(swapVal);
          console.log(this.steps[this.stepsIndex]);
          console.log(this.steps[this.stepsIndex].indexOf(posVal) > -1);
          console.log(this.steps[this.stepsIndex].indexOf(swapVal) > -1);
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
    let smallestElem = document.getElementById(
      "sort" + this.number + "box" + this.smallestIndex
    );
    if (this.showAll) {
      document
        .querySelectorAll(".sort" + this.number)
        .forEach((box) => box.classList.remove("hideBox"));
    } else {
      for (let i = this.swapIndex; i <= this.posUpperBound; i++) {
        document
          .getElementById("sort" + this.number + "box" + i)
          .classList.add("hideBox");
      }
      //smallestElem.classList.add("hideBox");
      //smallestElem.classList.remove("hideBox");
      posElem.classList.remove("hideBox");
      swapElem.classList.remove("hideBox");
      smallestElem.classList.remove("hideBox");

      console.log(smallestElem.classList);
    }
  }
}
