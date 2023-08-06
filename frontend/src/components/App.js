import '../index.css';
import { Route, Routes, useNavigate } from 'react-router-dom';
import { CurrentUserContext } from '../contexts/CurrentUserContext';
import { registrationUser, loginUser, getToken } from '../utils/auth';
import { useEffect, useState } from 'react';
import { api } from '../utils/api';
import Footer from "./Fotter";
import Main from "./Main";
import ProtectedRouteElement from './ProtectedRoute'
import EditProfilePopup from './EditProfilePopup';
import EditAvatarPopup from './EditAvatarPopup';
import AddPlacePopup from './AddPlacePopup';
import InfoTooltip from './InfoTooltip';
import ImagePopup from './ImagePopup';
import Register from './Register.js';
import Login from './Login';


function App() {
  // Нач стейт юзера
  const [currentUser, setCurrentUser] = useState({});

  const [loggedIn, setLoggedIn] = useState(false);

  const [cards, setCards] = useState([]);
  const navigate = useNavigate();

  //Стейты попапов
  const [isInfoTooltipPopupOpen, setisInfoTooltipPopupOpen] = useState(false)
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false)
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false)
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false)


  const [selectedCard, setSelectedCard] = useState({
    isOpen: false,
    item: {},
  });

  const [emailUser, setEmailUser] = useState('')
  //Залогиневшийся юзер
  const [legalUser, setlegalUser] = useState('')

  useEffect(() => {
    tokenCheck()
  }, [])

  //запрос данных о пользователе с серва
  useEffect(() => {
    api.getUserInfo().then(data => {
      setCurrentUser(data)
    })
      .catch(err => { console.log(err) })
  }, []);

  //Запрос карточек с серва
  useEffect(() => {
    api.getStarterCards().then(card => {
      setCards(card)
    })
      .catch(err => { console.log(err) })
  }, []);

  //Обработчики уведомления о регистрации или ...
  function handlePositiveInfoTooltipOpen (){
    setisInfoTooltipPopupOpen(true)
    setlegalUser(true)
  }

  function handleNegativeInfoTooltipOpen (){
    setisInfoTooltipPopupOpen(true)
    setlegalUser(false)
  }


  //обработчик аватара профиля
  function handleUpdateAvatar({ avatar }) {
    api.setUserAvatar({ avatar }).then(newImgAvatar => {
      setCurrentUser(newImgAvatar)
      closeAllPopups()
    })
      .catch(err => { console.log(err) })
  }


  //обработчик форм профиля
  function handleUpdateUser({ name, about }) {
    api.patchUserInfo({ name, about }).then(userData => {
      setCurrentUser(userData)
      closeAllPopups()
    })
      .catch(err => { console.log(err) })
  }

  //удаление карточки
  function handleCardDelete(card) {
    api.deleteCard(card._id)
      .then(() => {
        setCards((state) => state.filter((item) => item._id !== card._id))
      })
      .catch(err => { console.log(err) })
  }

  //Обработка лайка
  function handleCardLike(card) {
    // Снова проверяем, есть ли уже лайк на этой карточке
    const isLiked = card.likes.some((user) => user._id === currentUser._id);

    // Отправляем запрос в API и получаем обновлённые данные карточки
    if (!isLiked) {
      api.setLikes(card._id).then((newCard) => {
        setCards((state) =>
          state.map((item) => (item._id === card._id ? newCard : item))
        );
      })
        .catch(err => { console.log(err) });
    } else {
      api.deleteLikes(card._id).then((newCard) => {
        setCards((state) =>
          state.map((item) => (item._id === card._id ? newCard : item))
        );
      })
        .catch(err => { console.log(err) });
    }
  }

  //Обработка попапов
  const handleEditAvatarClick = () => {
    setIsEditAvatarPopupOpen(true);
  }
  const handleEditProfileClick = () => {
    setIsEditProfilePopupOpen(true)
  }
  const handleAddPlaceClick = () => {
    setIsAddPlacePopupOpen(true)
  }

  function closeAllPopups() {
    setisInfoTooltipPopupOpen(false)
    setIsEditProfilePopupOpen(false)
    setIsEditAvatarPopupOpen(false)
    setIsAddPlacePopupOpen(false)
    setSelectedCard({
      isOpen: false,
      item: {},
    })
  }
  //добавление карточки
  function handleAddPlaceSubmit({ name, link }) {
    api.addCardToServer({ name, link }).then(newCard => {
      setCards([newCard, ...cards]);
      closeAllPopups();
    })
      .catch(err => { console.log(err) })
  }

  function handleRegisterUser({ email, password }) {
    console.log('app')
    registrationUser({ email, password })
      .then(res => { console.log(res) })
      .then(() => {
        handlePositiveInfoTooltipOpen()
        navigate('/sign-in', { replace: true })
      }).catch((err) => {
        handleNegativeInfoTooltipOpen()
        console.log(err)
      })
  }


  function handleLoginUser({ email, password }) {
    loginUser({ email, password })
      .then(data => {
        if (data.token) {
          localStorage.setItem('token', data.token);
          setLoggedIn(true);
          setEmailUser(email)
          navigate('/', { replace: true })
        }
      })
      .catch((err) => {
        handleNegativeInfoTooltipOpen()
        console.log(err)
      })
  }

  function logOut(){
    localStorage.removeItem('token')
    setLoggedIn(false)
    setEmailUser('')
    navigate("/sign-in");
  }

  function tokenCheck() {
    const token = localStorage.getItem('token')
    if (token)
      getToken(token)
        .then(res => {
          setLoggedIn(true)
          setEmailUser(res.data.email)
          navigate("/", { replace: true })
        })
        .catch((err) => {
          console.log(err)
        })
  }

  return (
    <>
      <CurrentUserContext.Provider value={currentUser}>

        <Routes>

          <Route path="/" element={<ProtectedRouteElement element={Main}
            onEditProfile={handleEditProfileClick}
            onEditAvatar={handleEditAvatarClick}
            onAddPlace={handleAddPlaceClick}
            onCardDelete={handleCardDelete}
            onCardClick={setSelectedCard}
            onCardLike={handleCardLike}
            onClose={closeAllPopups}
            emailUser={emailUser}
            loggedIn={loggedIn}
            onLogOut={logOut}
            cards={cards}
             />} />

          <Route path='/sign-in' element={<Login onLoginUser={handleLoginUser} />} />

          <Route path='/sign-up' element={<Register onRegisre={handleRegisterUser} />} />

        </Routes>

        <Footer />

        <InfoTooltip
          isOpen={isInfoTooltipPopupOpen}
          isLegal={legalUser}
          onClose={closeAllPopups}
        />

        {/* //Попап Аватара */}

        <EditAvatarPopup
          isOpen={isEditAvatarPopupOpen}
          onUpdateAvatar={handleUpdateAvatar}
          onClose={closeAllPopups}
        />

        {/* //Попап Профиля */}

        <EditProfilePopup
          isOpen={isEditProfilePopupOpen}
          onUpdateUser={handleUpdateUser}
          onClose={closeAllPopups}
        />

        {/* //Попап Карточки */}

        <AddPlacePopup
          isOpen={isAddPlacePopupOpen}
          onAddPlace={handleAddPlaceSubmit}
          onClose={closeAllPopups}
        />

        {/* //Попап Картинки */}

        <ImagePopup
          card={selectedCard}
          onClose={closeAllPopups}
        />

      </CurrentUserContext.Provider>
    </>
  );
}
export default App;