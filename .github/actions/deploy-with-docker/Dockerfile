FROM python:3

# Set environment variables
ARG GOOGLE_KEY

COPY requirements.txt /requirements.txt

RUN pip install -r requirements.txt

COPY deployment.py /deployment.py

# Write the key to a file
RUN echo -n "${GOOGLE_KEY}" > /key.json

CMD ["python", "/deployment.py"]