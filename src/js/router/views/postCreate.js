import { createPost } from "../../api/post/create.js";

const form = document.querySelector("#createListing");
const mediaContainer = document.querySelector("#media-container");

if (form && mediaContainer) {
    mediaContainer.addEventListener("input", (event) => {
   

      const inputSection = document.createElement('div');
      inputSection.classList.add('flex', 'flex-col', 'space-y-4')
        const allInputs = mediaContainer.querySelectorAll("input[name='mediaURL']");
        const lastInput = allInputs[allInputs.length - 1];
        
        if (event.target === lastInput && allInputs.length < 8 && lastInput.value.trim() !== "") {

          const newInput = document.createElement("input");
          newInput.type = "url";
          newInput.name = "mediaURL";
          newInput.placeholder = "Image URL";
          mediaContainer.appendChild(newInput);
          newInput.classList.add('bg-transparent', 'outline', 'outline-1', 'p-1', 'outline-white/45', 'font-p')
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

