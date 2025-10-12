import { Button } from '@repo/shared-ui/components/ui/button';
import { Card } from '@repo/shared-ui/components/ui/card';
import { TurborepoLogo } from '@repo/shared-ui/turborepo-logo';
import UserApiTest from 'components/UserApiTest';

const Child = () => <p className="bg-red-500">title card</p>;

export default function Page() {
  return (
    <div className="flex flex-col gap-2 p-4">
      <TurborepoLogo />
      <p className="text-2xl font-bold">apps docs </p>
      <p>Next js + React-query + Shared Ui + Tailwindcss 4 + internal theme + shared packages </p>
      <hr />
      <p className="bg-primary">this style from docs theme</p>

      <hr />
      <Card title="cart" children={<Child />} />

      <Button variant="outline" className="w-32">
        Shared Ui Button
      </Button>
      <hr />
      <p className="bg-secondary text-white">Sample Api call with React Query</p>
      <UserApiTest />
    </div>
  );
}
