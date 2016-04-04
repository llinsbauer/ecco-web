
# ECCO WEB INTERFACE

Static single page web interface for ECCO that relies on the ECCO REST API.


Uses:
* Bootstrap (which requires jQuery)
* Angular 2
* D3.js


Steps for deploying the web interface onto a web server:
* Set `<base href="/">` in `index.html` to where the web interface will be deployed (relative to the domain).
* Set `LocationStrategy` in `ts/main.ts` to either HTML5 History API (Default) or Hashbang (in case the server does not support the former).
* Compile the project: `npm run tsc`
* Upload `css`, `js`, `tsbuild`, `index.html` to web server.


