async function fetchQuestions(category, difficulty) {
    const url = `https://opentdb.com/api.php?amount=20&category=${category}&difficulty=${difficulty}&type=multiple`;
    const response = await fetch(url);
    const data = await response.json();
    return data.results;
}

export { fetchQuestions };
