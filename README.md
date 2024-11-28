# MongoDB Replica Set with Docker Compose

This project sets up a MongoDB replica set using Docker Compose. The configuration defines a replica set consisting of three MongoDB instances running in containers, along with an initialization service to configure the replica set. The setup ensures high availability, fault tolerance, and data replication for your MongoDB database.



## Prerequisites

Before running this setup, make sure you have the following installed:

- **Docker** (version 19.03 or later)
- **Docker Compose** (version 1.27 or later)



## Project Structure

The project consists of the following services:

1. **mongo1** - Primary node of the replica set.
2. **mongo2** - Secondary node of the replica set.
3. **mongo3** - Secondary node of the replica set.
4. **mongo-init** - Initialization service that configures the replica set.



### Data Directories

- `./data/mongo1`, `./data/mongo2`, and `./data/mongo3` - Persistent storage directories for MongoDB data. These will be used to store MongoDB data files, ensuring that data persists across container restarts.



## Services Breakdown

mongo1 (Primary): This service sets up the primary MongoDB instance. It listens on port 27018 (mapped to the container's internal port 27017) and is part of the mongoCluster network. It uses persistent storage in ./data/mongo1 for data.
mongo2 (Secondary): This service sets up the second MongoDB instance, which is a secondary node in the replica set. It listens on port 27019 and stores data in ./data/mongo2.
mongo3 (Secondary): This service sets up another secondary MongoDB node, which also listens on port 27020 and stores data in ./data/mongo3.
mongo-init: This service runs a script to initialize the MongoDB replica set. After a 10-second delay (to allow other services to start), it connects to mongo1 and runs the rs.initiate() command to configure the replica set with mongo1, mongo2, and mongo3 as members.



## Networks
mongoCluster: A custom bridge network that allows the MongoDB services to communicate with each other.



## Usage
#Clone the repository:
git clone https://github.com/GokuWinning/MongoDB-Docker/
cd MongoDB-Docker


#Start the services: 
Run the following command to start the MongoDB containers:
docker-compose up -d
This will pull the necessary MongoDB images, create the containers, and set up the replica set.


#Check the status of the replica set: 
After the containers are up and running, you can check the status of the MongoDB replica set by connecting to the primary MongoDB instance (mongo1) using mongosh:
	docker exec -it mongo1 mongosh --port 27017

Once inside the mongosh shell, you can run the following command to check the replica set status:
	rs.status()


#Shut down the services: 
To stop the services and remove the containers, run:
	docker-compose down
	


## Connecting to MongoDB Compass
To connect to primary node of replica set, use the following connection string:
mongodb://localhost:27018/?directConnection=true

To connect to secondary nodes of replica set, use the following connection strings:
mongodb://localhost:27019/?directConnection=true
mongodb://localhost:27020/?directConnection=true



## Notes
Persistence: MongoDB data is persisted across restarts in the ./data/mongo1, ./data/mongo2, and ./data/mongo3 directories.

Replica Set Initialization: The mongo-init service ensures that the replica set is initiated when the containers are first started. This service is run only once and is removed after execution.

Ports: The MongoDB instances expose the following ports on the host machine:
mongo1: 27018
mongo2: 27019
mongo3: 27020

Troubleshooting:
Replica Set Initialization Issues: If you encounter issues with replica set initialization, check the logs of the mongo-init container:
	docker logs mongo-init

Logs: You can view logs of any MongoDB container by running:
	docker logs <container_name>
	
	
	
## License
This project is licensed under the MIT License - see the LICENSE file for details.







