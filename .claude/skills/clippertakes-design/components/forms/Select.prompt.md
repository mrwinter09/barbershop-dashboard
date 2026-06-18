Labelled dropdown matching the field system — service, barber, client, and status pickers.

```jsx
<Select
  label="Service"
  placeholder="Pick a service"
  value={service}
  onChange={(e) => setService(e.target.value)}
  data={[
    { value: "fade_beard_trim", label: "Fade + Beard trim" },
    { value: "cut_style", label: "Cut & Style" },
  ]}
/>

<Select size="sm" value={status} data={statusOptions} />
```

- **data** accepts `{value,label}[]` or `string[]`; **size** `sm` is used for inline table controls; **error** turns it red.
