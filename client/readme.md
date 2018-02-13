# General Information

This is private npm package designed to be the front end project base which can be used to reduce time required to start working on specific project features, because we'll have all commonly used code saved in this package.


Package may contain more than one javascript application and each application has its **root (entry)** file which is used by webpack to create single file **bundle** of es5 javascript which is compatible with any modern browser. Of course there are some differences in API implementations between browsers, therefore we are using **polyfills** which are javascript modules which check browser API on application start and add required functionality for tested API if that API is not implemented in the browser.
Webpack can form bundle file as a chain of entry files. We are using this to add polyfills to bundle, because without this feature each entry file of application needs to contain polyfills imports which enable polyfills functionality.


# Package structure:

  1. entries - entry files for client applications:

      1. dev - development entries which developers can use to separate their working environments which is quite useful for making the experiments or working on application modules which developers can import directly to entry files. Developers allowed to create entries for them with following naming convention. ```<developer>-<(optional)application>-<(optional)feature>.jsx```. Ex. **neketek-landing** or **neketek-landing-login**.

      2. prod - production entries which are used to build minified bundles. One entry per application.

  2. src - CSS and JS source files.
  3. webpack - webpack configuration.
  4. package.json - npm package description file. It contains all list of the package dependencies and scripts aliases.

## How to use

  1. Create your dev entry. Ex. ```client/entries/dev/neketek.jsx```.
  2. Then enable hot reloading using ```client/entries/dev/neketek.jsx``` as example.
  3. In **package.json** create npm script to build from previously created entry. Script has next signature ```"dev-<developer>-<application>-<(optional)feature>":"webpack-dev-server --env.entry <application_name> --env.path <path_to_dev_entry>"```. Ex. ```"dev-neketek-app":"webpack-dev-server --env.entry app --env.path neketek.jsx"```.    
  4. Run script via ```npm run <script-name>```. Ex. ```npm run dev-neketek-app```.
  5. Create separate terminal and go to ```**project**/server``` then run ```python3 server.py```.
  6. Now you can open access your build from a browser on URL which server defines. Standard index URL list:

      1. ```--env.entry app``` - ```http:\\localhost:8080\app```
      2. ```--env.entry landing``` - ```http:\\localhost:8080```

  7. Congratulations! Now you can write javascript and scss with hot reloading.  
