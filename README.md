# chrome-extension-seed
A project template for chrome extension development with all necessary scripts to build in dev and prod mode.

How to use?

- Download this project. 
- Update package.json and
- manifest.json with your respective project details.
- For development build: 

    `npm run build.dev`

    It will build and post files to `dist/dev`. Then point your chrome extension to this path.

- For continuous development and build, use:

    `npm run watch.build.dev`

    It watches for any file change while you develop and automatically post build files to `dist/dev`



- For production build use:

    `npm run build.prod`

    It will minify your JS and CSS, then post to `dist/prod` folder



- Before uploading to Chrome Extension Developer dashboard use:

    `npm run build.zip`

    It will:
    - clean your dist
    - build in prod mode
    - zip whatever there in prod folder
    - at location dist/dist.zip


- cleaning...

    `npm run clean`

    is to clean your dist folder.

ADDING DEPENDENCIES
-------------------
To build, gulp reads manifest.json file to know all JS, CSS and other files required to build this project. But some files are not mentioned in manifest.json file though they are required. For example `popup.js` file. It is simply referred from `popup.html` file and no where mentioned in `manifest.json` file. Also there can be some images referred by popup.html file.

To include such DEPENDENCIES in the build:
- go to gulpfile.js
- find variable `otherDependencies`
- its an array of strings
- add the location of your dependency file relatively

