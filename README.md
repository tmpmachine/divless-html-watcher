# divless-html-watcher

## Installing Locally

package.json
```
{
  "scripts": {
    "watch": "divless watch"
  },
  "dependencies": {
    "divless-html-watcher": "path/to/divless-html-watcher"
  }
}
```

Run `npm install`, then run `npm run watch` in your project root.

## Usage Example
1. Create **.divless** folder anywhere in your project directory.
2. Create **index.html** inside the **.divless** folder.
3. Type in `[btn 'This is a button']`, then save.
4. If the watcher is running, a copy of **index.html** file should be created outside the .divless folder with the converted format.

Try other [Divless HTML format](https://github.com/tmpmachine/divless-html).

Don't ignore **.divless** folder as this is a one way converter.