import { GetView } from '@Vendor';
import { GetServerSideProps } from 'next';

export default function Home() {
  return (
    <div>
      <GetView domain={'SysUsers'} view={'dataset'} />
      <GetView domain={'SysUsers'} view={'profile'} />
    </div>
  );
}

export const getServerSideProps: GetServerSideProps = async () => {
  return {
    props: {},
  };
};
