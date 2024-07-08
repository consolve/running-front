import { CSSTransition, TransitionGroup } from 'react-transition-group';
import "../style/transitionStyle.css"

const animationRoute = [
  "/competition/detail/",
  "/shoes/detail/",
  "/crew/detail/",
  "/runnertalk/detail/",
]

const RouteTransition = ({ location, children }) => {
    const pathname = location.pathname;

    const isRoute = animationRoute.some((route) => pathname.startsWith(route));

    return (
      <TransitionGroup className={"transition-group"}>
        <CSSTransition
          key={isRoute ? pathname : null}
          timeout={100}
          classNames="page"
        >
          <div>{children}</div>
        </CSSTransition>
      </TransitionGroup>
    );
  };
  
  export default RouteTransition;