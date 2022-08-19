# Install Docker on Amazon Linux 2
sudo yum update -y
sudo yum -y install docker
sudo service docker start
sudo usermod -a -G docker ec2-user 
sudo chmod 666 /var/run/docker.sock
docker version

# Compose
sudo curl -L "https://github.com/docker/compose/releases/download/v2.9.0/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose
sudo chmod +x /usr/local/bin/docker-compose
docker-compose --version

# Create dlib Image
docker build -t mydlib .

# Orchestrate App
docker-compose up
