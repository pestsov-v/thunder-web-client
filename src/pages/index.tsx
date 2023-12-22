import { GetView } from '@Vendor';
import { MainLayout } from '@Schema/sys-admin/layouts/MainLayout';
import type { GetServerSideProps } from 'next';

export default function Home() {
  return (
    <div>
      <MainLayout>
        <div>
          <GetView domain={'SysUsers'} view={'dataset'} />
          <GetView domain={'SysUsers'} view={'profile'} />
          <GetView domain={'SysUsers'} view={'add-user'} />
        </div>
      </MainLayout>
    </div>
  );
}

export const getServerSideProps: GetServerSideProps = async () => {
  return {
    props: {},
  };
};
