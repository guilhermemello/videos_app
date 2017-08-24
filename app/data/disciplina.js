const ENDPOINT = "http://localhost:4500/api/v1"

var actions = {
  getAll() {
    var url = ENDPOINT + '/disciplinas';
    return fetch(url).then((res) => res.json()).then((res) => res);
  }
};

export const DISCIPLINA_API = actions;
