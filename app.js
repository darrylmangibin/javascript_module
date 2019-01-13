// Storage controller

//Item Controller
const ItemCtrl = (function(){
	const Item = function(id, name, calories) {
		this.id = id;
		this.name = name;
		this.calories = calories;
	}

	const data = {
		items: [
			{id: 0, name: 'Steak Dinner', calories: 1200},
			{id: 1, name: 'Cookie', calories: 400},
			{id: 2, name: 'Eggs', calories: 300}
		],
		currentItem: null,
		totalCalories: 0
	}

	return {
		logData: function() {
			return data
		},
		getItems: function() {
			return data.items
		},
		addItem: function(name, calories) {
			let ID;
			if(data.items.length > 0) {
				ID = data.items[data.items.length - 1].id + 1;
			} else {
				ID = 0;
			}
			calories = parseInt(calories);

			newItem = new Item(ID, name, calories);
			
			data.items.push(newItem);
			return newItem;
		}
	}

})();

// UI controller
const UICtrl = (function(){
	const UISelectors = {
		itemList: '#item-list',
		addBtn: '.add-btn',
		itemNameInput: '#item-name',
		itemCaloriesInput: '#item-calories'
	}

	return {
		populateItemList: function(items) {
			let html = '';
			items.forEach(function(item) {
				html += ` <li class="collection-item" id="item-${item.id}">
        					<strong>${item.name}: </strong> <em>${item.calories} Calories</em>
        					<a href="#" class="secondary-content">
          						<i class="edit-item fa fa-pencil"></i>
        					</a>
      					</li>`
			});
			document.querySelector(UISelectors.itemList).innerHTML = html
		},
		getSelectors: function() {
			return UISelectors;
		},
		getItemInput: function() {
			return {
				name: document.querySelector(UISelectors.itemNameInput).value,
				calories:document.querySelector(UISelectors.itemCaloriesInput).value
			}
		},
		addListItem: function(item) {
			const li = document.createElement('li');
			li.className = 'collection-item';
			li.id = `item-${item.id}`;
			li.innerHTML = `<strong>${item.name}: </strong> <em>${item.calories} Calories</em>
        					<a href="#" class="secondary-content">
          						<i class="edit-item fa fa-pencil"></i>
        					</a>`;
        	document.querySelector(UISelectors.itemList).insertAdjacentElement('beforeend', li);
		}
	}

})();

// App controller
const App = (function(ItemCtrl, UICtrl){
	const loadEventListeners = function() {
		const UISelectors = UICtrl.getSelectors();

		document.querySelector(UISelectors.addBtn).addEventListener('click', itemAddSubmit)
	}

	const itemAddSubmit = function(e) {
		e.preventDefault();

		const input = UICtrl.getItemInput();
		if(input.name !== '' && input.calories !== '') {
			const newItem = ItemCtrl.addItem(input.name, input.calories)

			UICtrl.addListItem(newItem)
		}
	}

	return {
		init: function() {
			const items = ItemCtrl.getItems();

			UICtrl.populateItemList(items);

			loadEventListeners()
		}
	}

})(ItemCtrl, UICtrl);

App.init()