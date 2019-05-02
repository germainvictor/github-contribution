# GitHub contributors

This project fetches some basic details from a GitHub repository as well as its contributors, and sort them by their contribution score.

This score is calculated according to the different contributions made by the user (pull request, commit, issues, changed files, ...).

Each property has a coefficient that allows to establish a score.

## Getting started

```sh
git clone https://github.com/germainvictor/github-contribution.git
cd github-contribution
yarn
```

Run `github-contribution --help` to check everything is working fine.

#### Use the project

Here are the different options:
`--owner` : Name of the repository owner
`--name` : Project name
`--top-contributors-limit` : Return the top X users

#### Example

```sh
github-contributors --owner axios --name axios --top-contributors-limit 3
```

## Technical choices

I use the [GitHub V4 API](https://developer.github.com/v4/) which use graph QL. This allows me to have only the data that interests me and to reduce the weight of the requests as much as possible.

I chose [apollo-boost](https://github.com/apollographql/apollo-client/tree/master/packages/apollo-boost) because it's easy to set up and I don't need to have a complex configuration for this project.

A linter is set up for a better readability of the code. I have chosen to use [ESlint](https://eslint.org/) with the airbnb rules, one of the most common code convention.

## Improvement

- Add unit tests to ensure that the functions are working properly.
- Currently, `users` variable is mutated for sake of simplicity. It would add more code, but it would be cleaner not to mutate it.
- Better decompose the code to have better access to the property.
- Better error handling (no repo, wrong access rights,…).
- In the context of a project, the configuration should not be versioned.

## Scaling

- Set up a cache system to reduce the number of requests.
- Try to do more queries in parallel.
