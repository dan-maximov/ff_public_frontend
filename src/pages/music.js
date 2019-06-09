import React from 'react';
import PropTypes from 'prop-types';
import Layout from 'components/Layout';
import './music.css';

const Music = ({ music }) => (
  <Layout>
    <div className="playlist">
      <div className="playlist__header">Всего треков: {music.length}</div>
      {music.map(track => (
        <a
          href={`https://youtu.be/${track.id}`}
          rel="noopener noreferrer"
          target="_blank"
          key={track._id}
          className="playlist__item"
        >
          <img
            alt={track.title}
            src={`https://img.youtube.com/vi/${track.id}/mqdefault.jpg`}
            className="playlist__item__thunmbnail"
          />
          <div className="playlist__item__info">
            <p>{track.title}</p>
            <p className="playlist__item__info__author">{track.author}</p>
            <p className="playlist__item__info__author">
              Прислал {track.sender}
            </p>
          </div>
        </a>
      ))}
    </div>
  </Layout>
);

Music.propTypes = {
  music: PropTypes.array.isRequired,
};

export default Music;
