import { Button } from '@repo/shared-ui/components/ui/button';

import viteLogo from '/vite.svg';

import reactLogo from './assets/react.svg';
import ProductsApiTest from './components/ProductsApiTest';

function App() {
  return (
    <>
      <div className="flex gap-4 p-4">
        <a href="https://vite.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <hr />
      <div className="p-4">
        <p></p>
        <p>Vite + React + Shared Ui + Tailwindcss 4</p>
        <Button>Shared Ui Button</Button>
      </div>
      <hr />
      <div className="p-4">
        <p>Sample Api call with custom API instance</p>
        <ProductsApiTest />
      </div>
    </>
  );
}

export default App;
