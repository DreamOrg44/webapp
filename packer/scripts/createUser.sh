#!/bin/bash

# Define user and group names
USERNAME="csye6225"
GROUPNAME="csye6225"

# Check if the group already exists
if ! getent group "$GROUPNAME" > /dev/null 2>&1; then
    # Create the group
    sudo groupadd "$GROUPNAME"
fi

# Check if the user already exists
if ! id "$USERNAME" > /dev/null 2>&1; then
    # Create the user
    sudo useradd -m -g "$GROUPNAME" -s /usr/sbin/nologin "$USERNAME"
    echo "User '$USERNAME' created successfully."
else
    echo "User '$USERNAME' already exists."
fi

