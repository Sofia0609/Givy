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

      const commentAvatar = document.createElement("div");
      commentAvatar.classList.add("profile_Picture_Comments");
      commentAvatar.textContent = comment.name.charAt(0);
      commentSection.appendChild(commentAvatar);

      const userInformation = document.createElement("div");
      userInformation.classList.add("user-info");
      commentSection.appendChild(userInformation);

      const commentName = document.createElement("h4");
      commentName.textContent = comment.name;
      userInformation.appendChild(commentName);

      const commentText = document.createElement(("p"));
      commentText.textContent = comment.comment;
      userInformation.appendChild(commentText);
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

  if(!commentsContainer.classList.contains("hide")){
    
    rendercomments()

    const inputSection = document.createElement("div");
    inputSection.classList.add("input_section");

    const commentInput = document.createElement("input");
    commentInput.type = "text";
    commentInput.placeholder = "Agregar comentario...";
    commentInput.classList.add("comment_input_box");
    inputSection.appendChild(commentInput);

    const submitButton = document.createElement("button");
    submitButton.textContent = "Submit";
    inputSection.appendChild(submitButton);
    submitButton.classList.add("submit_button");

    commentsContainer.appendChild(inputSection);

    submitButton.addEventListener("click", () => {

      const newComment = submitComment(commentInput);
        if (newComment) {
          const inputSection = commentsContainer.querySelector(".input_section");
          commentsContainer.insertBefore(newComment, inputSection);
        }
    });

    commentsContainer.classList.add("hide");

  }else{
    commentsContainer.classList.remove("hide");
  }


});

function submitComment(commentInput){

  if (commentInput.value.trim() == "") {
    return;
  } 

  const text =  commentInput.value.trim();


      const commentSection = document.createElement("div");
      commentSection.classList.add("CommentSection")
      commentsContainer.appendChild(commentSection);

      const commentAvatar = document.createElement("div");
      commentAvatar.classList.add("profile_Picture_Comments");
      commentAvatar.textContent = "Tu";
      commentSection.appendChild(commentAvatar);

      const userInformation = document.createElement("div");
      userInformation.classList.add("user-info");
      commentSection.appendChild(userInformation);

      const commentName = document.createElement("h4");
      commentName.textContent = "Tu";
      userInformation.appendChild(commentName);

      const commentText = document.createElement(("p"));
      commentText.textContent = text
      userInformation.appendChild(commentText);

      commentInput.value = "";

      return commentSection;
  }

//Share button function


shareButton.addEventListener("click", () => {

    

});

//Swap button function

swapButton.addEventListener("click", () => {


});