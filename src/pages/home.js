import React, { useState } from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import 'moment/locale/ru';
import { connect } from 'unistore/react';
import Pagination from 'rc-pagination';
import 'rc-pagination/assets/index.css';
import ru_RU from 'rc-pagination/lib/locale/ru_RU';

import Layout from 'components/Layout';
import './home.css';

moment.locale('ru');

const Home = ({ users }) => {
  const displayableUsers = users.slice(1);
  const [page, setPage] = useState(1);
  const lengthpages = displayableUsers.length / 15;
  const pages = Math.ceil(lengthpages);

  const dPage = (page - 1) * 15;
  const isOnline = viewer =>
    Date.now() - Date.parse(viewer.lastOnline) > 120000;

  return (
    <Layout>
      <div className="home-root">
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
            {displayableUsers.slice(dPage, dPage + 15).map(viewer => (
              <tr key={viewer._id}>
                <td>{viewer.username}</td>
                <td>{Math.floor(viewer.totalxp / 60)}ч</td>
                <td>{(viewer.coins / 100).toFixed(2)}</td>
                <td>
                  {isOnline(viewer) ? (
                    moment(Date.parse(viewer.lastOnline)).fromNow()
                  ) : (
                    <span className="online-label">Online</span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <Pagination
          onChange={e => setPage(e)}
          current={page}
          total={pages}
          locale={ru_RU}
        />
      </div>
    </Layout>
  );
};

Home.propTypes = {
  users: PropTypes.array.isRequired,
};

const enhance = connect('users');

export default enhance(Home);
