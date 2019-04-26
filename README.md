# setting up
#### clone
`git clone https://github.com/thuannh1027/react-redux-boilerplate.git <project-name>`
#### install packages
`npm install`

# development env
  `npm run dev`
# prod env
  `npm run build`
  deploy to IIS using iis-node https://github.com/tjanczuk/iisnode
# prod env wth Docker
  `docker build -t react-redux-boilerplate-docker .`
  `docker run -p 8000:80 react-redux-boilerplate-docker`
  `docker images` see all image list
