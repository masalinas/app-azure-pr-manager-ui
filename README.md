# description
Azure Pool Request Manager UI

# generate backend angular services
openapi-generator-cli generate -i swagger.json -g typescript-angular --skip-validate-spec

when define query params in strongloop and generate we must disable the validation spec to generate the sources!

# debug app
npm run start

# build app
npm run build

# build app for production
npm run build -- --prod
