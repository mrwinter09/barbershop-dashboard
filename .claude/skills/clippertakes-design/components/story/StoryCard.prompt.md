StoryCard is the centerpiece unit of the Stories Board — a numbered portrait that makes the 50-story archive feel alive and growing.

```jsx
<StoryCard
  number={7}
  total={50}
  name="Fatima El Amrani"
  role="Community organizer"
  neighborhood="Afrikaanderwijk"
  image="/assets/img/interior-1.jpg"
  teaser="“The market taught me the whole city in one street.”"
  href="/stories/7"
  statusTag={<StoryStatusTag status="published" />}
/>

<StoryCard number={24} name="—" role="Maker" neighborhood="Noord" status="upcoming"
  statusTag={<StoryStatusTag status="upcoming" />} />
```

- The **"Story 07 / 50"** stamp is the core mechanic — always pass `number` and `total`.
- `status="upcoming"` greys the portrait; pair with `<StoryStatusTag status="upcoming" />`.
- `teaser` is the participant's answer, set in italic serif — keep it to one line.
- Renders as a link by default (`as="a"`, pass `href`). Grid it at ~300–360px wide.
