import React, { useEffect } from 'react';
import moment from 'moment';
import 'moment/locale/ru';

import Layout from 'components/Layout';
import './viewer.css';

const Viewer = ({ match, users }) => {
  useEffect(() => window && window.scrollTo(0, 0), []);

  const { params } = match;
  const { name } = params ? params : {};
  const user =
    users && name && users.find(e => e.username.toLowerCase() === name);
  const { coins, totalxp, lastOnline } = user ? user : {};

  const returnMinus = (param, value) => (param ? value : '—');

  return (
    <Layout>
      <div className="viewer-root">
        <table className="viewers-table">
          <thead>
            <tr>
              <th>Никнейм</th>
              <th>Время на стриме</th>
              <th>Монет</th>
              <th>Последний раз был на стриме</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>{name}</td>
              <td>{returnMinus(totalxp, `${Math.floor(totalxp / 60)}ч`)}</td>
              <td>{returnMinus(coins, (coins / 100).toFixed(2))}</td>
              <td>
                {returnMinus(
                  lastOnline,
                  Date.now() - Date.parse(lastOnline) > 120000 ? (
                    moment(Date.parse(lastOnline)).fromNow()
                  ) : (
                    <span className="online-label">Online</span>
                  ),
                )}
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </Layout>
  );
};

export default Viewer;
