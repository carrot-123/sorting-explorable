import FreeSort from "./freeSort.js";
import RestrictedSort from "./restrictedSort.js";
export default class App {
  constructor() {
    this.sortedArray1 = ["1", "2", "3"];
    this.workingArray1 = ["2", "1", "3"];
    this.sortedArray2 = ["1", "2", "3"];
    this.workingArray2 = ["3", "2", "1"];
    this.sortedArray = ["1", "2", "3", "4", "5", "6"];
    this.workingArray = ["6", "3", "4", "5", "2", "1"];
    this.steps = [
      ["1", "2"],
      ["2", "3"],
    ];
    this.bubbleSortSteps = [
      ["6", "3"],
      ["6", "4"],
      ["6", "5"],
      ["6", "2"],
      ["6", "1"],
      ["5", "2"],
      ["5", "1"],
      ["4", "2"],
      ["4", "1"],
      ["3", "2"],
      ["3", "1"],
      ["1", "2"],
    ];

    this.workingArray3 = ["3", "1", "2"];
    this._freeSort1 = new FreeSort(this.sortedArray1, this.workingArray1, "1");
    this._freeSort2 = new FreeSort(this.sortedArray2, this.workingArray2, "2");
    //this._freeSort3 = new RestrictedSort(this.steps, this.workingArray3, "3");
    this._bubbleSort = new RestrictedSort(
      this.bubbleSortSteps,
      this.workingArray,

      "0"
    );
    this._nextPage = this._nextPage.bind(this);
    document.querySelector("#next1").addEventListener("click", this._nextPage);
    document.querySelector("#next2").addEventListener("click", this._nextPage);
    this._prevPage = this._prevPage.bind(this);
    document.querySelector("#back2").addEventListener("click", this._prevPage);
  }
  _nextPage(event) {
    let pageNum = event.target.id.slice(4);
    document.querySelector("#page" + pageNum).classList.add("hidden");
    let nextPageNum = (parseInt(pageNum) + 1).toString();
    document.querySelector("#page" + nextPageNum).classList.remove("hidden");
  }
  _prevPage(event) {
    document.querySelector("#page2").classList.add("hidden");
    document.querySelector("#page1").classList.remove("hidden");
  }
}
