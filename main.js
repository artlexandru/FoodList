// Food Form //

class Food {
    constructor(foodname, origin, price) {
      this.foodname = foodname;
      this.origin = origin;
      this.price = price;
    }
  }
  

  class UI {
    static displayFood() {
      const foods = Store.getFoods();
  
      foods.forEach((food) => UI.addFoodToList(food));
    }
  
    static addFoodToList(food) {
      const list = document.querySelector('#food-list');
  
      const row = document.createElement('tr');
  
      row.innerHTML = `
        <td>${food.foodname}</td>
        <td>${food.origin}</td>
        <td>${food.price}</td>
        <td><a href="#" class="btn btn-danger btn-sm delete">X</a></td>
      `;
  
      list.appendChild(row);
    }
  
    static deleteFood(el) {
      if(el.classList.contains('delete')) {
        el.parentElement.parentElement.remove();
      }
    }
  
    static showAlert(message, className) {
      const div = document.createElement('div');
      div.className = `alert alert-${className}`;
      div.appendChild(document.createTextNode(message));
      const container = document.querySelector('.container');
      const form = document.querySelector('#food-form');
      container.insertBefore(div, form);
  

      setTimeout(() => document.querySelector('.alert').remove(), 2000);
    }
  
    static clearFields() {
      document.querySelector('#foodname').value = '';
      document.querySelector('#origin').value = '';
      document.querySelector('#price').value = '';
    }
  }
  

  class Store {
    static getFoods() {
      let foods;
      if(localStorage.getItem('foods') === null) {
        foods = [];
      } else {
        foods = JSON.parse(localStorage.getItem('foods'));
      }
  
      return foods;
    }
  
    static addFood(food) {
      const foods = Store.getFoods();
      foods.push(food);
      localStorage.setItem('foods', JSON.stringify(foods));
    }
  
    static removeFood(price) {
      const foods = Store.getFoods();
  
      foods.forEach((food, index) => {
        if(food.price === price) {
          foods.splice(index, 1);
        }
      });
  
      localStorage.setItem('foods', JSON.stringify(foods));
    }
  }
  

  document.addEventListener('DOMContentLoaded', UI.displayFoods);
  

  document.querySelector('#food-form').addEventListener('submit', (e) => {

    e.preventDefault();
  

    const foodname = document.querySelector('#foodname').value;
    const origin = document.querySelector('#origin').value;
    const price = document.querySelector('#price').value;
  

    if(foodname === '' || origin === '' || price === '') {
      UI.showAlert('Please fill in all fields', 'danger');
    } else {

      const food = new Food(foodname, origin, price);
  

      UI.addFoodToList(food);
  

      Store.addFood(food);
  

      UI.showAlert('Food Added', 'success');
  

      UI.clearFields();
    }
  });
  

  document.querySelector('#food-list').addEventListener('click', (e) => {

    UI.deleteFood(e.target);
  

    Store.removeFood(e.target.parentElement.previousElementSibling.textContent);
  

    UI.showAlert('Food Removed', 'success');
  });


  //Basket Dragg and Drop//

  function onDragStart(event) {
    event.dataTransfer.setData('text/plain', event.target.id);
  }

  function onDragOver(event) {
    event.preventDefault();
  }

  function onDrop(event) {
    const id = event.dataTransfer.getData('text');

    const draggableElement = document.getElementById(id);
    const dropzone = event.target;
    dropzone.appendChild(draggableElement);

    event.dataTransfer.clearData();
  }