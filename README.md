This project is a complete DevOps implementation that I built while learning and practicing real-world DevOps concepts.  
The goal was not just to “run an app”, but to understand how applications are deployed, monitored, automated, and secured in real environments.

This repository contains everything needed to deploy the application from scratch.


## What this project does

- Runs a frontend and backend using Docker
- Uses NGINX as a reverse proxy
- Automates deployment using GitHub Actions
- Adds monitoring using Prometheus and Grafana
- Adds centralized logging using Loki
- Provisions infrastructure using Terraform
- Automates server setup using Ansible
- Applies basic production-level hardening



## Architecture
User
|
v
NGINX (port 80)
|
├── Frontend (React)
└── Backend (Spring Boot)
|
├── Prometheus (metrics)
├── Grafana (dashboards)
└── Loki (logs)



Everything runs inside Docker containers on an AWS EC2 instance.

---

## Tech Stack Used

- AWS EC2
- Docker & Docker Compose
- NGINX
- GitHub Actions (CI/CD)
- Prometheus
- Grafana
- Loki & Promtail
- Terraform
- Ansible

---

## Key Things I Learned from This Project

- How CI/CD pipelines actually deploy code to a server
- How Docker services communicate using internal networks
- Why reverse proxies are important
- How monitoring works using metrics and dashboards
- How logs can be centralized and queried
- Why Infrastructure as Code is important
- How configuration management avoids manual server setup
- How to keep secrets out of GitHub repositories

---

## How the App is Deployed

1. EC2 is created using Terraform  
2. Server is configured using Ansible (Docker, Compose, app setup)  
3. Application runs using Docker Compose  
4. GitHub Actions deploys updates automatically on push  
5. Monitoring and logs are available through Grafana  

---

## Running the Project

On the server:

```bash
docker compose up -d


