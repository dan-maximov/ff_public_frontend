import React, { useEffect, useState, useRef } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import './Layout.css';
import { withRouter } from 'react-router-dom';

const Header = ({ history, showModal }) => (
  <header className={showModal ? 'header__root opened' : 'header__root'}>
    <div className="header__body">
      <div className="header__inner">
        <a
          href="https://twitch.tv/friendlyfang"
          rel="noopener noreferrer"
          target="_blank"
        >
          FriendlyFang
        </a>
        <Link to="/">Список зрителей</Link>
        <Link to="/music">Список заказанной музыки</Link>
        <div onClick={() => history.push('?find')}>Найти зрителя</div>
      </div>
    </div>
  </header>
);

const Footer = () => (
  <div className="footer__root">
    <div className="footer__inner">
      <a href="mailto:meatspincom@cock.li">(c) meatspincom</a>
    </div>
  </div>
);

const Modal = ({ history }) => {
  const wrapper = useRef(null);
  const input = useRef(null);
  const [nickname, setNickname] = useState('');

  const handleClick = e => {
    if (wrapper.current && !wrapper.current.contains(e.target)) {
      history.goBack();
    }
  };

  const checkKey = e => {
    if (e.key === 'Enter') {
      history.push(`/viewer/${nickname.toLowerCase()}`);
    }
    if (e.key === 'Escape') {
      history.goBack();
    }
  };

  useEffect(() => {
    input.current.focus();
    document.addEventListener('click', handleClick);
    document.addEventListener('touchend', handleClick);
    return () => {
      document.removeEventListener('click', handleClick);
      document.removeEventListener('touchend', handleClick);
    };
  });

  return (
    <div ref={wrapper} className="modal">
      <span>Введите ник из чата</span>
      <input
        ref={input}
        onChange={e => setNickname(e.target.value)}
        onKeyDown={checkKey}
      />
      <Link to={`/viewer/${nickname.toLowerCase()}`}>Перейти в профиль</Link>
    </div>
  );
};

const Layout = ({ showModal, history, location, children }) => (
  <div className="layout__root">
    {!!location.search.includes('find') && <Modal history={history} />}
    <Header showModal={!!location.search.includes('find')} history={history} />
    <div className="layout__children">{children}</div>
    <Footer />
  </div>
);

Header.propTypes = {
  history: PropTypes.object.isRequired,
  showModal: PropTypes.bool.isRequired,
};

Modal.propTypes = {
  history: PropTypes.object.isRequired,
};

Layout.propTypes = {
  showModal: PropTypes.bool.isRequired,
  history: PropTypes.object.isRequired,
  location: PropTypes.object.isRequired,
  children: PropTypes.node.isRequired,
};

const layoutEnhance = withRouter;

export default layoutEnhance(Layout);
