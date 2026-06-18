Labelled text field with error + hint; the workhorse input for the booking and contact forms.

```jsx
<TextInput label="Client name" placeholder="Jane Doe" required />
<TextInput label="Email" type="email" error={touched.email && errors.email} />
<TextInput label="Notes" multiline rows={3} hint="Optional" />
```

- **error** (string) turns the border red and prints the message; **hint** shows when there's no error.
- **multiline** renders a textarea; supports all native input/textarea props (`type`, `value`, `onChange`…).
