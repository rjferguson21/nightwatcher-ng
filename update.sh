docker build -t rjferguson21/nightwatcher-ng .
docker push rjferguson21/nightwatcher-ng
kubectl scale --replicas=0 deployment/webapp
kubectl scale --replicas=1 deployment/webapp