import axios from 'axios';

axios.defaults.baseURL = `https://pixabay.com/api`;

export const fetchImagesTotal = async (inputValue, page) => {
  const response = await axios.get(
    `/?q=${inputValue}&page=${page}&key=29588079-fbc492831fdad231bf7222b96&image_type=photo&orientation=horizontal&per_page=12`
  );
  const total = response.data.totalHits;
  return total;
};
