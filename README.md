# SmartHut - frontend
SA4 Project - Sphinx Team

This is our smart home appilcation, built with React.

## Using our premade Docker image
A public Docker image is available on the Docker repository under `steeven9/sa4-sphinx-frontend`.

To use it, first pull the image with\
`docker pull steeven9/sa4-sphinx-frontend`

then run it with\
`docker run -it -p 3000:80 steeven9/sa4-sphinx-frontend`

**Note**: the frontend port can be changed when running the Docker container, via the `-p` parameter.

## Building the project
If you want to build the frontend from scratch, install the dependencies first with\
`yarn install`

then build the static website\
`yarn build`

and finally put everything in a Docker container\
`docker build ./ -t sa4-sphinx-frontend:latest`

that you can run with\
`docker run -it -p 3000:80 sa4-sphinx-frontend`

**Note**: the frontend port can be changed when running the Docker container, via the `-p` parameter.
