import { IBlockswebComponent } from "@blocksweb/core";
import Head from "next/head";
import { useEffect, useState } from "react";

const TestComponent: IBlockswebComponent = (props: any) => {
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

  traits: [],
};

export default TestComponent;
