# @react-lit/menu-button

An accessible dropdown menu for the common dropdown menu button design pattern.

## Installation

```bash
$ npm i @react-lit/menu-button
# or
$ yarn add @react-lit/menu-button
```

## Example

```js
import * as React from 'react';
import {
  Menu,
  MenuList,
  MenuButton,
  MenuItem,
  MenuLink,
} from "@react-lit/menu-button";

function Example() {
  return (
    <Menu>
      <MenuButton>
        Actions <span aria-hidden>▾</span>
      </MenuButton>
      <MenuList>
        <MenuItem onSelect={() => console.log("Download")}>Download</MenuItem>
        <MenuItem onSelect={() => console.log("Copy")}>Create a Copy</MenuItem>
        <MenuLink as="a" href="https://github.com/joelvoss/react-lit-menu-button">
          Go to website
        </MenuLink>
      </MenuList>
    </Menu>
  );
}
```

## Development

(1) Install dependencies

```bash
$ npm i
# or
$ yarn
```

(2) Run initial validation

```bash
$ ./Taskfile.sh validate
```

(3) Run tests in watch-mode to validate functionality.

```bash
$ ./Taskfile test -w
```

---

_This project was set up by @jvdx/core_
