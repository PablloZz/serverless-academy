import { endpoints } from "./endpoints.js";

const isDoneCount = { doneTrue: 0, doneFalse: 0 };

function checkIsDone(data, endpoint) {
  if (Array.isArray(data)) {
    data.forEach(singleData => checkIsDone(singleData, endpoint));
    return;
  }

  const keys = Object.keys(data);
  if (keys.length && data.toString() !== data) {
    if ("isDone" in data) {
      if (data.isDone === true) {
        console.log(`[Success] ${endpoint}: isDone - True`);
      } else {
        console.log(`[Success] ${endpoint}: isDone - False`);
      }
      return data.isDone ? isDoneCount.doneTrue++ : isDoneCount.doneFalse++;
    }
    keys.forEach(key => checkIsDone(data[key], endpoint));
  }
}

async function getData(endpoints) {
  for await (const endpoint of endpoints) {
    for (let index = 0; index <= 2; index++) {
      try {
        const response = await fetch(endpoint);
        const data = await response.json();

        if (!data || !data?.length || !Object.keys(data ?? {}).length) {
          throw new Error();
        }
        checkIsDone(data, endpoint);
        break;
      } catch (error) {
        console.log(`[Fail] ${endpoint}: The endpoint is unavailable`);
      }
    }
  }
  console.log(isDoneCount);
}

getData(endpoints);
