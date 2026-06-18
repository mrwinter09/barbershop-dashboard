ReflectionForm is the deliberately small composer that lets a visitor add their own response to a story — the "barbershop conversation" online.

```jsx
<ReflectionForm
  onSubmit={({ name, text }) => addReflection(storyId, { name, text })}
/>
```

- Just a name and one short text field — no rating, no rich text, by design.
- Built on TextInput + Button; clears itself after submit.
- Place it directly beneath the list of `<ReflectionItem>`s on the story page.
