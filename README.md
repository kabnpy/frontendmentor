# frontend mentor portfolio

a repository frontend Mentor projects

## quick Start

```bash
# install dependencies
pnpm install

# start a project
pnpm dev:[project-name]

# build all projects
pnpm build
```

## structure

```
projects/       # all projects here
packages/       # shared code
```

## adding projects

1. create project in `projects/[name]`
2. add `dev:[name]` script to root `package.json`
3. configure build to output to `../../dist/[name]`

