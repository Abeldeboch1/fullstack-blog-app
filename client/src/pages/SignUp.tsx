import React, {
  useState,
  useEffect,
  FormEvent,
  ChangeEvent,
} from 'react';
import { useDispatch, useSelector, shallowEqual } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { RootState } from '../store';
import { StyledForm } from './Signin';
import {
  signUpUser,
  setLoggedInTrue,
  updateProfilePicture,
} from '../store/UserSlice';
import { getUsers } from '../utils/api';
import { ExistingUser } from '../types/types';

const ProfilePictureWrapper = styled.section`
  height: 92vh;
  width: 100vw;
  display: flex;
  flex-direction: column;
  align-items: center;
  .image-form {
    margin: 0 auto;
    padding: 0 auto;
  }
  .nav-to-home {
    margin-right: 10%;
    align-self: flex-end;
  }
  .prev-prof-img {
    background: white;
    height: 40vh;
    width: 50vw;
    margin: 0 auto;
  }
`;

function SignUp() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const {
    userId,
    id,
    username: reduxName,
    error,
  } = useSelector((state: RootState) => state.user, shallowEqual);
  const [username, setUsername] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [email, setEmail] = useState('');
  const [users, setUsers] = useState([]);
  const [signedUp, setSignedUp] = useState(false);
  const [picture, setPicture] = useState({});
  const [previewPic, setPreviewPicture] = useState('');
  const [imgBtnDisabled, setImgBtnDisabled] = useState(true);
  let disabled = false;
  let repeatUser = false;
  let repeatEmail = false;
  useEffect(() => {
    getUsers().then(({ data }) => setUsers(data));
  }, []);
  async function signUp(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const signUpInfo = {
      username,
      password,
      email,
      date: Date.now(),
    };
    const results = await dispatch<any>(signUpUser(signUpInfo));
    if (!results.error) {
      setSignedUp(true);
    }
  }
  // change event for selecting files
  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files || e.target.files.length === 0) {
      setPreviewPicture('');
      setImgBtnDisabled(true);
      return;
    }
    setPicture(e.target.files[0]);
    setPreviewPicture(URL.createObjectURL(e.target.files[0]));
    setImgBtnDisabled(false);
  };

  // user can add profile picture to account after they sign up for account
  const addProfilePicture = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const addImageParams = {
      userId,
      body: {
        id,
        image: picture,
        username: reduxName,
      },
    };
    const response = await dispatch<any>(
      updateProfilePicture(addImageParams),
    );
    if (!response.error) {
      dispatch(setLoggedInTrue());
      navigate('/');
    }
  };

  // user can navigate to home page without adding image
  const continueWithoutPic = () => {
    dispatch(setLoggedInTrue());
    navigate('/');
  };
  // checks if username or password is empty and disables button
  if (!username || !password) {
    disabled = true;
  }
  /* if username or email is equal to an existing username
    or email in the database the button is disabled */
  users.forEach(
    ({ username: prevUsername, email: prevEmail }: ExistingUser) => {
      if (username.toLowerCase() === prevUsername.toLowerCase()) {
        disabled = true;
        repeatUser = true;
      }
      if (email.toLowerCase() === prevEmail.toLowerCase()) {
        disabled = true;
        repeatEmail = true;
      }
    },
  );
  return (
    <StyledForm>
      {signedUp ? (
        <ProfilePictureWrapper>
          <h1>Add a profile picture to your account</h1>
          {previewPic && (
            <img
              className="prev-prof-img"
              src={previewPic}
              alt="preview-pic"
            />
          )}
          <form className="image-form" onSubmit={addProfilePicture}>
            <input
              type="file"
              id="file"
              onChange={handleImageChange}
            />
            <button
              className="add-pic"
              type="submit"
              disabled={imgBtnDisabled}
            >
              Add Profile Picture
            </button>
          </form>
          <button
            className="nav-to-home"
            type="button"
            onClick={continueWithoutPic}
          >
            Later
          </button>
        </ProfilePictureWrapper>
      ) : (
        <section>
          {error && <h1>error</h1>}
          {repeatUser && <h1>Username exists already</h1>}
          {repeatEmail && <h1>Email exists already</h1>}
          <p>Sign Up</p>
          <i className="fa-solid fa-user-plus" />
          <form onSubmit={signUp}>
            <label
              htmlFor="email"
              id="email"
              style={{ marginTop: '1em' }}
            >
              {' '}
              Enter Email:
            </label>
            <input
              type="email"
              placeholder="example@gmail.com"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <label htmlFor="username" id="username">
              {' '}
              Enter Username:
            </label>
            <input
              type="text"
              placeholder="@username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
            <label htmlFor="password" id="password">
              {' '}
              Enter Password:
            </label>
            <input
              type="password"
              placeholder="********"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <button type="submit" disabled={disabled}>
              Sign Up
            </button>
          </form>
        </section>
      )}
    </StyledForm>
  );
}

export default SignUp;
