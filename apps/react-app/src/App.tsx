import { Button } from '@repo/shared-ui/components/ui/button';
import { Card } from '@repo/shared-ui/components/ui/card';

import viteLogo from '/vite.svg';

import reactLogo from './assets/react.svg';
import ProductsApiTest from './components/ProductsApiTest';

const Child = () => <p className="bg-red-500">title card</p>;

function App() {
  return (
    <div className="flex flex-col gap-2 p-4">
      <div className="flex gap-4 p-4">
        <a href="https://vite.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
        <p className="text-2xl font-bold">react app </p>
        <p>Vite + React + Shared Ui + Tailwindcss 4 + internal theme + shared packages</p>
      </div>
      <hr />
      <p className="bg-primary">this style from docs theme</p>
      <hr />
      <Card title={'title card'} children={<Child />} />
      <p>this Button from shared-ui (shadcn) but style form internal theme</p>
      <Button className="w-32">Shared Ui Button</Button>
      <hr />
      <p className="bg-secondary text-white">
        Sample Api call with custom API instance from api-config
      </p>
      <ProductsApiTest />
    </div>
  );
}

export default App;
