let inputval = document.querySelector(".js-input");
let searchBtn = document.querySelector(".js-button");
let phonetic = document.querySelector(".js-phonetics-container");
let meaning = document.querySelector(".js-meaning-container");
let APIUrl = "https://api.dictionaryapi.dev/api/v2/entries/en/";

function fetchData(url) {
  fetch(url)
    .then((response) => response.json())
    .then((data) => wordDetails(data));
}

searchBtn.addEventListener("click", function (e) {
  e.preventDefault();
  phonetic.classList.add("hidden");
  meaning.classList.add("hidden");
  fetchData(`${APIUrl}${inputval.value}`);
});

const phonetic_template = (data) => {
  `<h1 class="js-header">${inputval.value}</h1>` + `<hr />`;
  let phoneticHTML =
    `<div class="phonetic js-phonetic">` +
    `<a class="phonetic_link js-link" href="${data.audio}"> <img class="phonetic_icon" src="sound.png" /> </a>` +
    `<p class="phonetic_text js-text">${data.text}</p>` +
    `</div>`;
  return phoneticHTML;
};

const meaning_template = (data) => {
  let definitions_html = "";
  for (definition of data.definitions) {
    definitions_html += definition_template(definition);
  }
  let meaningHTML =
    `<div class="meaning js-meaning">` +
    `<h1 class="partOfSpeech">${data.partOfSpeech}</h1>` +
    `<hr />` +
    definitions_html +
    `</div>` +
    `<div class="synonyms js-synonyms">`;
  if (data.synonyms) {
    meaningHTML +=
      `<strong>Similar:</strong>` +
      `<ul>` +
      `<li>${data.synonyms}</li>` +
      `</ul>`;
  }
  meaningHTML += `</div>`;
  return meaningHTML;
};

const definition_template = (data) => {
  let definitionHTML = `<div>` + `<p class="definition">${data.definition}</p>`;
  if (data.example) {
    definitionHTML += `<span class="quote">${data.example}</span>`;
  }
  definitionHTML +=
    `<p>${data.synonyms}</p>` + `<p>${data.antonyms}</p>` + `</div>`;
  return definitionHTML;
};

function wordDetails(data) {
  phonetic.innerHTML = "";
  for (record of data) {
    for (phonetic_item of record.phonetics) {
      phonetic.innerHTML += phonetic_template(phonetic_item);
    }
    for (meaning_item of record.meanings) {
      meaning.innerHTML += meaning_template(meaning_item);
    }
  }
  phonetic.classList.remove("hidden");
  meaning.classList.remove("hidden");
}
