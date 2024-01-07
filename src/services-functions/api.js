import axios from 'axios';
import Notiflix from 'notiflix';
// const API_KEY = '40581728-038ade9540e93c29e31f494aa';
// axios.defaults.headers.common['x-api-key'] = API_KEY;

// https://pixabay.com/api/ ?q=cat& page=1 & key=your_key & image_type=photo&orientation=horizontal&per_page=12

// функція-кур`єр яка біжить і робить запит на сервер.
export function fetchInfo(userQuery, pageLoad) {
  const BASE_URL = 'https://pixabay.com/api/';
  const API_KEY = '40581728-038ade9540e93c29e31f494aa';
  // const PARAMS = `&image_type=photo&orientation=horizontal&safesearch=true&page=${pageLoad}&per_page=12`
  // const URL = `${BASE_URL}?key=${API_KEY}&q=${userQuery}${PARAMS}`;
  const PARAMS = `&image_type=photo&orientation=horizontal&per_page=12`;

  const URL = `${BASE_URL}?q=${userQuery}&page=${pageLoad}&key=${API_KEY}${PARAMS}`;
  // console.log(URL)

  return axios
    .get(URL) // fetch(URL).then(res => res.json())
    .then(resp => {
      // console.log(resp.data);
      // console.log(resp.data.totalHits)
      // console.log(resp.data.hits);

      // Мене цікавить id, webformatURL, largeImageURL, tags.

      return resp.data.hits;
    })
    .catch(err => {
      Notiflix.Notify.failure('От халепа! Щось пішло не так!'); // тренування

      console.log(`error: ${err}`);
    });
}

