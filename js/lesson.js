const axios = {
  get: (link) => {
    return new Promise((res, rej) => {
      const newRequest = new XMLHttpRequest();

      newRequest.open("GET", link);

      newRequest.onload = () => {
        res(JSON.parse(newRequest.response));
      };
      newRequest.onerror = () => {
        rej("Xatolik");
      };
      newRequest.onabort = () => {
        rej("xatolik");
      };
      newRequest.send();
    });
  },
};

(async function () {
  try {
    const data = await axios.get("https://jsonplaceholder.typicode.com/todos");
    console.log(data);
  } catch (error) {
    console.log(error);
  }
})();
