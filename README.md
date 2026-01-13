# flipdots

## How to install

```bash
npm install flipdots

yarn add flipdots

pnpm add flipdots

bun add flipdots
```

## Usage

1. Usage with Text

```ts
import { FlipDotGrid } from "flipdots";

const Page = () => {
  const textToRender = "Hello";
  return (
    <FlipDotGrid
      text={textToRender}
      size={10}
      gap={2}
      padding={{ left: 2, bottom: 2, right: 2, top: 2 }}
    />
  );
};
```

2. Usage with Matrix

```ts
import { useEffect, useState } from "react";
import { FlipDotGrid, FONT_5x7, TextRenderer } from "flipdots";

const Clock = () => {
  const [timeMatrix, setMatrix] = useState<number[][]>([]);
  const renderer = new TextRenderer({ font: FONT_5x7, letterSpacing: 1 });

  useEffect(() => {
    const updateClock = () => {
      const now = new Date();
      const timeString = now
        .toLocaleTimeString("en-GB", { hour12: false })
        .slice(0, 5);

      const finalMatrix = renderer.render(timeString);
      setMatrix(finalMatrix);
    };

    updateClock();
    const interval = setInterval(updateClock, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <FlipDotGrid
      matrix={timeMatrix}
      padding={{ top: 1, right: 2, bottom: 1, left: 2 }}
      size={10}
      gap={2}
      activeColor='#ffffff'
      inactiveColor='#222222'
    />
  );
};
```

3. Fancy clock example

```ts
import { useEffect, useState } from "react";
import { FlipDotGrid, TextRenderer, FONT_5x7 } from "flipdots";

const Clock = () => {
  const [hourMatrix, setHourMatrix] = useState<number[][]>([]);
  const [minuteMatrix, setMinuteMatrix] = useState<number[][]>([]);
  const renderer = new TextRenderer({ font: FONT_5x7, letterSpacing: 1 });

  useEffect(() => {
    const updateClock = () => {
      const now = new Date();
      const timeString = now
        .toLocaleTimeString("en-GB", { hour12: false })
        .slice(0, 5);

      const hoursMatrix = renderer.render(timeString.split(":")[0]);
      const minutesMatrix = renderer.render(timeString.split(":")[1]);
      setHourMatrix(hoursMatrix);
      setMinuteMatrix(minutesMatrix);
    };

    updateClock();
    const interval = setInterval(updateClock, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className='flex flex-col'>
      <FlipDotGrid
        matrix={hourMatrix}
        padding={{ top: 1, right: 2, bottom: 1, left: 2 }}
        size={3}
        gap={1}
        secondIndicator
        activeColor='#ffffff'
        inactiveColor='#222222'
      />
      <FlipDotGrid
        matrix={minuteMatrix}
        padding={{ top: 1, right: 2, bottom: 1, left: 2 }}
        size={3}
        gap={1}
        activeColor='#222222'
        inactiveColor='#ffffff'
      />
    </div>
  );
};
```
