import React, { useState, useEffect } from "react";
import { Switch, useLocation } from "react-router-dom";
import { useTransition, animated } from "react-spring";

import Route from "./Route";

import SignIn from "./../pages/SignIn";
import SignUp from "./../pages/SignUp";
import Dashboard from "./../pages/Dashboard";

const Routes: React.FC = () => {
  const [orientation, setOrientation] = useState("");
  const location = useLocation();

  useEffect(() => {
    location.pathname === "/" ? setOrientation("50%") : setOrientation("-50%");
  }, [location.pathname, orientation]);

  const transitions = useTransition(location, (location) => location.pathname, {
    from: { opacity: 0, transform: "translate3d(50%,0,0)" },
    enter: { opacity: 1, transform: "translate3d(0%,0,0)" },
    leave: { opacity: 0, transform: `translate3d(${orientation},0,0)` },
  });

  return (
    <Switch>
      {transitions.map(({ item, props, key }) => {
        return (
          <Switch location={item} key={item.pathname}>
            <>
              <animated.div key={key} style={props}>
                <Route path="/" exact component={SignIn} />
                <Route path="/signup" component={SignUp} />
              </animated.div>
              <Route path="/dashboard" component={Dashboard} isPrivate />
            </>
          </Switch>
        );
      })}
    </Switch>
  );
};

export default Routes;
