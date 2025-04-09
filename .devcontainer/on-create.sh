sudo apt-get update && \
    sudo apt upgrade -y && \
    sudo apt-get install -y dos2unix libsecret-1-0 xdg-utils && \
    sudo apt clean -y && \
    sudo rm -rf /var/lib/apt/lists/*

echo Configure git
git config --global pull.rebase false
git config --global core.autocrlf input

echo Update .NET workloads
dotnet workload update --from-previous-sdk

echo Install .NET dev certs
dotnet dev-certs https --trust

echo Install Aspire 9 templates
dotnet new install Aspire.ProjectTemplates

echo Install Azure Bicep CLI
az bicep install

echo Install Spring Boot CLI
wget -P ~/ https://repo.maven.apache.org/maven2/org/springframework/boot/spring-boot-cli/3.4.4/spring-boot-cli-3.4.4-bin.zip
unzip -o ~/spring-boot-cli-3.4.4-bin.zip -d ~/.spring
mkdir -p ~/.spring/current
cp -r ~/.spring/spring-3.4.4/* ~/.spring/current/

echo 'export PATH="$PATH:$HOME/.spring/current/bin"' >> ~/.bashrc
# source ~/.bashrc

echo Done!
