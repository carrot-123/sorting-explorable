export default class FreeSort {
  constructor(sortedArray, workingArray, number) {
    // pass in sortedarray and working array? then when querying can specify different sections

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
      console.log(event.target);
      //let targetId = event.target.id;
      //console.log(document.getElementById(targetId).children[0]);
      //let value = document.getElementById(targetId).children[0]; //just read the text value
      let value = event.target;

      console.log(value.id);

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
          JSON.stringify(this.workingArray) === JSON.stringify(this.sortedArray)
        ) {
          this._sorted = true;
          // change all to color version
          for (let i = 1; i <= 6; i++) {
            /*console.log(i);
          console.log(document.getElementById("sort3pic" + i));
          document.getElementById("sort3pic" + i).src =
            "images/" + i + "_color.png";*/
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
