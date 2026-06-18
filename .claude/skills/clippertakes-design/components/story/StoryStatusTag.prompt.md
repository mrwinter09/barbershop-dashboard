StoryStatusTag shows a story's lifecycle state — the cultural replacement for booking statuses.

```jsx
<StoryStatusTag status="upcoming" />   {/* "In the chair soon" */}
<StoryStatusTag status="published" />  {/* "Story published" */}
<StoryStatusTag status="withdrawn" />  {/* "Withdrawn" */}
<StoryStatusTag status="upcoming" label="Recording in March" />
```

- **status**: `upcoming` (clay) · `published` (moss) · `withdrawn` (muted).
- Never use "scheduled / completed / no-show" — a story is not a booking.
