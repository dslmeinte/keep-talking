# Keep Talking

This repository contains some "computerized help" for the _"Keep Talking and Nobody Explodes"_ VR-game.
Some people might consider this cheating ;)

Right now, this help consists of an incomplete set of CLI-programs, running under Node.js.
These programs are minimal in the sense that they work on a per-module basis, and they provide no error recovery.
I.e., if you make a mistake using the program for a particular module, then the program will not alert to your mistake (e.g., a wrong input, even an irrelevant, extra character), and will also not record a *strike*.


## Future work

So far, only 4 of all 14 module types (of which 3 are needy) have been done.
Not all modules are really suited for computerized help (m.n., Keypads, Venting Gas, Capacitor Discharge), in the sense that even with help you need a bit of skill and memorisation.
Programs for the remaining module types will be added in a quasi-random order, probably driven by how much business logic there is to evaluate and take off of your hands while playing, or even more probably by how often I encounter certain modules when playing.


### Even further away

At some point, I might turn these CLI-programs into an app (with an "intuitive" UI of sorts - whatever that may mean).
Currently, I can't be bothered about that, though: it's mostly "just work" and has little to do with coding up the "business logic" of the bomb defusal.
Most modules don't require a UI, anyway - with the potential exception of Keypads.


## Installation

Execute the following steps:

1. Install [Node.js](https://nodejs.org/).
2. (optional) Install [yarn](https://yarnpkg.com/) - as a replacement to NPM which comes pre-installed with Node.js
3. Run `npm install` and `npm run build` on the commandline.
	Alternatively, with yarn: `yarn` and `yarn run build`.


## Usage

In any terminal, execute `node dist/<M>` with `M` is one of the following:

* `button`: "On the Subject of The Button" (p. 6)
* `memory`: "On the Subject of Memory" (p. 11)
* `passwords`: "On the Subject of Passwords" (p. 16)
* `simple-wires`: "On the Subject of Wires" (p. 5)

The titles and page numbers refer to the [Bomb Defusal Manual, version 1](http://www.bombmanual.com/).

The program will ask questions which you can re-pose to your defuser.
You have to follow the (implied) protocol in order for the program to work.
As said before: there's no input validation (and re-do), no error recovery, etc.

