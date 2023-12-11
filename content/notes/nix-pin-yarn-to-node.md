---
title: "Nix: pin yarn version to nodejs version"
tags:
  - nix
  - nodejs
  - yarn
---
When you use `yarn` inside of a nix-shell, you need to pin it to the associated `nodejs` version you're planning on using, otherwise it uses the default of the nix pkgs. 

[Here's](https://discourse.nixos.org/t/nix-shell-how-to-run-corepack-enable-to-install-modern-yarn/18791/6) an article that I used to find a good example of it.

my `shell.nix` for using `nodejs-16_x` ended up being:

```nix
{ pkgs ? import <nixpkgs> {} }:
with pkgs;

let
  nodejs = pkgs.nodejs-16_x;
  yarn = pkgs.yarn.override { inherit nodejs; };

in pkgs.mkShell {
  buildInputs = [
    nodejs
    yarn
  ];

  # for specifying which version to use if need be
  shellHook = ''
    yarn set version 3.x
  '';
}
```
