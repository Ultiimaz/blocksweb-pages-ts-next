import Head from "next/head";
import { useEffect, useState } from "react";

const TestComponent = (props: any) => {
  const [counter, setCounter] = useState<number>(0);
  useEffect(() => {
    const interval = setInterval(() => {
      setCounter((prev) => prev + 1);
    }, 1000);
    return () => clearInterval(interval);
  }, []);
  return (
    <div data-gjs-highlightable="true">
      <Head>
        <title>This is dynamic</title>
      </Head>
      counter {counter}
    </div>
  );
};

TestComponent.data = {
  displayName: "TestComponent",
  traits: [
    {
      name: "title",
      type: "button",
      text: "Click me",
    },
  ],
};

export default TestComponent;
