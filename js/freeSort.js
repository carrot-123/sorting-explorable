export default class FreeSort {
  constructor(sortedArray, workingArray, number) {
    this.selectedNums = [];
    this.sortedArray = sortedArray;
    this.workingArray = workingArray;
    this.number = number;
    this._handleSwap = this._handleSwap.bind(this);
    this._sorted = false;

    document
      .querySelectorAll(".sort" + this.number)
      .forEach((box) => box.addEventListener("click", this._handleSwap));
  }
  _handleSwap(event) {
    if (!this._sorted) {
      let value = event.target;

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

        let pos1 = this.workingArray.indexOf(child1.id[8].toString());
        let pos2 = this.workingArray.indexOf(child2.id[8].toString());
        let temp = child1.id[8].toString();
        this.workingArray[pos1] = child2.id[8].toString();
        this.workingArray[pos2] = temp;

        // check if the array is sorted
        if (
          JSON.stringify(this.workingArray) === JSON.stringify(this.sortedArray)
        ) {
          this._sorted = true;

          for (let i = 1; i <= 6; i++) {
            document.getElementById("sort3pic" + i).classList.add("hidden");
            document
              .getElementById("sort3pic" + i + "color")
              .classList.remove("hidden");
          }
          document
            .querySelectorAll(".sort" + this.number)
            .forEach((box) => box.addEventListener("click", this._handleSwap));

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
