# vue-recoil-cli
Vue Recoil CLI is the Standard Tooling for [Vue-Recoil](https://www.npmjs.com/package/vue-recoil) Development.

## Start.

``` shell
npm install -g vue-recoil-cli
```

## Enjoy Development.

### Create your project.

``` shell
recoil init my-project
```

## More creator.

### Create a atom's file of recoil by CLI.

``` shell
recoil create atom.js HelloWord
```

`atom.js`

``` js
import { atom } from "vue-recoil"

export const atomState = atom({
  key: "myAtomKey",
  default: "HelloWord",
});
```

## TypeScript support.

``` shell
recoil create atom.ts HelloWord
```

So, `atom.ts` with the awesome contents:

``` ts
import { atom } from "vue-recoil"

export const atomState = atom<RootObject>({
  key: "myAtomKey",
  default: "HelloWord",
})

export type RootObject = string
```