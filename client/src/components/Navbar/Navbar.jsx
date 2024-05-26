import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import logo from '../../assets/logo.png';
import search from '../../assets/search.svg';
import Avatar from '../Avatar/Avatar';
import './Navbar.css';
import { useSelector, useDispatch } from 'react-redux';
import { jwtDecode } from 'jwt-decode';
import { setCurrentUser } from '../../actions/currentUser';
import Dropdown from './Dropdown';
import { useTranslation } from 'react-i18next';

const Navbar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { t, i18n } = useTranslation();
  var User = useSelector((state) => state.currentUserReducer);

  useEffect(() => {
    const token = User?.token;
    localStorage.setItem("isMatched", "false");
    if (token) {
      const decodeToken = jwtDecode(token);
      if (decodeToken.exp * 1000 < new Date().getTime()) {
        handleLogout();
      }
    }

    dispatch(setCurrentUser(JSON.parse(localStorage.getItem('Profile'))));
  }, [dispatch]);

  const handleLogout = () => {
    dispatch({ type: 'LOGOUT' });
    navigate('/');
    dispatch(setCurrentUser(null));
  };

  const savedLanguage = localStorage.getItem('language') || 'en';
  const [selectedLanguage, setSelectedLanguage] = useState(savedLanguage);

  const handleLanguageSelect = (option) => {
    const isMatched = localStorage.getItem('isMatched') === 'true';

    if (option.value === 'fr' && !isMatched) {
      alert('Please complete OTP verification to change to French.');
      navigate('/fr-lang-verify');
      return;
    }
    console.log(`Selected language: ${option.label}`);

    localStorage.setItem("label",option.label);
    console.log(option.value);
    console.log(isMatched);

    if (option.value !== 'fr' && !isMatched) {
      alert("Please complete the otp verification")
      navigate('/mobile-lang-verify');
      return;
    }
    setSelectedLanguage(option.value);
    i18n.changeLanguage(option.value);

  };

  useEffect(() => {
    const language = localStorage.getItem('language') || 'en';
    if (language === 'hi') {
      document.body.style.backgroundColor = 'blue';
    } else if (language === 'zh') {
      document.body.style.backgroundColor = 'green';
    } else if (language === 'fr') {
      document.body.style.backgroundColor = 'yellow';
    } else {
      document.body.style.backgroundColor = 'white';
    }
  }, [selectedLanguage]);

  const languageOptions = [
    { value: 'en', label: 'English' },
    { value: 'es', label: 'Spanish' },
    { value: 'hi', label: 'Hindi' },
    { value: 'pt', label: 'Portuguese' },
    { value: 'zh', label: 'Chinese' },
    { value: 'fr', label: 'French' },
  ];

  return (
    <nav className='main-nav'>
      <div className='navbar'>
        <Link to='/' className='nav-item nav-logo'>
          <img src={logo} alt='logo' />
        </Link>
        <Link to='/' className='nav-item main-nav-btn'>{t('About')}</Link>
        <Link to='/' className='nav-item main-nav-btn'>{t('Products')}</Link>
        <Link to='/' className='nav-item main-nav-btn'>{t('For Teams')}</Link>
        <form>
          <input type='text' placeholder={t('Search')} />
          <img src={search} alt='search' width={18} className='search-icon' />
        </form>
        <Dropdown
          options={languageOptions}
          onSelect={handleLanguageSelect}
          selected={selectedLanguage}
        />
        {User === null ? (
          <Link to='/Auth' className='nav-item nav-links'>{t('Login')}</Link>
        ) : (
          <>
            <Avatar backgroundColor='#009dff' px='10px' py='7px' borderRadius='50%'>
              <Link
                to={`/Users/${User?.result._id}`}
                className=''
                style={{ color: 'white', textDecoration: 'none' }}
              >
                {User.result.name.charAt(0).toUpperCase()}
              </Link>
            </Avatar>
            <button className='nav-item nav-links' onClick={handleLogout}>
              {t('Logout')}
            </button>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
