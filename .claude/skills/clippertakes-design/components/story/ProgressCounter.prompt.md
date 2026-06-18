ProgressCounter is the "23 / 50 Stories Collected" hero signal — a living archive with a finish line. Make it unmissable; it's what a funder reads first.

```jsx
<ProgressCounter count={23} total={50} size="lg" />
<ProgressCounter count={23} total={50} size="md" label="Voices recorded" />
<ProgressCounter count={23} total={50} onDark />  {/* over a petrol panel */}
```

- **size**: `lg` (hero) · `md` (top of the Stories Board).
- `onDark` swaps the fill to Rotterdam yellow for petrol / photo backgrounds.
- The bar fill animates on mount; `count` should come from the live story data.
