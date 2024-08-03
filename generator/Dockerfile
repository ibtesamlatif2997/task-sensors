FROM python:3.8.10

# Set environment variables
ENV PYTHONUNBUFFERED 1

# Set work directory.
RUN mkdir /code
WORKDIR /code

# Copy project code.
COPY . /code/

# Install dependencies.
RUN pip install --no-cache-dir -r requirements.txt