export default class EndResults {
  constructor() {
    //create endresults

    this._revealAnswer = this._revealAnswer.bind(this);
    document
      .getElementById("reveal")
      .addEventListener("click", this._revealAnswer);
    this._setChoice = this._setChoice.bind(this);
    document
      .getElementById("bubble")
      .addEventListener("click", this._setChoice);
    document
      .getElementById("selection")
      .addEventListener("click", this._setChoice);
    this._revealGraphs = this._revealGraphs.bind(this);
    document
      .getElementById("revealGraphs")
      .addEventListener("click", this._revealGraphs);

    this.choice = "none";
    this._revealed = false;
  }
  _revealAnswer() {
    if (!this._revealed) {
      if (this.choice === "bubble") {
        document
          .querySelectorAll(".revealedStats")
          .forEach((item) => item.classList.remove("hidden"));
        document.getElementById("correctChoice").classList.remove("hidden");
        document.getElementById("noChoice").classList.add("hidden");
        document.getElementById("reveal").classList.add("hidden");
        document.getElementById("selection").classList.add("hidden");
        document.getElementById("bubble").classList.add("hidden");
        document.getElementById("bubbleBox").classList.add("correctBox");
        this._revealed = true;
      } else if (this.choice === "selection") {
        document
          .querySelectorAll(".revealedStats")
          .forEach((item) => item.classList.remove("hidden"));
        document.getElementById("incorrectChoice").classList.remove("hidden");
        document.getElementById("noChoice").classList.add("hidden");
        document.getElementById("reveal").classList.add("hidden");
        document.getElementById("selection").classList.add("hidden");
        document.getElementById("bubble").classList.add("hidden");
        document.getElementById("bubbleBox").classList.add("correctBox");

        this._revealed = true;
      } else {
        document.getElementById("noChoice").classList.remove("hidden");
      }
    }
  }
  _setChoice(event) {
    this.choice = event.target.id;
    console.log(this.choice);
    if (this.choice === "bubble") {
      event.target.style = "border-radius: 4rem";
      document.getElementById("selection").style = "button#selection";
    }
    if (this.choice === "selection") {
      event.target.style = "border-radius: 4rem";
      document.getElementById("bubble").style = "button#bubble";
    }
  }
  _revealGraphs() {
    document.getElementById("graphExplanation").classList.remove("hidden");
    document.getElementById("revealGraphs").classList.add("hidden");
    document
      .getElementById("bubbleAndSelectionGraph")
      .classList.remove("hidden");
  }
}
