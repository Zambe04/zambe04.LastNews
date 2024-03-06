fetch('https://hacker-news.firebaseio.com/v0/newstories.json')
  .then(response => {
    if (!response.ok) {
      throw new Error('Errore nella richiesta HTTP, stato ' + response.status);
    }
    return response.text();
  })
  .then(data => {
    console.log(data);
  })
  .catch(error => {
    console.error('Si è verificato un errore durante il recupero dei dati:', error);
  });