NeighborhoodTag is a Rotterdam neighborhood chip for grouping and filtering the Stories Board.

```jsx
<NeighborhoodTag name="All of Rotterdam" count={23} active />
<NeighborhoodTag name="Afrikaanderwijk" count={5} onClick={filterBy} />
<NeighborhoodTag name="Delfshaven" count={3} />
```

- `active` is the selected filter (petrol fill, yellow marker).
- `count` is shown small and mono; omit it for a plain tag.
- Renders as a `button` by default — good for filter rows.
