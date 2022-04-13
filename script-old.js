const APIurl = "https://api.dictionaryapi.dev/api/v2/entries/en/";

const logger = (text) => {
  console.log(text);
};

const alerter = (text) => {
  alert(text);
};

function timeout(ms) {
  return new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
}

const runner = (callback) => {
  setTimeout(callback, 5000, "plain logger");
  alerter("po timeout");
};

async function asyncRunner(callback) {
  await timeout(5000);
  callback("await timeout logger");
  alerter("po timeout");
}

// runner(logger);
// asyncRunner(logger);

async function getData() {
  logger("loading gif show");
  logger(1);
  const result = await fetch(APIurl + "bread");
  logger("loading gif hide");
  logger(await result.json());
  logger(2);
  const result1 = await fetch(APIurl + "butter");
  logger("loading gif hide");
  logger(await result1.json());
  logger(3);
  const result2 = await fetch(APIurl + "salt");
  logger("loading gif hide");
  logger(await result2.json());
}

getData();

function getDataThens() {
  logger("loading gif show");
  logger(1);
  fetch(APIurl + "bread")
    .then((response) => response.json())
    .then((result) => {
      logger("loading gif hide");
      logger(result);
    });
  logger(2);
  fetch(APIurl + "butter")
    .then((response) => response.json())
    .then((result) => {
      setTimeout(function () {
        logger("loading gif hide");
        logger(result);
      }, 5000);
    });
  logger(3);
  fetch(APIurl + "salt")
    .then((response) => response.json())
    .then((result) => {
      logger("loading gif hide");
      logger(result);
    });
}
// getDataThens();
