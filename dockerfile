FROM python:3.9-slim-buster
WORKDIR / /home/indrajeet/Desktop/Hackathon/Farmloan Sqaure/Ai camera/model
COPY requrirements.txt .
RUN pip install --no-cache-dir -r requirements.txt
COPY . .
CMD ["python","./index.py"]

