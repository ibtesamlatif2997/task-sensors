FROM python:3.8.10

# Set environment variables
ENV PYTHONUNBUFFERED 1

RUN apt-get update \
    && apt-get upgrade -y \
    && apt-get install -y --no-install-recommends curl git build-essential \
    && apt-get autoremove -y

# Set work directory.
RUN mkdir /code
WORKDIR /code

# Copy project code.
COPY . /code/

# Install dependencies.
RUN pip install --no-cache-dir -r requirements.txt

EXPOSE 8081
