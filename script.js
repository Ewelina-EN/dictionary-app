const inputval = document.querySelector(".js-input");
const searchBtn = document.querySelector(".js-button");
const phonetic = document.querySelector(".js-phonetics-container");
const meaning = document.querySelector(".js-meaning-container");
const photos = document.querySelector(".js-photos-container");
const APIDictionaryUrl = "https://api.dictionaryapi.dev/api/v2/entries/en/";
const photoApiKey = "563492ad6f91700001000001aecbe5270a824bd1aa199ffdd5f51297";
const APIPhotoUrl = "https://api.pexels.com/v1/search?query=";
const errorBox = document.querySelector(".js-error-container");

searchBtn.addEventListener("click", function (e) {
  e.preventDefault();
  phonetic.classList.add("hidden");
  meaning.classList.add("hidden");
  photos.classList.add("hidden");
  errorBox.classList.add("hidden");
  const search_term = inputval.value != "" ? inputval.value : "dfgdsgsagffg";
  fetchDictionaryData(`${APIDictionaryUrl}${search_term}`);
  fetchPhotosData(`${APIPhotoUrl}${search_term}`);
});

function fetchDictionaryData(url) {
  fetch(url)
    .then((response) => handleResponse(response))
    .then((data) => wordDetails(data));
}

function handleResponse(response) {
  console.log("response", response);
  if (!response.ok) {
    errorTemplate();
    throw new Error(response.statusText, { cause: response });
  }
  return response.json();
}

function phonetic_template(data) {
  `<h1 class="js-header">${inputval.value}</h1>` + `<hr />`;
  let phoneticHTML =
    `<div class="phonetic">` +
    `<a class="phonetic_link" href="${data.audio}"> <img class="phonetic_icon" src="sound.png" /> </a>` +
    `<p class="phonetic_text">${data.text}</p>` +
    `</div>`;
  return phoneticHTML;
}

function meaning_template(data) {
  let definitions_html = "";
  for (definition of data.definitions) {
    definitions_html += definition_template(definition);
  }
  let meaningHTML =
    `<div>` +
    `<h1 class="partOfSpeech">${data.partOfSpeech}</h1>` +
    `<hr />` +
    definitions_html +
    `</div>` +
    `<div>`;
  if (data.synonyms.length) {
    console.log(1, data.synonyms);
    meaningHTML += `<strong>Similar:</strong>` + `<ul>`;
    for (synonym of data.synonyms) {
      meaningHTML += `<li>${synonym}</li>`;
    }
    meaningHTML += `</ul>`;
  }
  meaningHTML += `</div>`;
  return meaningHTML;
}

function definition_template(data) {
  let definitionHTML = `<div>` + `<p class="definition">${data.definition}</p>`;
  if (data.example) {
    definitionHTML += `<span class="quote">${data.example}</span>`;
  }
  definitionHTML +=
    `<p>${data.synonyms}</p>` + `<p>${data.antonyms}</p>` + `</div>`;
  return definitionHTML;
}

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

function fetchPhotosData(url) {
  fetch(url, {
    headers: {
      Authorization: photoApiKey,
    },
  })
    //odpowidź API dot. zdjęć nawet przy pustym zbiorze jest 200 ok
    .then((response) => response.json())
    .then((data) => photoTemplate(data));
}

function photo_template(data) {
  let photoHTML = `<img class="img" src=${data.src.tiny}/>`;
  return photoHTML;
}

function photoTemplate(data) {
  // znak zapytania sprawdza czy obiekt istnieje
  // jeśli nie istnieje, zatrzymuje if z wynikiem false
  if (data.photos?.length) {
    photos.innerHTML = "";
    for (photo_item of data.photos) {
      photos.innerHTML += photo_template(photo_item);
    }
    photos.classList.remove("hidden");
  }
}

function errorTemplate() {
  errorBox.classList.remove("hidden");
  if (inputval.value == "") {
    errorBox.innerHTML =
      `<h1 class="errorHeader"> Just type the word you're looking for in the search field` +
      `</h1>`;
  } else {
    errorBox.innerHTML =
      `<h2 class="errorHeader">Your search terms did not match any entries </h2>` +
      `<hr />` +
      `<div class="error">` +
      `<p>We cannot find any entries matching: ` +
      `<p>` +
      `<b>${inputval.value}</b>` +
      `</p>` +
      `</p>` +
      `<p> Please check you have typed the word correctly.</p>` +
      `</div>`;
  }
}
