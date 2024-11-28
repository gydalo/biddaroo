import { getPost } from "../../api/post/read.js";
import { updatePost } from "../../api/post/update.js";

function getPostIdFromUrl() {
    const params = new URLSearchParams(window.location.search);
    return params.get('id');
}

const form = document.querySelector("#editListing");

if (form) {
    const postId = getPostIdFromUrl();

    if (!postId) {
        console.error("Post ID is missing from the URL.");
        alert("Post ID is missing!");
    }

    async function loadPostData() {
        try {
            const post = await getPost(postId);
    
            if (form.title) form.title.value = post.title || '';
            if (form.description) form.description.value = post.description || '';

            if (form.endsAt) {
                const endsAtDate = new Date(post.endsAt);
                form.endsAt.value = endsAtDate.toISOString().substring(0, 16);

            }
            if (form.mediaURL) {
                if (post.media && Array.isArray(post.media) && post.media.length > 0) {
                    form.mediaURL.value = post.media[0].url || '';
                    form.mediaALT.value = post.media[0].alt || '';
                } else {
                    console.log("Media data is undefined or empty");
                    form.mediaURL.value = '';
                    form.mediaALT.value = '';
                }
            }
        } catch (error) {
            console.error("Failed to fetch post data:", error);
            alert("Failed to load post data.");
        }
    }

    loadPostData();

    form.addEventListener("submit", (event) => {
        event.preventDefault();

        const formData = new FormData(form);
        const formValues = Object.fromEntries(formData.entries());
        const endsAt = new Date(formValues.endsAt).toISOString();

        const updatedPost = {
            id: postId,
            title: formValues.title,
            description: formValues.description,
            endsAt: endsAt,
            media: [{
                url: formValues.mediaURL,
                alt: formValues.mediaALT
            }]
        };


        updatePost(updatedPost)
            .then(response => {
                console.log("Post updated successfully:", response);
                window.location.href = "/biddaroo/index.html";
            })
            .catch(error => {
                console.error("Error updating post:", error);
            });
    });

} else {
    console.error("Edit post form not found");
}