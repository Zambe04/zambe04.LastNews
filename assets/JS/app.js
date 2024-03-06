let myData;
let currentFrom = 0;
let currentTo = 10;

window.onload = () => showData();

async function showData() {
  try {
    await fetchData(currentFrom, currentTo);
    await getNewsDetails();

    function createElement(tagName, textContent, className) {
      const newElement = document.createElement(tagName);
      newElement.textContent = textContent;
      newElement.classList.add(className);
      if (tagName === "div") {
        button.insertAdjacentElement("beforebegin", newElement);
      }
      return newElement;
    }

    for (const object of newsDetails) {
      let position = newsDetails.indexOf(object);

      let title = newsDetails[position]["title"];
      let linkNew = newsDetails[position]["url"];
      
      // MANCA DA AGIGUNGERE LA DATA

      // Inizio a modificare il DOM

      let div = createElement("div", title, "news-block");
      let a = createElement("p", linkNew, "url");
      a.addEventListener("click", function(){
        window.open(linkNew, '_blank')
      });
      div.appendChild(a);
    }
  } catch (error) {
    console.error("An error occurred while adding:", error);
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

    if (currentFrom > 490 || currentTo == 500) {
      console.log("There is no further news");
      return myData;
    }
    const data = await response.json();
    myData = data.slice(currentFrom, currentTo);
    return myData;
  } catch (error) {
    console.error("An error occurred while fetching the data:", error);
  }
}

// Dagli ID devo estrarre titolo, link e data della news

const newsDetails = [];

async function getNewsDetails() {
  try {
    for (let id of myData) {
      const response = await fetch(
        ` https://hacker-news.firebaseio.com/v0/item/${id}.json`
      );
      let newsItem = await response.json();
      if (newsItem) {
        newsDetails.push(newsItem);
      }
    }
    return newsDetails;
  } catch (error) {
    console.error("An error occurred while fetching the data:", error);
  }
}

// Incremento dei dati ad ogni click

let button = document.querySelector("button");
button.addEventListener("click", async function () {
  currentFrom += 10;
  currentTo += 10;
  await showData();
});
