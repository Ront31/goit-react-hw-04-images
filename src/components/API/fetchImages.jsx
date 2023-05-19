import axios from 'axios';

axios.defaults.baseURL = `https://pixabay.com/api`;

export const fetchImages = async (inputValue, page) => {
  const response = await axios.get(
    `/?q=${inputValue}&page=${page}&key=29588079-fbc492831fdad231bf7222b96&image_type=photo&orientation=horizontal&per_page=12`
  );
  console.log(response.data.hits);
  return response.data.hits.map(image => {
    return {
      id: image.id,
      webformatURL: image.webformatURL,
      largeImageURL: image.largeImageURL,
      tags: image.tags,
    };
  });
};
