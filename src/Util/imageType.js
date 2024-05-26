import axios from "axios";

async function getBase64FromUrl(url) {
    const response = await axios.get(url, {
        responseType: 'blob',
    });

    const blob = response.data;
  
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onloadend = () => {
        resolve(reader.result);
      };
      reader.onerror = reject;
      reader.readAsDataURL(blob);
    });
  }

  export {
    getBase64FromUrl
  }