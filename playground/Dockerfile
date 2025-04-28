FROM ubuntu:22.04

# Install OpenSSH and sudo
RUN apt-get update && \
    apt-get install -y openssh-server sudo && \
    mkdir /var/run/sshd

# Create user
RUN useradd -m vpsuser && echo "vpsuser ALL=(ALL) NOPASSWD:ALL" >> /etc/sudoers

# Setup SSH authorized keys
COPY authorized_keys /home/vpsuser/.ssh/authorized_keys
RUN chmod 600 /home/vpsuser/.ssh/authorized_keys && \
    chown -R vpsuser:vpsuser /home/vpsuser/.ssh && \
    chmod 700 /home/vpsuser/.ssh

# Configure SSH to disable password authentication
RUN sed -i 's/#PasswordAuthentication yes/PasswordAuthentication no/' /etc/ssh/sshd_config && \
    sed -i 's/PasswordAuthentication yes/PasswordAuthentication no/' /etc/ssh/sshd_config && \
    sed -i 's/PasswordAuthentication no/PasswordAuthentication no/' /etc/ssh/sshd_config

# Expose SSH
EXPOSE 22

# Start SSH
CMD ["/usr/sbin/sshd", "-D"]
