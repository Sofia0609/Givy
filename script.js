const feedItems = document.querySelectorAll(".feed-item");

feedItems.forEach(feedItem => {

  const commentsFile = feedItem.dataset.comments;
  const likeButton = feedItem.querySelector(".like_button");
  const likeCounter = feedItem.querySelector(".like_counter");
  const commentsButton = feedItem.querySelector(".comments_button");
  const commentsContainer = feedItem.querySelector(".comments_container");

  let likeCount = 0;
  let newComments = []; 

  likeButton.addEventListener("click", () => {
    if (likeButton.classList.contains("Liked")) {
      likeCount -= 1;
      likeCounter.textContent = likeCount;
      likeButton.classList.remove("Liked");
    } else {
      likeCount += 1;
      likeCounter.textContent = likeCount;
      likeButton.classList.add("Liked");
    }
  });

  commentsButton.addEventListener("click", () => {

    if (commentsContainer.classList.contains("hide")) {

      commentsContainer.classList.remove("hide");
      renderComments(commentsContainer, commentsFile, newComments);

      const inputSection = document.createElement("div");
      inputSection.classList.add("input_section");

      const commentInput = document.createElement("input");
      commentInput.type = "text";
      commentInput.placeholder = "Agregar comentario...";
      commentInput.classList.add("comment_input_box");
      inputSection.appendChild(commentInput);

      const submitButton = document.createElement("button");
      submitButton.textContent = "Enviar";
      submitButton.classList.add("submit_button");
      inputSection.appendChild(submitButton);

      commentsContainer.appendChild(inputSection);

      submitButton.addEventListener("click", () => {
        const newComment = submitComment(commentInput, commentsContainer, newComments);
        if (newComment) {
          const inputSection = commentsContainer.querySelector(".input_section");
          commentsContainer.insertBefore(newComment, inputSection);
        }
      });

    } else {

      commentsContainer.classList.add("hide");
      commentsContainer.innerHTML = "";
    }

  });

});

async function renderComments(commentsContainer, commentsFile, newComments) {
  commentsContainer.innerHTML = "";

  newComments.forEach(newComment => {
    const commentSection = document.createElement("div");
    commentSection.classList.add("CommentSection");

    const commentAvatar = document.createElement("div");
    commentAvatar.classList.add("profile_Picture_Comments");
    commentAvatar.textContent = "T";
    commentSection.appendChild(commentAvatar);

    const userInformation = document.createElement("div");
    userInformation.classList.add("user-info");
    commentSection.appendChild(userInformation);

    const commentName = document.createElement("h4");
    commentName.textContent = newComment.nombre;
    userInformation.appendChild(commentName);

    const commentText = document.createElement("p");
    commentText.textContent = newComment.texto;
    userInformation.appendChild(commentText);

    commentsContainer.appendChild(commentSection);
  });

  await fetch(commentsFile)
    .then(res => res.json())
    .then(comments => {
      comments.forEach(comment => {
        const commentSection = document.createElement("div");
        commentSection.classList.add("CommentSection");

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

        const commentText = document.createElement("p");
        commentText.textContent = comment.comment;
        userInformation.appendChild(commentText);

        commentsContainer.appendChild(commentSection);
      });
    });
}

function submitComment(commentInput, commentsContainer, newComments) {
  if (commentInput.value.trim() === "") return;

  const text = commentInput.value.trim();

  const commentSection = document.createElement("div");
  commentSection.classList.add("CommentSection");

  const commentAvatar = document.createElement("div");
  commentAvatar.classList.add("profile_Picture_Comments");
  commentAvatar.textContent = "Tú";
  commentSection.appendChild(commentAvatar);

  const userInformation = document.createElement("div");
  userInformation.classList.add("user-info");
  commentSection.appendChild(userInformation);

  const commentName = document.createElement("h4");
  commentName.textContent = "Tú";
  userInformation.appendChild(commentName);

  const commentText = document.createElement("p");
  commentText.textContent = text;
  userInformation.appendChild(commentText);

  commentInput.value = "";
  newComments.push({ nombre: "Tú", texto: text }); 

  return commentSection;
}