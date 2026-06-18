The standard surface container — bordered, lightly elevated, rounded; wraps dashboard panels and marketing tiles.

```jsx
<Card>
  <h4>Select a client</h4>
  <p>All barbershop clients loaded from the directory.</p>
</Card>

<Card shadow="md" padding="lg" hoverable>…</Card>
<Card withBorder={false} shadow="none" padding="none">…</Card>
```

- **withBorder** (default true), **shadow** `none|sm|md`, **padding** `none|sm|md|lg`, **hoverable** lifts on hover.
