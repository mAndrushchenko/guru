// @ts-ignore
import React from "react";

type GreetingProps = {
  name: string;
};

const Greeting = ({ name }: GreetingProps) => {
  return <div>Hello, {name}!</div>;
};

const withTimestamp = <P extends object>(Component: React.ComponentType<P>): React.Component<P> => {
  return (props: P) => (
    <div>
      <Component {...props} />
      <div>{new Date().toLocaleTimeString()}</div>
    </div>
  );
};

const withStyles = <P extends object>(Component: React.ComponentType<P>): React.Component<P> => {
  return (props: P) => (
    <div style={{ color: 'blue', fontWeight: 'bold' }}>
      <Component {...props} />
    </div>
  );
};

const EnhancedGreeting = withStyles(withTimestamp(Greeting));

const App: React.Component = () => {
  return (
    <div>
      <EnhancedGreeting name="John" />
    </div>
  );
};
