# Flutterby

Not fit for use. Please don't use this code if you need it to work.

## Why Bother?

There are many deploy tools, but they never cover the edge cases I need well.

Using functional programming and tests, we can REMOVE bugs.
If it deploys, it is less susceptible to bugs.

Rebasing causes issues and it shouldn't.

## How to use

There are two ways: configuration and code configuration.

### Code Configuration

### Configuration

Users can use any config file accepted from `comsiconfig`, with additions including the following:

- `flutterby.ts`
- `flutterby.config.ts`
- `config.flutterby` property in `package.json`

## Todo

read config, read history from git, github and npm. These can be abstracted out later
sync versions
do as much update validation as possible

name,
codecs, api

goal:

- [ ] launch via action
- [ ] check most recent
  - [ ] latest tag in git
  - [ ] packagejson.version in project
  - [ ] latest tag in github releases
  - [ ] latest tag in npm registry
