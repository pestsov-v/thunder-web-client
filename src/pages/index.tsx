import { GetView } from '@Vendor';
import { GetServerSideProps } from 'next';
import { MainLayout } from '@Schema/sys-admin/layouts/MainLayout';

export default function Home() {
  return (
    <div>
      <MainLayout />
      <GetView domain={'SysUsers'} view={'dataset'} />
      <GetView domain={'SysUsers'} view={'profile'} />
      <GetView domain={'SysUsers'} view={'add-user'} />
    </div>
  );
}

export const getServerSideProps: GetServerSideProps = async () => {
  return {
    props: {},
  };
};
