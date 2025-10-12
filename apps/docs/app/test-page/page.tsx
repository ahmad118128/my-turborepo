'use client';

import { Button } from '../../../../packages/shared-ui/dist/button';

export default function TestPage() {
  return (
    <div className="h-screen w-screen">
      <h1 data-testid="title">Hello E2E Test</h1>
      <Button
        onClick={() => {
          alert('Button clicked!');
        }}
        data-testid="click-button"
      >
        Click Me
      </Button>
    </div>
  );
}
