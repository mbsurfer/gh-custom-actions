FROM python:3

# Set environment variables
ARG GOOGLE_KEY

COPY requirements.txt /requirements.txt

RUN pip install -r requirements.txt

COPY deployment.py /deployment.py

# Decode the key and write it to a file
RUN echo "${GOOGLE_KEY}" | base64 --decode > /key.json

CMD ["python", "/deployment.py"]