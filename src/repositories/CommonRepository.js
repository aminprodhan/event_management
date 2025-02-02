import Repository, { baseUrlApi, getUserToken} from "./Repository";
class CommonRepository {
  async post(route,data) {
    const url = `${baseUrlApi}${route}`;
    const reponse = await Repository.post(url,data)
      .then((response) => {
        return response.data;
      })
      .catch((error) => {
        return {error: error.response.data};
      });
    return reponse;
  }
  async get(route,params) {
    const url = `${baseUrlApi}${route}`;
    const reponse = await Repository.get(url,{params:params})
      .then((response) => {
        return response.data;
      })
      .catch((error) => {
        return {error: error.response.data};
      });
    return reponse;
  }
  async downloadFile(route) {
      const url = `${baseUrlApi}${route}`;    
      try {
        const response = await Repository.get(url, {
            responseType: 'blob',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${getUserToken()}`,
            },
        });
        // Create a URL for the blob
        const urlBlob = window.URL.createObjectURL(new Blob([response.data]));
        const link = document.createElement('a');
        link.href = urlBlob;
        link.setAttribute('download', `data-attendees-${Math.random()}.csv`); // Specify the file name
        document.body.appendChild(link);
        link.click(); // Trigger the download
        link.remove(); // Clean up the DOM
    } catch (error) {
        console.error('Download error:', error.response);
        return { error: error.response ? 'You are not authorized to perform this action' : 'An error occurred' };
    }
  }
}
export default new CommonRepository();
