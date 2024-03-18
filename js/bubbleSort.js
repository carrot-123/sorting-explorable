export default class BubbleSort {
  constructor(steps, workingArray, number) {
    this.selectedNums = []; // array to track which shells are selected to be swapped
    this.steps = steps; // track where we are in the steps array
    this.workingArray = workingArray;
    this.number = number;
    this._numSwaps = 0;
    this._numLooks = 2;
    this._sorted = false;
    this._swapped = false;

    this._stepsIndex = 0;
    this._posIndex = 1;
    this._swapIndex = 2;
    this._posUpperBound = 5;
    this._showAll = false;

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
      .getElementById("sort" + this.number + "box" + this._posIndex)
      .classList.add("posBox");
  }
  _nextStep() {
    // pressing next
    for (let i = 1; i <= 6; i++) {
      document
        .getElementById("sort" + this.number + "pic" + i)
        .classList.remove("selected");
    }

    this.selectedNums = [];
    let posElem = document.getElementById(
      "sort" + this.number + "box" + this._posIndex
    );
    let posVal = posElem.children[0].id[8];
    let swapElem = document.getElementById(
      "sort" + this.number + "box" + this._swapIndex
    );
    let swapVal = swapElem.children[0].id[8];
    if (
      // if you are not supposed to swap the shells
      this.steps[this._stepsIndex].indexOf(posVal) === -1 ||
      this.steps[this._stepsIndex].indexOf(swapVal) === -1
    ) {
      if (this._posIndex === this._posUpperBound) {
        // if we reached the end of the array
        // reaching the end of an array in bubble sort means that the last element is in its correct place
        document
          .getElementById(
            "sort" + this.number + "pic" + (this._posUpperBound + 1)
          )
          .classList.add("hidden");
        document
          .getElementById(
            "sort" + this.number + "pic" + (this._posUpperBound + 1) + "color"
          )
          .classList.remove("hidden");
        posElem.classList.add(".sorted");

        this._posIndex = 1;
        this._swapIndex = 2;
        this._posUpperBound -= 1;
        this._numLooks += 2;
        document.getElementById("looks" + this.number).textContent =
          "Number of looks: " + this._numLooks;
      } else {
        this._posIndex += 1;
        this._swapIndex += 1;
        this._numLooks += 1;
        document.getElementById("looks" + this.number).textContent =
          "Number of looks: " + this._numLooks;
      }
      let newPosElem = document.getElementById(
        "sort" + this.number + "box" + this._posIndex
      );
      posElem.classList.remove("posBox");
      newPosElem.classList.add("posBox");
      let newSwapElem = document.getElementById(
        "sort" + this.number + "box" + this._swapIndex
      );
      document.getElementById("varBox" + this.number).src =
        newSwapElem.children[0].src;
      this._swapped = false;
      if (!this._showAll) {
        posElem.classList.add("hideBox");
        swapElem.classList.remove("hideBox");
        newSwapElem.classList.remove("hideBox");
        newPosElem.classList.remove("hideBox");
      }
    } else if (!this._sorted) {
      // if you are supposed to swap the current values
      document
        .getElementById("sort" + this.number + "step1")
        .classList.remove("highlight");
      void document.getElementById("sort" + this.number + "step1").offsetWidth;
      document
        .getElementById("sort" + this.number + "step1")
        .classList.add("highlight");
    }
  }
  _handleSwap(event) {
    // after x amount of steps, give option to move on
    if (!this._sorted) {
      let posVal = document.getElementById(
        "sort" + this.number + "box" + this._posIndex
      ).children[0].id[8];
      let swapVal = document.getElementById(
        "sort" + this.number + "box" + this._swapIndex
      ).children[0].id[8];
      if (this._stepsIndex < this.steps.length) {
        let value = event.target;
        if (this.selectedNums.length === 0) {
          // if this is the first shell to be selected
          this.selectedNums.push(value);
          value.classList.add("selected");
        } else if (this.selectedNums[0] === value) {
          // if the user clicks the same shell, cancel the selection
          this.selectedNums.pop();
          value.classList.remove("selected");
        } else if (
          // if they are trying to perform an invalid move (either swapping wrong shells or not pressing next)
          this._swapped ||
          this.steps[this._stepsIndex].indexOf(this.selectedNums[0].id[8]) ===
            -1 ||
          this.steps[this._stepsIndex].indexOf(value.id[8]) === -1
        ) {
          if (!this._sorted) {
            if (
              // if they already swapped the correct elements but they are not pressing next (trying to keep swapping)
              this.steps[this._stepsIndex].indexOf(posVal) === -1
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
          this.selectedNums = [];
        } else if (
          this.steps[this._stepsIndex].indexOf(posVal) > -1 &&
          this.steps[this._stepsIndex].indexOf(swapVal) > -1
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
          document.getElementById("varBox" + this.number).src =
            document.getElementById(
              "sort" + this.number + "box" + this._swapIndex
            ).children[0].src;
          this._numSwaps += 1;
          document.getElementById("swaps" + this.number).textContent =
            "Number of swaps: " + this._numSwaps;
          this._swapped = true;

          if (this._stepsIndex === this.steps.length - 1) {
            // if the array is sorted
            console.log("here");
            this._sorted = true;
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
              .getElementById("sort" + this.number + "box" + this._posIndex)
              .classList.remove("posBox");

            document
              .getElementById("cont" + this.number)
              .classList.remove("hidden");
          } else {
            // if the array is not yet sorted, continue to the next step

            this._stepsIndex += 1;
          }
        }
      }
    }
  }
  _toggleShowAll() {
    this._showAll = !this._showAll;
    let swapElem = document.getElementById(
      "sort" + this.number + "box" + this._swapIndex
    );
    let posElem = document.getElementById(
      "sort" + this.number + "box" + this._posIndex
    );
    if (this._showAll) {
      document
        .querySelectorAll(".sort" + this.number)
        .forEach((box) => box.classList.remove("hideBox"));
    } else {
      for (let i = 1; i <= this._posUpperBound + 1; i++) {
        document
          .getElementById("sort" + this.number + "box" + i)
          .classList.add("hideBox");
      }
      posElem.classList.remove("hideBox");
      swapElem.classList.remove("hideBox");
    }
  }
}
