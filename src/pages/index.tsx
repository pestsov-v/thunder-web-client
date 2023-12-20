import { UseView } from '@Vendor';

export default function Home() {
  return (
    <div>
      <UseView domain={'SysUsers'} view={'dataset'} />
      <UseView domain={'SysUsers'} view={'profile'} />
    </div>
  );
}
