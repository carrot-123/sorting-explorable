export default class FreeSort {
  constructor(sortedArray, workingArray, sortNumber) {
    // pass in sortedarray and working array? then when querying can specify different sections

    this.selectedNums = [];
    this.sortedArray = sortedArray;
    this.workingArray = workingArray;
    this.sortNumber = ".sort" + sortNumber;
    this._handleSwap = this._handleSwap.bind(this);
    document
      .querySelectorAll(this.sortNumber)
      .forEach((box) => box.addEventListener("click", this._handleSwap));
  }
  _handleSwap(event) {
    let targetId = event.target.id;
    let value = document.getElementById(targetId).children[0];
    if (this.selectedNums.length === 0) {
      this.selectedNums.push(value);
    } else if (this.selectedNums[0] === value) {
      this.selectedNums.pop();
    } else {
      // swap html elements
      this.selectedNums.push(value);
      let child1 = this.selectedNums[0];
      let parent1 = child1.parentElement;
      let child2 = this.selectedNums[1];
      let parent2 = child2.parentElement;
      parent1.prepend(child2);
      parent2.prepend(child1);
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
