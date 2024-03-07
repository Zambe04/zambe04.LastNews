let myData = [];
let currentFrom = 0;
let currentTo = 10;
let button = document.querySelector("button");

button.innerHTML = "Load More";
window.onload = () => showData();

async function getNewsDetails(id) {
  const response = await fetch(
    ` https://hacker-news.firebaseio.com/v0/item/${id}.json`
  );
  return await response.json();
}

async function showData() {
  button.innerHTML = "Loading...";
  try {
    await fetchData(currentFrom, currentTo);
  } catch (error) {
    console.error("An error occurred while adding:", error);
  } finally {
    button.innerHTML = "Load More";
  }
}

// Recupero di tutti gli ID

async function fetchData(currentFrom, currentTo) {
  try {
    const response = await fetch(
      "https://hacker-news.firebaseio.com/v0/newstories.json"
    );

    if (!response.ok) {
      throw new Error("HTTP request error, status " + response.status);
    }

    const data = await response.json();
    let fetchedIds = data.slice(currentFrom, currentTo);
    for (let currentId of fetchedIds) {
      let currentNew = await getNewsDetails(currentId);
      printOnDOM(currentNew);
    }
  } catch (error) {
    console.error("An error occurred while fetching the data:", error);
  }
}

function printOnDOM(currentNew) {
  document.getElementById("content").insertAdjacentHTML(
    "beforeend",
    `
    <div class="card">
        <div class="card-body"> 
            <h5 class="card-title">
            <span class="text-title">${currentNew.title} </span> - 
            <a id="read-more" href="${currentNew.url}" target="_blank"> Read more</a>
            </h5>
            <p class="card-text"> (Published: 
                ${new Date(currentNew.time).toLocaleDateString("it-IT", {
                  year: "numeric",
                  month: "2-digit",
                  day: "2-digit",
                })})
            </p>
        </div>
    </div>`
  );
}

// Incremento dei dati ad ogni click

button.addEventListener("click", async function () {
  currentFrom = currentTo;
  currentTo += 10;
  await showData();
});
