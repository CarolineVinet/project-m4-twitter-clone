import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import GlobalStyles from "./GlobalStyles";
import styled from "styled-components";
import HomeFeed from "./HomeFeed";
import TweetDetails from "./TweetDetails";
import Profile from "./Profile";
import Bookmarks from "./Bookmarks";
import Notifications from "./Notifications";
import SideBar from "./SideBar";
import CurrentUserContext from "./CurrentUserContext";

const App = () => {
  return (
    <Router>
      <GlobalStyles />
      <Wrapper>
        <SideBar />
        <Switch>
          <Route exact path="/">
            <HomeFeed></HomeFeed>
          </Route>
          <Route exact path="/notifications">
            <Notifications></Notifications>
          </Route>
          <Route exact path="/bookmarks">
            <Bookmarks></Bookmarks>
          </Route>
          <Route exact path="/tweet/:tweetId">
            <TweetDetails></TweetDetails>
          </Route>
          <Route exact path="/profile/:id">
            <Profile />
          </Route>
        </Switch>
      </Wrapper>
    </Router>
  );
};

export default App;

const Wrapper = styled.div`
  display: flex;
`;
