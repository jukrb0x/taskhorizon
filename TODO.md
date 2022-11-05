# TODO

## Thoughts

- data types: event, todo. they are linked with unique id (specify which data type and user).
  - make interfaces for them (data structure)
  - todo is simple, just a few words
  - event is big, with a lot of fields
- drag and drop, how to do it `next-ver`
    - **important** feature to implement
    - a custom event card is needed

## UI

- [x] `MVP` Basic Tasking App with Zustand and Storage
- [x] `MVP` Basic Scheduling App, CalendarView (react-big-calendar)
- [x] reverse engineering studies on amie.so calendar
- [ ] `DnD` Calendar drag and drop
- [ ] Calendar event card (creating and editing)
- [ ] `DnD` Drag and Drop for Tasking App
- [ ] `Styling` Calendar Custom Styling
- [ ] `next-ver`self-maintained calendar component (this could be hard but worth it)
  > Engineering is creating that wasn't there before 

## Data Structure

- [x] store base state management (zustand)
- [ ] storage management: local storage, indexedDB, etc.
  - still searching a better way to persist data
- [ ] data type should be handled when get items from localStorage

## Framework

- [ ] `next-ver` Backend Data Sync... 
  - how to fetch data in a gentle way
- [ ] `what-if` migrate to Next.js Framework, could takes sometime
  - react is simple, but should I use a backend framework? 
  - if switch to Next.js, everything will be different, no more need of Vite