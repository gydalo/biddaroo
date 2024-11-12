import { authGuard } from "../../utilities/authGuard.js";
import { getPost } from "../../api/post/read.js";
import { updatePost } from "../../api/post/update.js";
import { load } from "../../api/auth/key.js";

authGuard();

function getPostIdFromUrl() {
    const params = new URLSearchParams(window.location.search);
    return params.get('id');
}

const form = document.querySelector("#editPost");

if (form) {
    const postId = getPostIdFromUrl();

    if (!postId) {
        console.error("Post ID is missing from the URL.");
        alert("Post ID is missing!");
    }

    async function loadPostData() {
        try {
            const post = await getPost(postId);

            form.title.value = post.title || '';
            form.body.value = post.body || '';
            form.mediaURL.value = post.media ? post.media.url : '';
            form.mediaALT.value = post.media ? post.media.alt : '';

        } catch (error) {
            console.error("Failed to fetch post data:", error);
            alert("Failed to load post data. Please try again later.");
        }
    }

    loadPostData();

    form.addEventListener("submit", (event) => {
        event.preventDefault();

        const formData = new FormData(form);
        const formValues = Object.fromEntries(formData.entries());

        const updatedPost = {
            id: postId,
            title: formValues.title,
            body: formValues.body,
            media: {
                url: formValues.mediaURL,
                alt: formValues.mediaALT
            }
        };


        updatePost(updatedPost)
            .then(response => {
                console.log("Post updated successfully:", response);
                alert("Post updated successfully!");
                window.location.href = "/index.html";
            })
            .catch(error => {
                console.error("Error updating post:", error);
                alert("Failed to update the post.");
            });
    });

} else {
    console.error("Edit post form not found");
}
