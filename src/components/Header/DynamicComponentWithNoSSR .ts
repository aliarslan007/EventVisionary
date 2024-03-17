import dynamic from 'next/dynamic';

const DynamicComponentWithNoSSR = dynamic(() => import("./Header"), {
  ssr: false
});