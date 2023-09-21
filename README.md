# MWW Front End

MWW Front End


# To login to docker
docker login

# For listing docker images
docker images

# To compose and build docker image
docker-compose up -d --build

# To tag an existing docker image
docker tag <docker-image>:<tag> <remote repo>

# To push docker image to remote repo
docker push <remote repo>

# To run docker remote docker image
docker run -p <target-port>:<expose-port> <remote repo>
