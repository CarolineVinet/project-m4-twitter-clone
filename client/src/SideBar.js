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
  &.active {
    color: ${COLORS.primary};
  }
`;

const LogoDiv = styled.div``;

const IconDiv = styled.div`
  padding: 10px;
`;

const SideBarDivStyle = styled.div`
  display: flex;
  flex-direction: column;
  margin-left: 60px;
  align-items: left;
  justify-content: left;
`;

const LinkStyles = styled.div`
  font-weight: bold;
  font-size: 20px;
  display: flex;
  flex-direction: row;
  line-height: 2;
`;

export default SideBar;
