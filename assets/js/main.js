
let title = document.getElementById("title");
let price = document.getElementById("price");
let texas = document.getElementById("texas");
let ads = document.getElementById("ads");
let discount = document.getElementById("discount");
let total = document.getElementById("total");
let count = document.getElementById("count");
let category = document.getElementById("category");
let submit = document.getElementById("submit");
let tbody = document.getElementById("tbody");
let btnDeleteAll = document.getElementById("deleteAll");
let warn = document.getElementById("warn");

let mood = "create";
let tmp;

// ========== Get Total Function ==========
function getTotal() {
  if (price.value !== "") {
    let result = (+price.value + +texas.value + +ads.value) - +discount.value ;
    total.innerHTML = result;
    total.style.backgroundColor = "#040";

  } else {
    total.innerHTML = "";
    total.style.backgroundColor = "#a00d02";
  }
}
// ========== Create Product ==========

let productData ;
if (localStorage.product !== null) {
  productData = JSON.parse( localStorage.product )
} else {
  productData = [];
}

submit.onclick = function () {
  warn.innerHTML = "";
    let newData = {
      title: title.value,
      price: price.value,
      texas: texas.value,
      ads: ads.value,
      discount: discount.value,
      total: total.innerHTML,
      count: count.value,
      category: category.value,
    }

    if (title.value !== "" 
    && price.value !== "" 
    && texas.value !== "" 
    && ads.value !== "" 
    && discount.value !== "" 
    && newData.count < 100 
    && category.value !== "") {
        if (mood === "create") {
              if (newData.count > 1) {
              for (let i = 0; i < newData.count; i++) {
                // Save Data in Array
                productData.push(newData)
              }
            } else {
              productData.push(newData)
            }
        } else {
            productData[tmp] = newData;
            mood = "create";
            submit.innerHTML = "Create";
            count.style.display = "block";
        }

        // Clear Data Inputs Function
        clearData()
    } else {
      warn.innerHTML = "Please Fill All Data"
      warn.style.cssText = "color: red; text-align: center; padding: 10px 0; font-size: 23px"
    }
    
    
    // Save Data in Local storage
    localStorage.setItem("product", JSON.stringify(productData))
    console.log(productData);

  
  // Show Data
    showData()
}

// ========== Clear Data Inputs Function  ==========
function clearData () {
  title.value = "";
  price.value = "";
  texas.value = "";
  ads.value = "";
  discount.value = "";
  total.innerHTML = "";
  count.value = "";
  category.value = "";
}

// ========== Read or Show Data  ==========
function showData() {
  getTotal();
  let table = "";
  for (let i = 0; i < productData.length; i++) {
    table += `
      <tr>
        <td> ${i+1} </td>
          <td> ${productData[i].title} </td>
          <td> ${productData[i].price} </td>
          <td> ${productData[i].texas} </td>
          <td> ${productData[i].ads} </td>
          <td> ${productData[i].discount} </td>
          <td> ${productData[i].total} </td>
          <td> ${productData[i].category} </td>
          <td> <button onclick="updateData(${i})" id="update">Update</button> </td>
        <td> <button id="delete" onclick="deleteProduct(${i})">Delete</button> </td>
      </tr>
    `
  }

  tbody.innerHTML = table;

  if (productData.length > 0) {
    btnDeleteAll.innerHTML = ` <button onclick="deleteAllProducts()">Delete All (${productData.length}) </button> `
  } else {
    btnDeleteAll.innerHTML = "";
  }
}
showData()

// ========== Delete Product Data ==========
function deleteProduct(index) {
  productData.splice(index, 1)
  localStorage.product = JSON.stringify(productData)
  showData()
}
// ==== Delete All Products Data ====
function deleteAllProducts () {
  localStorage.clear();
  productData.splice(0)
  showData()
}

// ========== Update Product Data ==========

function updateData (index) {
  title.value = productData[index].title;
  price.value = productData[index].price;
  texas.value = productData[index].texas;
  ads.value = productData[index].ads;
  discount.value = productData[index].discount;
  getTotal()
  count.style.display = "none";
  category.value = productData[index].category;
  submit.innerHTML = "Update"
  mood = "update";
  tmp = index;

  scroll({
    top: 0,
    behavior: "smooth",
  });
  title.focus();
}

// ========== Search Product Data ==========

let search = document.getElementById("search");
let searchMood = "title";

function getSearchMood(id) {
  if (id === "searchTitle") {
    searchMood = "title";
    search.placeholder = "Search By Title";
  } else {
    searchMood = "category";
    search.placeholder = "Search By Category";
  }
  search.focus();
  search.value = "";
  showData()
}

function searchData(value) {
  let table = "";

  if (searchMood === "title") {
    for (let i = 0; i < productData.length; i++) {
      if (productData[i].title.includes(value)) {
        table += `
        <tr>
          <td> ${i} </td>
            <td> ${productData[i].title} </td>
            <td> ${productData[i].price} </td>
            <td> ${productData[i].texas} </td>
            <td> ${productData[i].ads} </td>
            <td> ${productData[i].discount} </td>
            <td> ${productData[i].total} </td>
            <td> ${productData[i].category} </td>
            <td> <button onclick="updateData(${i})" id="update">Update</button> </td>
          <td> <button id="delete" onclick="deleteProduct(${i})">Delete</button> </td>
        </tr>
      `
      }
    }
  } else {
    for (let i = 0; i < productData.length; i++) {
      if (productData[i].category.includes(value)) {
        table += `
        <tr>
          <td> ${i} </td>
            <td> ${productData[i].title} </td>
            <td> ${productData[i].price} </td>
            <td> ${productData[i].texas} </td>
            <td> ${productData[i].ads} </td>
            <td> ${productData[i].discount} </td>
            <td> ${productData[i].total} </td>
            <td> ${productData[i].category} </td>
            <td> <button onclick="updateData(${i})" id="update">Update</button> </td>
          <td> <button id="delete" onclick="deleteProduct(${i})">Delete</button> </td>
        </tr>
      `
      }
    }
  }
  tbody.innerHTML = table;
}

