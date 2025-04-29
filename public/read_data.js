fetch("package_urls.json")
  .then(response => {
    if (!response.ok) throw new Error("Network response was not ok");
    return response.json();
  })
  .then(data => {
    const list = document.getElementById("package-list");
    data.forEach(pkg => {
      //Div
      const packageDiv = document.createElement("div");
      packageDiv.classList.add("package-item");

      //Package name
      const nameElement = document.createElement("h3");
      nameElement.textContent = pkg.name;
      packageDiv.appendChild(nameElement);

      //Issues count
      const issuesText = pkg.issues !== null ? `${pkg.issues} open issues` : "No GitHub Repo";
      const issuesElement = document.createElement("p");
      issuesElement.textContent = issuesText;
      packageDiv.appendChild(issuesElement);

      //Link
      const linkElement = document.createElement("a");
      linkElement.href = pkg.url;
      linkElement.textContent = "Go to Package Page";
      linkElement.target = "_blank";
      packageDiv.appendChild(linkElement);

      list.appendChild(packageDiv);
    });
  })
  .catch(error => console.error("Error loading JSON:", error));
