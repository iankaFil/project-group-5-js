const axios = require('axios').default;

export class SearchApiService {
  constructor() {
    this.searchQuery = '';
    this.page = 1;
    this.key = '31449444226ba6345698313fe055564a';
    this.baseURL = 'https://api.themoviedb.org/3/';
  }

  async getTrendingFilms() {
    try {
      const URL = `${this.baseURL}trending/movie/week?api_key=${this.key}`;
      const response = await axios.get(URL);
      return response.data;
    } catch (error) {
      throw new Error(error);
    }
  }
}
