# Getting started

## Description

This repository is a solution to interview test.

## Installation

To install this project on your local machine 

1. Git Clone

Clone the url of the Git Repo

```shell

git clone <url>

```

2. Install 

To install the project dependencies

```shell
npm install my-project

cd my-project

```

3. Start

To start the project run

```shell

npm start

```

## Problem

```git shell

The authenticity of host 'github.com (140.82.121.4)' can't be established.
ED25519 key fingerprint is SHA256:+DiY3wvvV6TuJJhbpZisF/zLDA0zPMSvHdkr4UvCOqU.
This key is not known by any other names
Are you sure you want to continue connecting (yes/no/[fingerprint])? Host key verification failed.
fatal: Could not read from remote repository.

Please make sure you have the correct access rights
and the repository exists.

```

## solution

I solved my problem by running

```git 
ssh-keyscan github.com >> ~/.ssh/known_hosts
```
in command prompt. This command will add authenticity to your known_hosts.


## Tech Stack

![Node.js](https://img.shields.io/badge/Node.js-34562l?style=for-the-badge&logo=Node.js&logoColor=white)

## Glitch Deploy

[<img src="https://cdn.gomix.com/2bdfb3f8-05ef-4035-a06e-2043962a3a13%2Fremix-button.svg" width="163px" />](https://glitch.com/edit/#!/import/github/masterifeanyi/interview-ecommerce-backend)
