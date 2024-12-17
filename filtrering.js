function filterSelection(category) {
    const elements = document.getElementsByClassName("filterDiv");
  
  
    for (let i = 0; i < elements.length; i++) {
      elements[i].classList.remove("show");
      if (category === "all" || elements[i].classList.contains(category)) {
        elements[i].classList.add("show");
      }
    }
  }
  
  document.addEventListener("DOMContentLoaded", () => {
  const btnContainer = document.getElementById("Container");
  const buttons = btnContainer.getElementsByClassName("button");
  
  for (let i = 0; i < buttons.length; i++) {
    buttons[i].addEventListener("click", function () {
      const current = document.getElementsByClassName("active");
      if (current.length > 0) {
        current[0].classList.remove("active");
      }
      this.classList.add("active");

      const category = this.getAttribute("onclick").match(/'([^']+)'/)[1]; 
      filterSelection(category); 
    });
  }

  filterSelection("all"); 
}); 