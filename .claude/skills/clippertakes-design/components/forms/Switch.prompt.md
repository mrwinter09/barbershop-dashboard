Boolean toggle with an inline label; controlled via `checked` / `onChange`.

```jsx
<Switch
  label="Existing client from the list?"
  checked={useExisting}
  onChange={(e) => setUseExisting(e.currentTarget.checked)}
/>
```

- Track turns blue (`--brand-primary`) when on. Supports `disabled`.
