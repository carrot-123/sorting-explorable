import FreeSort from "./freeSort.js";
import ComputerSort from "./computerSort.js";
import BubbleSort from "./bubbleSort.js";
import SelectionSort from "./selectionSort.js";
import EndResults from "./endResults.js";

export default class App {
  constructor() {
    this.workingArray0 = ["3", "5", "2", "6", "1", "4"]; // change the order
    this.sortedArray = ["1", "2", "3", "4", "5", "6"];
    this.workingArray = ["6", "3", "4", "5", "2", "1"];
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
    this.selectionSortSteps = [
      ["1", "6"],
      ["2", "3"],
      ["3", "4"],
      ["4", "5"],
      ["5", "5"],
    ];

    this._freeSort = new FreeSort(this.sortedArray, this.workingArray0, "3");
    this._computerSort = new ComputerSort(
      this.sortedArray,
      this.workingArray,
      "4"
    );
    //this._freeSort3 = new RestrictedSort(this.steps, this.workingArray3, "3");
    this._bubbleSort = new BubbleSort(this.bubbleSortSteps, "5");
    this._selectionSort = new SelectionSort(this.selectionSortSteps, "6");
    this._endResults = new EndResults();

    this._nextPage = this._nextPage.bind(this);
    document.querySelector("#cont1").addEventListener("click", this._nextPage);
    document.querySelector("#cont2").addEventListener("click", this._nextPage);
    document.querySelector("#cont3").addEventListener("click", this._nextPage);
    document.querySelector("#cont4").addEventListener("click", this._nextPage);
    document.querySelector("#cont5").addEventListener("click", this._nextPage);
    document.querySelector("#cont6").addEventListener("click", this._nextPage);
    document.querySelector("#cont7").addEventListener("click", this._nextPage);
    document.querySelector("#cont8").addEventListener("click", this._nextPage);
  }
  _nextPage(event) {
    let pageNum = event.target.id.slice(4);
    document.querySelector("#page" + pageNum).classList.add("hidden");
    let nextPageNum = (parseInt(pageNum) + 1).toString();
    document.querySelector("#page" + nextPageNum).classList.remove("hidden");
    if (pageNum === "6") {
      document.getElementById("yourLooks").textContent =
        document.getElementById("looks4").textContent;
      document.getElementById("yourSwaps").textContent =
        document.getElementById("swaps4").textContent;
      document.getElementById("bubbleLooks").textContent =
        document.getElementById("looks5").textContent;
      document.getElementById("bubbleSwaps").textContent =
        document.getElementById("swaps5").textContent;
      document.getElementById("selectionLooks").textContent =
        document.getElementById("looks6").textContent;
      document.getElementById("selectionSwaps").textContent =
        document.getElementById("swaps6").textContent;
    }
  }
  _prevPage(event) {
    document.querySelector("#page2").classList.add("hidden");
    document.querySelector("#page1").classList.remove("hidden");
  }
}
