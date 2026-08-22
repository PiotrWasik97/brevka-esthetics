const firstItemElement = document.querySelectorAll(".first-item");
const secondItemElement = document.querySelectorAll(".second-item");


function changeName(){
  firstItemElement.forEach((item, index) => {
    const height = item.offsetHeight + "px"; 
    if (secondItemElement[index]) {
      secondItemElement[index].style.height = height; 
    }
  })
}

changeName();
