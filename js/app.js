import FreeSort from "./freeSort.js";
import RestrictedSort from "./restrictedSort.js";
export default class App {
  constructor() {
    this.sortedArray1 = ["1", "2", "3"];
    this.workingArray1 = ["2", "1", "3"];
    this.sortedArray2 = ["1", "2", "3"];
    this.workingArray2 = ["3", "2", "1"];
    this.steps = [
      ["1", "2"],
      ["2", "3"],
    ];
    this.workingArray3 = ["3", "1", "2"];
    this._freeSort1 = new FreeSort(this.sortedArray1, this.workingArray1, "1");
    this._freeSort2 = new FreeSort(this.sortedArray2, this.workingArray2, "2");
    this._freeSort3 = new RestrictedSort(this.steps, this.workingArray3, "3");
  }
}
