
import { createPost } from "../../api/post/create.js";

const form = document.querySelector("#createListing");
const mediaContainer = document.querySelector("#media-container");

if (form && mediaContainer) {
    mediaContainer.addEventListener("input", (event) => {
   
        const allInputs = mediaContainer.querySelectorAll("input[name='mediaURL']");
        const lastInput = allInputs[allInputs.length - 1];
        
        if (event.target === lastInput && allInputs.length < 8 && lastInput.value.trim() !== "") {

          const newInput = document.createElement("input");
          newInput.type = "url";
          newInput.name = "mediaURL";
          newInput.placeholder = "Image URL";
          mediaContainer.appendChild(newInput);
        }

      const emptyInputs = Array.from(allInputs).filter((input) => input.value.trim() === "");
      if (emptyInputs.length > 0 && allInputs.length > 1) {
        const lastEmptyInput = emptyInputs[emptyInputs.length - 1];
        if (lastEmptyInput === lastInput) {
          mediaContainer.removeChild(lastEmptyInput);
        }
      }
    });

    form.addEventListener("submit", (event) => {
        event.preventDefault();
        console.log("Form submitted!");

        const formData = new FormData(form);
        const formValues = Object.fromEntries(formData.entries());

        const mediaInputs = mediaContainer.querySelectorAll("input[name='mediaURL']");
        const media = Array.from(mediaInputs)
          .filter((input) => input.value.trim() !== "")
          .map((input) => ({
            url: input.value.trim(),
            alt: formValues.mediaALT || "",
          }));

        const endsAt = new Date(formValues.endsAt).toISOString();

        createPost({
            title: formValues.title,
            description: formValues.description,
            endsAt: endsAt,
            media: media,
        });
    });
}

