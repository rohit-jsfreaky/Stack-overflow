// src/components/LeftSidebar/LeftSidebar.js
import React from 'react';
import './LeftSidebar.css';
import { NavLink } from 'react-router-dom';
import Globe from '../../assets/Globe.svg';
import { useTranslation } from 'react-i18next';

const LeftSidebar = () => {
  const { t } = useTranslation();

  return (
    <div className='left-sidebar'>
      <nav className='side-nav'>
        <NavLink to='/' className='side-nav-links' activeclassname='active'>
          <p>{t('Home')}</p>
        </NavLink>
        <div className='side-nav-div'>
          <div><p>{t('PUBLIC')}</p></div>
          <NavLink to='/Questions' className='side-nav-links' activeclassname='active'>
            <img src={Globe} alt='Globe' />
            <p style={{ paddingLeft: '10px' }}>{t('Questions')}</p>
          </NavLink>
          <NavLink to='/tags' className='side-nav-links' activeclassname='active' style={{ paddingLeft: '40px' }}>
            <p>{t('Tags')}</p>
          </NavLink>
          <NavLink to='/Users' className='side-nav-links' activeclassname='active' style={{ paddingLeft: '40px' }}>
            <p>{t('Users')}</p>
          </NavLink>
        </div>
      </nav>
    </div>
  );
};

export default LeftSidebar;
