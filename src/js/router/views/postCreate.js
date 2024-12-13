import { createPost } from "../../api/post/create.js";
import { getPosts } from "../../api/post/read.js";

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
          mediaContainer.classList.add('flex', 'flex-col', 'space-y-4')
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

async function displayActiveAuctions(auctionContainer) {
  const postContainer = document.getElementById("auctionContainer");
  if (!postContainer) {
    console.error(`Container with id "auctionContainer" not found.`);
    return;
  }
  
  try {
    const posts = await getPosts(1, 10);

    if (!posts || !posts.data) {
      console.error("Unexpected posts structure:", posts);
      return;
    }

    const activePostsWithImages = posts.data.filter((post) => {
      const endsAtDate = new Date(post.endsAt);
      return endsAtDate > new Date() && post.media?.length > 0 && post.media[0]?.url;
    });

    console.log(posts)

    if (activePostsWithImages.length < 2) {
      console.log("Not enough posts with images found.");
      postContainer.innerHTML = "<p>No active auctions available.</p>";
      return;
    }

    activePostsWithImages.slice(0, 2).forEach((post) => {
      const postElement = document.createElement("div");
      postElement.classList.add("post");

      const title = document.createElement("h2");
      title.textContent = post.title;
      postElement.appendChild(title);
      title.addEventListener("click", () => {
        const targetUrl = `/biddaroo/post/index.html?id=${post.id}`;
        window.location.href = targetUrl;

      });
      title.classList.add('font-h2')

        const img = document.createElement("img");
        img.src = post.media[0].url;
        img.alt = `Image of ${post.title}`;
        img.classList.add('w-80')
        postElement.appendChild(img);
        img.addEventListener("click", () => {
          const targetUrl = `/biddaroo/post/index.html?id=${post.id}`;
          window.location.href = targetUrl;
        });


      postContainer.appendChild(postElement);
    });

  } catch (error) {
    console.error("Error fetching or displaying posts:", error);
  }
}

displayActiveAuctions();
