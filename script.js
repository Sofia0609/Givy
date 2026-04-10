const likeButton = document.getElementById("like_button");
const likeCounter = document.getElementById("like_Counter");
const swapButton = document.getElementById("swap_button");
const commentsButton = document.getElementById("comments_button");
const commentsCounter = document.getElementById("comments_Counter");
const shareButton = document.getElementById("share_button"); 
const commentsContainer = document.getElementById("Comments");

let likeCount = 0;

//Show comment Function

async function rendercomments (){
commentsContainer.innerHTML = "";
await fetch('comments.json')
    .then(res => res.json())
    .then(comments => {
      console.log(comments);
      
      comments.forEach(comment => {

      const commentSection = document.createElement("div");
      commentSection.classList.add("CommentSection")
      commentsContainer.appendChild(commentSection);

      const commentAvatar = document.createElement("img");
      commentAvatar.classList.add("profile_Picture_Comments")
      commentAvatar.src = comment.avatar;
      commentSection.appendChild(commentAvatar);

      const commentName = document.createElement("h4");
      commentName.textContent = comment.name;
      commentSection.appendChild(commentName);

      const commentText = document.createElement(("p"));
      commentText.textContent = comment.comment;
      commentSection.appendChild(commentText);
    });
  });

}

//Like button function

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


//Comment Button function

commentsButton.addEventListener("click", () => {

  
  rendercomments()


});

//Share button function


shareButton.addEventListener("click", () => {



});

//Swap button function

swapButton.addEventListener("click", () => {


});