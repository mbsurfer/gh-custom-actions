FROM python:3

# Set environment variables
ENV GOOGLE_APPLICATION_CREDENTIALS=/tmp/key.json
ARG GOOGLE_KEY

# Write the key to a file
RUN echo "${GOOGLE_KEY}" > /tmp/key.json

# Set the working directory in the container to /app
WORKDIR /app

# Copy requirements.txt and install the dependencies
COPY requirements.txt ./
RUN pip install --no-cache-dir -r requirements.txt

COPY . .

CMD ["python", "/deployment.py"]