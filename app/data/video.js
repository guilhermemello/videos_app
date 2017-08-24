const ENDPOINT = "http://localhost:4500/api/v1"

var actions = {
  getAll(page) {
    var url = ENDPOINT + '/videos?page=' + page;
    return fetch(url).then((res) => res.json()).then((res) => res);
  },

  get(videoId) {
    var url = ENDPOINT + '/videos/' + videoId;
    return fetch(url).then((res) => res.json()).then((res) => res);
  },

  maisAcessados(page) {
    var url = ENDPOINT + '/videos/mais_acessados?page=' + page;
    return fetch(url).then((res) => res.json()).then((res) => res);
  },

  relacionados(videoId) {
    var url = ENDPOINT + '/videos/' + videoId + '/relacionados';
    return fetch(url).then((res) => res.json()).then((res) => res.videos);
  },

  porDisciplina(disciplinaId) {
    var url = ENDPOINT + '/videos/por_disciplina?id=' + disciplinaId;
    return fetch(url).then((res) => res.json()).then((res) => res.videos);
  },

  createView(videoId) {
    var url = ENDPOINT + '/videos/' + videoId + "/view";
    return fetch(url, { method: 'POST' });
  },

  search(query) {
    var url = ENDPOINT + '/videos/search?query=' + query;
    return fetch(url).then((res) => res.json()).then((res) => res.videos);
  },

  like(videoId) {
    var url = ENDPOINT + '/videos/' + videoId + "/like";
    return fetch(url, { method: 'POST' });
  },

  dislike(videoId) {
    var url = ENDPOINT + '/videos/' + videoId + "/dislike";
    return fetch(url, { method: 'POST' });
  }
};

export const VIDEO_API = actions;
