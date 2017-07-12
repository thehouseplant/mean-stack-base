# MEAN Stack Base v2.0

## Environment Setup

```shell
npm install -g typescript@2.2.2 gulp-cli @angular/cli
```

## Running the Application

```shell
mkdir -p ./build/server/resources
mkdir -p ./build/client
cd server
npm install
tsc
cp ./package.json ../build/server/
cp ./resources/* ../build/server/resources/
cd ..
cd client
npm install
ng build --base-href /
cd ..
cd build
cd server
npm install
node app.js
```

Then just navigate to `localhost:3000` in your browser of choice

## Troubleshooting

If you get `../lib/completion` error, you must uninstall and reinstall gulp in the root of the application:

```shell
npm uninstall gulp --save
npm install gulp --sav
```