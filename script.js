const likeButton = document.getElementById("like_button");
const likeCounter = document.getElementById("like_Counter");
const swapButton = document.getElementById("swap_button");
const commentsButton = document.getElementById("comments_button");
const commentsCounter = document.getElementById("comments_Counter");
const shareButton = document.getElementById("share_button");

let likeCount = 0;

//Funciones Boton de Like

likeButton.addEventListener("click", () => {

  if(likeButton.classList.contains("Liked")){
    likeCount -= 1
    likeCounter.textContent = likeCount;
    likeButton.classList.remove("Liked")
  }else{
    likeCount += 1
    likeCounter.textContent = likeCount;
    likeButton.classList.add("Liked")
  }
  
});


//Funciones Boton de Comentarios

commentsButton.addEventListener("click", () => {

  
  rendercomments()


});

//Funciones Boton de Compartir


shareButton.addEventListener("click", () => {



});

//Funciones Boton de Swap

swapButton.addEventListener("click", () => {


});