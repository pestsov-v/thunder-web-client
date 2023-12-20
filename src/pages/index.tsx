import dynamic from 'next/dynamic';

export default function Home(props: any) {
  const Router = dynamic(() => import('./test.component'), {
    ssr: false,
  });

  return (
    <div>
      <Router />
    </div>
  );
}
