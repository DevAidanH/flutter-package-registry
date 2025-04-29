fetch('package_urls.json')
  .then(response => {
    if (!response.ok) throw new Error('Network response was not ok');
    return response.json();
  })
  .then(data => {
    const list = document.getElementById('package-list');
    for (const [name, url] of Object.entries(data)) {
      const item = document.createElement('li');
      const link = document.createElement('a');
      link.href = url;
      link.textContent = name;
      link.target = "_blank";
      item.appendChild(link);
      list.appendChild(item);
    }
  })
  .catch(error => console.error('Error loading JSON:', error));