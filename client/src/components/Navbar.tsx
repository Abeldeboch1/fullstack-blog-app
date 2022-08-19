/* eslint-disable react/jsx-one-expression-per-line */
import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector, shallowEqual, useDispatch } from 'react-redux';
import styled from 'styled-components';
import { signOut } from '../store/UserSlice';
import { RootState } from '../store';
import icon from '../img/plane.png';
import defautUserIcon from '../img/user.png';

const StyledNavbar = styled.nav`
  width: 100%;
  height: 8vh;
  background: none;
  color: #ededed;
  font-weight: 500;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  button {
    background: none;
    border: none;
    cursor: pointer;
    color: white;
  }
  .signout {
    font-size: 1.5rem;
    text-decoration: none;
    color: #da0037;
  }
  a {
    font-size: 1.5rem;
    text-decoration: none;
    color: #da0037;
  }
  & div {
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 0 3rem;
    & .user-profile {
      color: #ededed;
      font-size: 1.1rem;
      padding: 0 5px;
      &:hover {
        text-decoration: underline;
      }
    }
    &.logo {
      font-size: 3rem;
      color: #da0037;
      & img {
        width: 45px;
        height: 45px;
        margin-top: 15px;
      }
    }
  }
  & img {
    width: 25px;
    height: 25px;
    margin: 0 1rem;
  }
  @media (max-width: 800px) {
    height: 8vh;
    max-height: 8vh;
    font-weight: 400;
    div {
      padding: 0;
    }
  }
  & .open {
    transform: translateY(0);
    transition: transform 0.35s ease;
  }
  & .closed {
    transform: translateY(-100px);
    transition: transform 0.35s ease;
  }
`;

function Navbar() {
  const dispatch = useDispatch();
  const { loggedIn, username, image } = useSelector(
    (state: RootState) => state.user,

    shallowEqual,
  );
  const buttonSignOut = () => {
    dispatch(signOut());
  };
  const [isOpen, setIsOpen] = useState<boolean>(false);
  return (
    <StyledNavbar>
      <div className="logo">
        <p>Socialize</p>
        <NavLink to="/">
          <img src={icon} alt="logo of a paper airplane" />
        </NavLink>
      </div>

      <div>
        {loggedIn && (
          <>
            <p>
              Welcome, <span> </span> {username}
            </p>
            <div
              className={isOpen ? 'open' : 'closed'}
              onMouseLeave={() => setIsOpen(false)}
            >
              <NavLink to="/userInfo" className="user-profile">
                View/Edit Profile
              </NavLink>
            </div>
            <img
              src={image || defautUserIcon}
              className="userIcon"
              alt="generic user icon"
              onMouseEnter={() => setIsOpen(true)}
            />
          </>
        )}
        {loggedIn ? (
          <button
            type="button"
            className="signout"
            onClick={buttonSignOut}
          >
            Sign out
          </button>
        ) : (
          <NavLink to="/signin">Sign in</NavLink>
        )}
      </div>
    </StyledNavbar>
  );
}

export default Navbar;
