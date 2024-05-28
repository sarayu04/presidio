document.addEventListener("DOMContentLoaded", () => {
  const loginForm = document.getElementById("login-form");
  const propertyForm = document.getElementById("property-form");
  const postedProperties = document.getElementById("property-list");
  const availableProperties = document.getElementById("available-properties");
  const filterButton = document.getElementById("apply-filters");

  let users = [];
  let properties = [];

  loginForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const user = {
      firstName: document.getElementById("firstName").value,
      lastName: document.getElementById("lastName").value,
      email: document.getElementById("email").value,
      phone: document.getElementById("phone").value,
    };
    users.push(user);
    alert("User registered successfully!");
    document.getElementById("login-section").style.display = "none";
    document.getElementById("seller-section").style.display = "block";
    document.getElementById("buyer-section").style.display = "block";
  });

  propertyForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const property = {
      place: document.getElementById("place").value,
      area: document.getElementById("area").value,
      bedrooms: document.getElementById("bedrooms").value,
      bathrooms: document.getElementById("bathrooms").value,
      nearby: document.getElementById("nearby").value,
    };
    properties.push(property);
    displayProperties();
  });

  filterButton.addEventListener("click", () => {
    const filterPlace = document
      .getElementById("filter-place")
      .value.toLowerCase();
    const filteredProperties = properties.filter((property) =>
      property.place.toLowerCase().includes(filterPlace)
    );
    displayProperties(filteredProperties);
  });

  function displayProperties(filteredProperties = properties) {
    postedProperties.innerHTML = "";
    availableProperties.innerHTML = "";

    filteredProperties.forEach((property, index) => {
      const propertyItem = document.createElement("li");
      propertyItem.innerHTML = `
                <strong>Place:</strong> ${property.place}<br>
                <strong>Area:</strong> ${property.area} sq ft<br>
                <strong>Bedrooms:</strong> ${property.bedrooms}<br>
                <strong>Bathrooms:</strong> ${property.bathrooms}<br>
                <strong>Nearby:</strong> ${property.nearby}<br>
                <button onclick="showSellerDetails(${index})">I'm Interested</button>
            `;
      availableProperties.appendChild(propertyItem);

      const postedPropertyItem = propertyItem.cloneNode(true);
      postedPropertyItem.innerHTML += `
                <button onclick="editProperty(${index})">Edit</button>
                <button onclick="deleteProperty(${index})">Delete</button>
            `;
      postedProperties.appendChild(postedPropertyItem);
    });
  }

  window.showSellerDetails = (index) => {
    const property = properties[index];
    alert(
      `Seller Details:\nPlace: ${property.place}\nArea: ${property.area}\nBedrooms: ${property.bedrooms}\nBathrooms: ${property.bathrooms}\nNearby: ${property.nearby}`
    );
  };

  window.editProperty = (index) => {
    const property = properties[index];
    document.getElementById("place").value = property.place;
    document.getElementById("area").value = property.area;
    document.getElementById("bedrooms").value = property.bedrooms;
    document.getElementById("bathrooms").value = property.bathrooms;
    document.getElementById("nearby").value = property.nearby;
    properties.splice(index, 1);
    displayProperties();
  };

  window.deleteProperty = (index) => {
    properties.splice(index, 1);
    displayProperties();
  };
});
