import "whatwg-fetch";


export default class Http {
  static async request(method, url, data, type = "json") {
    if (method === "get") {
      this.get(url, data, type);
    } else {
      this.post(url, data, type);
    }
  }

  static async get(url, data, type = "json") {
    let params = "";
    for (let key in data) {
      if (!params) {
        params += `?${key}=${data[key]}`;
      } else {
        params += `&${key}=${data[key]}`;
      }
    }
    console.log(params);

    try {
      let response = await window.fetch(`${url}${params}`);
      //   console.log(response);
      return type === "json" ? response.json() : response.text();
    } catch (error) {
      console.error(error);
    }
  }

  static async post(url, data, type = "json") {
    try {
      let response = await window.fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          ...data
        })
      });
      return response;
    } catch (error) {
      console.log(error);
    }
  }
  /**
   * fetch不支持jsonp请求,此处使用axios
   */
  // static async requestJsonp(url, data) {
  //   let params = "";
  //   for (let key in data) {
  //     if (!params) {
  //       params += `?${key}=${data[key]}`;
  //     } else {
  //       params += `&${key}=${data[key]}`;
  //     }
  //   }
  //   try {
  //       let response = await fetchJsonp(`${url}${params}`);
  //       return response;
  //   } catch (error) {
  //       console.log(error);
  //   }
    
  // }
}
