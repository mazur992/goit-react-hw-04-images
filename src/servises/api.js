import axios from 'axios';
const API_KEY = '34897790-a423b54c5255b60572e3509aa';
axios.defaults.baseURL = 'https://pixabay.com/api/';

export default async function Api(search, page) {
  let apiImg = `?q=${search}&page=${page}&key=${API_KEY}&image_type=photo&orientation=horizontal&per_page=12`;

  const response = await axios(apiImg);
  return await response.data.hits;
}
