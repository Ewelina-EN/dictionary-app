// const api_data = require("./api_response.json");
// console.log(api_data);
const phonetic_template = (element) => {
  let phoneticHTML =
    `<div class="phonetic js-phonetic">` +
    `<a class="phonetic_link js-link" href="${element.audio}">Listen</a>` +
    `<p class="phonetic_text js-text">${element.text}</p>` +
    `</div>`;
  return phoneticHTML;
};

const meaning_template = (element) => {
  let definitions_html = "";
  for (definition of element.definitions) {
    definitions_html += definition_template(definition);
  }
  let meaningHTML =
    `<div class="meaning js-meaning">` +
    `<h1 class="partOfSpeech">${element.partOfSpeech}</h1>` +
    definitions_html +
    `</div>` +
    `<div class="synonyms js-synonyms">`;
  if (element.synonyms) {
    meaningHTML +=
      `<strong>Similar:</strong>` +
      `<ul>` +
      `<li>${element.synonyms}</li>` +
      `</ul>`;
  }
  meaningHTML += `</div>`;
  return meaningHTML;
};

const definition_template = (element) => {
  let definitionHTML =
    `<div class="js-definition>` + `<p>${element.definition}</p>`;
  if (element.example) {
    definitionHTML += `<em>${element.example}</em>`;
  }
  definitionHTML +=
    `<p>${element.synonyms}</p>` + `<p>${element.antonyms}</p>` + `</div>`;
  return definitionHTML;
};

fetch("./api_response.json")
  .then((response) => response.json())
  .then((json) => {
    const html_phonetics_section = document.querySelector(
      ".js-phonetics-container"
    );
    const html_meanings_section = document.querySelector(
      ".js-meaning-container"
    );
    console.log(html_meanings_section);
    for (record of json) {
      for (phonetic of record.phonetics) {
        html_phonetics_section.innerHTML =
          html_phonetics_section.innerHTML + phonetic_template(phonetic);
      }
      for (meaning of record.meanings) {
        html_meanings_section.innerHTML += meaning_template(meaning);
      }
    }
  });
