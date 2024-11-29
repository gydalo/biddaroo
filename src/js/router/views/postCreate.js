
import { createPost } from "../../api/post/create.js";

const form = document.querySelector("#createListing");

if (form) {
    form.addEventListener("submit", (event) => {
        event.preventDefault();
        console.log("Form submitted!");

        const formData = new FormData(form);
        const formValues = Object.fromEntries(formData.entries());

        const endsAt = new Date(formValues.endsAt).toISOString();

        createPost({
            title: formValues.title,
            description: formValues.description,
            endsAt: endsAt,
            media: [{
                url: formValues.mediaURL,
                alt: formValues.mediaALT
            }]
        });
    });
}

