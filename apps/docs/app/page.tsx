import { Button } from '@repo/shared-ui/components/ui/button';
import { TurborepoLogo } from '@repo/shared-ui/turborepo-logo';
import UserApiTest from 'components/UserApiTest';

export default function Page() {
  return (
    <>
      <div className="p-4">
        <TurborepoLogo />
      </div>
      <hr />
      <div className="p-4">
        <p>Next js + React-query + Shared Ui + Tailwindcss 4</p>
        <Button>Shared Ui Button</Button>
      </div>
      <hr />
      <div className="p-4">
        <p>Sample Api call with React Query</p>
        <UserApiTest />
      </div>
    </>
  );
}
