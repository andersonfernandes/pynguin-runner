# This Dockerfile was created using pynguin's Dockerfile as reference https://github.com/se2p/pynguin/blob/0.34.0/docker/Dockerfile

FROM python:3.10.13-slim-bullseye

ENV PYNGUIN_VERSION "0.34.0"
ENV PYNGUIN_DANGER_AWARE true
ENV PYTHONDONTWRITEBYTECODE 1
ENV PYTHONUNBUFFERED 1
ENV PYTHONHASHSEED 0

RUN apt-get update && \
  apt-get -y install git && \
  rm -rf /var/lib/apt/lists/*

WORKDIR /pynguin

COPY ./pynguin-docker.sh .

RUN pip install --upgrade pip
RUN pip install pynguin==${PYNGUIN_VERSION} \
  typing-extensions==4.8.0 \
  mypy==1.6.0

ENTRYPOINT ["./pynguin-docker.sh"]
CMD []