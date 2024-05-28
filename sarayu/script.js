document.addEventListener("DOMContentLoaded", function () {
  const loginForm = document.getElementById("login-form");
  const propertyForm = document.getElementById("property-form");
  const applyFilterBtn = document.getElementById("apply-filter");
  const propertyList = document.getElementById("property-list");
  const propertyListBuyer = document.getElementById("property-list-buyer");

  let properties = [];

  loginForm.addEventListener("submit", function (e) {
    e.preventDefault();
    document.getElementById("login").style.display = "none";
    document.getElementById("seller-dashboard").style.display = "block";
    document.getElementById("buyer-dashboard").style.display = "block";
  });

  propertyForm.addEventListener("submit", function (e) {
    e.preventDefault();
    const property = {
      place: document.getElementById("place").value,
      area: document.getElementById("area").value,
      bedrooms: document.getElementById("bedrooms").value,
      bathrooms: document.getElementById("bathrooms").value,
      nearby: document.getElementById("nearby").value,
    };
    properties.push(property);
    displayProperties(properties);
    propertyForm.reset();
  });

  applyFilterBtn.addEventListener("click", function () {
    const filterPlace = document
      .getElementById("filter-place")
      .value.toLowerCase();
    const filterBedrooms = document.getElementById("filter-bedrooms").value;
    const filteredProperties = properties.filter((property) => {
      return (
        (filterPlace
          ? property.place.toLowerCase().includes(filterPlace)
          : true) &&
        (filterBedrooms ? property.bedrooms == filterBedrooms : true)
      );
    });
    displayProperties(filteredProperties, "buyer");
  });

  function displayProperties(properties, mode = "seller") {
    const list = mode === "seller" ? propertyList : propertyListBuyer;
    list.innerHTML = "";
    properties.forEach((property, index) => {
      const li = document.createElement("li");
      li.innerHTML = `
                <strong>Place:</strong> ${property.place} <br>
                <strong>Area:</strong> ${property.area} <br>
                <strong>Bedrooms:</strong> ${property.bedrooms} <br>
                <strong>Bathrooms:</strong> ${property.bathrooms} <br>
                <strong>Nearby:</strong> ${property.nearby} <br>
                ${
                  mode === "seller"
                    ? `
                <button onclick="editProperty(${index})">Edit</button>
                <button onclick="deleteProperty(${index})">Delete</button>`
                    : `
                <button onclick="showSellerDetails()">I'm Interested</button>`
                }
            `;
      list.appendChild(li);
    });
  }

  window.editProperty = function (index) {
    const property = properties[index];
    document.getElementById("place").value = property.place;
    document.getElementById("area").value = property.area;
    document.getElementById("bedrooms").value = property.bedrooms;
    document.getElementById("bathrooms").value = property.bathrooms;
    document.getElementById("nearby").value = property.nearby;
    properties.splice(index, 1);
  };

  window.deleteProperty = function (index) {
    properties.splice(index, 1);
    displayProperties(properties);
  };

  window.showSellerDetails = function () {
    alert("Seller details will be shown here.");
  };
});
