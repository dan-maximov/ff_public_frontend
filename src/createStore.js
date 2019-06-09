import createStore from 'unistore';
import axios from 'axios';

const banlist = [
  'friendlyfake',
  'moobot',
  'vivbot',
  'commanderroot',
  'toxic_cat',
  '1111azazazel1111',
  'p0sitivitybot',
  'p0lizei_',
  'bananennanen',
  'skinnyseahorse',
  'apricotdrupefruit',
  'anotherttvviewer',
];

export default () => {
  const store = createStore({
    users: [],
    music: [],
    token: null,
  });

  const setUsers = store.action((_, users) => ({ users }));
  const setMusic = store.action((_, music) => ({ music }));

  axios
    .get('/api/users')
    .then(res => {
      setUsers(
        res.data
          .sort((a, b) => b.totalxp - a.totalxp)
          .filter(viewer => !banlist.includes(viewer.username)),
      );
      axios
        .get('/api/music')
        .then(res => setMusic(res.data))
        .catch(err => console.log(err));
    })
    .catch(err => console.log(err));

  return store;
};
