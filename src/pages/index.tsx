import dynamic from 'next/dynamic';

export default function Home(props: any) {
  const Router = dynamic(() => import('./test.component'), {
    ssr: false,
    loading: () => <div>Loading...</div>,
  });

  return (
    <div>
      <Router />
    </div>
  );
}
