# SmartHut - frontend
SA4 Project - Sphinx Team

## Using our premade Docker image
A public Docker image is available on the Docker repository under `steeven9/sa4-sphinx-frontend`.

To use it, first pull the image with\
`docker pull steeven9/sa4-sphinx-frontend`

then run it with\
`docker run -p 3000:80 steeven9/sa4-sphinx-frontend`

## Building the project
If you want to build the frontend from scratch, compile it first with\
`yarn install`

then build the static website\
`yarn build`

and finally put everything in a Docker container\
`docker build ./ -t steeven9/sa4-sphinx-frontend:latest`

that you can run with\
`docker run -p 3000:80 steeven9/sa4-sphinx-frontend`