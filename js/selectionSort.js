export default class SelectionSort {
  constructor(steps, number) {
    this.selectedNums = []; // array to track which shells are selected to be swapped
    this.steps = steps; // track where we are in the steps array
    this.number = number;
    this._numSwaps = 0;
    this._numLooks = 1;
    this._sorted = false;
    this._swapped = false;

    this._stepsIndex = 0;
    this._smallestIndex = 1;
    this._posIndex = 1;
    this._swapIndex = 1;
    this._posUpperBound = 6;
    this._showAll = false;
    this._end = false;

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

    let smallestElem = document.getElementById(
      "sort" + this.number + "box" + this._smallestIndex
    );
    let smallestVal = smallestElem.children[0].id[8];
    if (!this._sorted) {
      if (this._posIndex + 1 === this._posUpperBound) {
        this._end = true;
      }
      if (this._posIndex === this._posUpperBound) {
        // if we reached the end of the array
        // reaching the end of an array in insertion sort means that we want to swap an element
        // after swapping, the beginning of the array will be sorted

        if (this._swapped) {
          this._swapped = false;
          this._swapIndex += 1;
          this._posIndex = this._swapIndex;
          console.log(this._posIndex);
          this._numLooks += 1;
          let newSwapElem = document.getElementById(
            "sort" + this.number + "box" + this._swapIndex
          );

          document.getElementById("varBox" + this.number).src =
            newSwapElem.children[0].src;
          document.getElementById("varBox" + this.number + "2").src =
            newSwapElem.children[0].src;
          document.getElementById("looks" + this.number).textContent =
            "Number of looks: " + this._numLooks;
        } else {
          document
            .getElementById("sort" + this.number + "step2")
            .classList.remove("highlight");
          document.getElementById("sort" + this.number + "step2").offsetWidth;
          document
            .getElementById("sort" + this.number + "step2")
            .classList.add("highlight");
        }
      } else {
        this._posIndex += 1;

        this._numLooks += 1;
        document.getElementById("looks" + this.number).textContent =
          "Number of looks: " + this._numLooks;
      }

      let newPosElem = document.getElementById(
        "sort" + this.number + "box" + this._posIndex
      );
      posElem.classList.remove("posBox");
      newPosElem.classList.add("posBox");

      let newPosVal = newPosElem.children[0].id[8];

      let prevSmallestIndex = this._smallestIndex;
      if (newPosVal < smallestVal) {
        document.getElementById("varBox" + this.number + "2").src =
          newPosElem.children[0].src;
        this._smallestIndex = this._posIndex;
      }

      if (!this._showAll) {
        document
          .getElementById("sort" + this.number + "box" + prevSmallestIndex)
          .classList.add("hideBox");
        posElem.classList.add("hideBox");
        newPosElem.classList.remove("hideBox");
        swapElem.classList.remove("hideBox");
        document
          .getElementById("sort" + this.number + "box" + this._smallestIndex)
          .classList.remove("hideBox");
      }
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
        } else if (
          this.selectedNums[0] === value &&
          value.id[8] !== this.steps[this._stepsIndex][0] &&
          value.id[8] !== this.steps[this._stepsIndex][1]
        ) {
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
            if (this._end) {
              this.selectedNums[0].classList.remove("selected");

              this.selectedNums = [];
              document
                .getElementById("sort" + this.number + "step2")
                .classList.remove("highlight");
              void document.getElementById("sort" + this.number + "step2")
                .offsetWidth;
              document
                .getElementById("sort" + this.number + "step2")
                .classList.add("highlight");
            } else {
              document
                .getElementById("sort" + this.number + "step1")
                .classList.remove("highlight");
              void document.getElementById("sort" + this.number + "step1")
                .offsetWidth;
              document
                .getElementById("sort" + this.number + "step1")
                .classList.add("highlight");
              this.selectedNums[0].classList.remove("selected");

              this.selectedNums = [];
            }
          }
        } else if (
          this.steps[this._stepsIndex].indexOf(this.selectedNums[0].id[8]) >
            -1 &&
          this.steps[this._stepsIndex].indexOf(value.id[8]) > -1
        ) {
          if (!this._end) {
            this.selectedNums[0].classList.remove("selected");

            this.selectedNums = [];
            document
              .getElementById("sort" + this.number + "step1")
              .classList.remove("highlight");
            void document.getElementById("sort" + this.number + "step1")
              .offsetWidth;
            document
              .getElementById("sort" + this.number + "step1")
              .classList.add("highlight");
          } else {
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

            if (
              this.steps[this._stepsIndex][0] !==
              this.steps[this._stepsIndex][1]
            ) {
              this._numSwaps += 1;
              document.getElementById("swaps" + this.number).textContent =
                "Number of swaps: " + this._numSwaps;
            }

            this._swapped = true;
            let swapElem = document.getElementById(
              "sort" + this.number + "box" + this._swapIndex
            );
            swapElem.classList.add(".sorted");

            document
              .getElementById("sort" + this.number + "pic" + this._swapIndex)
              .classList.add("hidden");
            document
              .getElementById(
                "sort" + this.number + "pic" + this._swapIndex + "color"
              )
              .classList.remove("hidden");

            if (!this._showAll) {
              if (
                this.steps[this._stepsIndex][0] !==
                this.steps[this._stepsIndex][1]
              ) {
                document
                  .getElementById(
                    "sort" + this.number + "box" + this._smallestIndex
                  )
                  .classList.add("hideBox");
              }
            }

            this._smallestIndex = this._posIndex;
            this._end = false;

            if (this._stepsIndex === this.steps.length - 1) {
              // if all steps are done

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
  }
  _toggleShowAll() {
    this._showAll = !this._showAll;
    let swapElem = document.getElementById(
      "sort" + this.number + "box" + this._swapIndex
    );
    let posElem = document.getElementById(
      "sort" + this.number + "box" + this._posIndex
    );
    let smallestElem = document.getElementById(
      "sort" + this.number + "box" + this._smallestIndex
    );
    if (this._showAll) {
      document
        .querySelectorAll(".sort" + this.number)
        .forEach((box) => box.classList.remove("hideBox"));
    } else {
      for (let i = this._swapIndex; i <= this._posUpperBound; i++) {
        document
          .getElementById("sort" + this.number + "box" + i)
          .classList.add("hideBox");
      }
      posElem.classList.remove("hideBox");
      swapElem.classList.remove("hideBox");
      smallestElem.classList.remove("hideBox");
    }
  }
}
