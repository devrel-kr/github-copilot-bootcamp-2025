sudo apt-get update && \
    sudo apt upgrade -y && \
    sudo apt-get install -y dos2unix libsecret-1-0 xdg-utils && \
    sudo apt clean -y && \
    sudo rm -rf /var/lib/apt/lists/*

echo Configure git
git config --global pull.rebase false
git config --global core.autocrlf input

echo Update .NET workloads
sudo dotnet workload update --from-previous-sdk

echo Install .NET dev certs
sudo dotnet dev-certs https --trust

echo Install Aspire 9 templates
sudo dotnet new install Aspire.ProjectTemplates

echo Install Azure Bicep CLI
sudo az bicep install

echo Done!
