import { UseView } from '@Vendor';
import { GetServerSideProps } from 'next';

export default function Home() {
  return (
    <div>
      <UseView domain={'SysUsers'} view={'dataset'} />
      <UseView domain={'SysUsers'} view={'profile'} />
    </div>
  );
}

export const getServerSideProps: GetServerSideProps = async () => {
  return {
    props: {},
  };
};
