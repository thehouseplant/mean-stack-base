rm -rf ./build/
mkdir -p ./build/server/aws
mkdir -p ./build/server/resources
mkdir -p ./build/client
cd server
rm -rf node_modules
npm install -g typescript@2.1.6 gulp-cli @angular/cli
npm install
tsc
cp ./package.json ../build/server/
cp ./resources/* ../build/server/resources/
cp ./processes.json ../build/server/
cp ./appspec.yml ../build/
cp -R ./aws/* ../build/server/aws/
rm -rf node_modules
cd ..
cd client
npm install
ng build --base-href /
