import React, { useContext } from "react";
import { NavLink } from "react-router-dom";
import styled from "styled-components";
import Logo from "./Logo";
import GlobalStyles from "./GlobalStyles";
import { FiBookmark, FiHome, FiBell, FiUser } from "react-icons/fi";
import { COLORS } from "./constants";
import { CurrentUserContext } from "./CurrentUserContext";

const SideBar = () => {
  const { currentUser, sidebarStatus } = useContext(CurrentUserContext);
  return (
    <>
      {sidebarStatus === "loaded" ? (
        <SideBarDivStyle>
          <GlobalStyles />
          <LogoDiv>
            <Logo />
          </LogoDiv>
          <LinkStyles>
            <IconDiv>
              <FiHome />
            </IconDiv>
            <StyledLink to="/" aria-label="Go to homepage">
              Home
            </StyledLink>
          </LinkStyles>
          <LinkStyles>
            <IconDiv>
              <FiUser />
            </IconDiv>
            <StyledLink
              to={`/profile/${currentUser.profile.handle}`}
              aria-label="Go to my profile"
            >
              Profile
            </StyledLink>
          </LinkStyles>
          <LinkStyles>
            <IconDiv>
              <FiBell />
            </IconDiv>
            <StyledLink
              to="/notifications"
              aria-label="Go to notifications page"
            >
              Notifications
            </StyledLink>
          </LinkStyles>
          <LinkStyles>
            <IconDiv>
              <FiBookmark />
            </IconDiv>
            <StyledLink to="/bookmarks" aria-label="Go to my bookmarks">
              Bookmarks
            </StyledLink>
          </LinkStyles>
        </SideBarDivStyle>
      ) : null}
    </>
  );
};

const StyledLink = styled(NavLink)`
  text-decoration: none;
  width: 80%;
  &.active {
    color: ${COLORS.primary};
  }
`;

const SideBarDivStyle = styled.div`
  width: 20%;
  display: flex;
  flex-direction: column;
  padding-left: 55px;
  margin-top: 15px;
  align-items: left;
  justify-content: left;
`;

const LogoDiv = styled.div`
  padding-top: 15px;
`;

const IconDiv = styled.div`
  width: 20%;
`;

const LinkStyles = styled.div`
  font-weight: bold;
  font-size: 20px;
  display: flex;
  flex-direction: row;
  line-height: 2;
  width: 100%;
  margin-top: 5px;
  margin-bottom: 5px;
  padding: 10px;

  &:hover {
    background-color: #d1c1f6;
    border-radius: 30px;
  }
`;

export default SideBar;
