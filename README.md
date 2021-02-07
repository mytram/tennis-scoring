# Tennis scoring

The code is written in typescript. I chose to create a react app for
the tooling. There is no UI to the app.

The best place to start is to run the tests.

## Approach

The basic approach is a functional programming without immutability,
in that the models are manipulated directly.

The programmes consists of

* Data models. These are basic data building blocks. Their logic
  should be kept minimal and confined to convenient utility functions.

* Logic services. These are functions that carry out business logic on
  data models. Logic services may have a functional interface or an OO
  interface.

* Entities. Entities are a higher level abstraction that maintains
  some states and needs multiple data models and logic services.

## High-level description

When A `Match` entity is created, it creates a single `MatchSet` and
maps the two players to an internal concept, `GameSide`, called
`First` or `Second`. When a point is won, the `Match` entity calls the
`recordMatchSetPoint` service with the `matchSet` and the `wonBy` game
side to record the point.

The `recordMatchSetPoint` service will in turn call either
`recordRegularGamePoint` or `recordTieBreakPoint` to record the point
based on the current game being a regular game or tiebreak,
respectively.

## Run tests

In the project directory, first you run `yarn install` and you can run:

### `yarn test`

This will also generate a test coverage report under `coverage`.
