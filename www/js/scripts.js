fetch('../../data/drinks.json')
    .then(response => response.json())
    .then(drinks => {
        const classic_drinks = drinks.filter(drink => drink.season === "classic");
        const summer_drinks = drinks.filter(drink => drink.season === "summer");
        const winter_drinks = drinks.filter(drink => drink.season === "winter");
        const tiki_drinks = drinks.filter(drink => drink.season === "tiki");

        const drink_list = document.getElementById('drink_list');
        const seasonal_drink_list = document.getElementById('seasonal_drink_list');

        //classics, always on the menu
        classic_drinks.forEach( (drink, i) => {
            const drinkElement = document.createElement('div');
            drinkElement.innerHTML = `
                <h4><a href="#" data-toggle="modal" data-target="#exampleModal" data-id="${drink.id}">${drink.name}</a></h4>
                <p class="mb-0">${drink.ingredients}</p>
                <p class="my-0 glass">${drink.glass}</p>
                <br>
            `;
            drink_list.appendChild(drinkElement);
        });

        const seasonal_title = document.getElementById('seasonal_title');
        const current_month = new Date().getMonth();
        let seasonal_drinks;

        if (current_month >= 2 && current_month <= 8) { // March (2) to September (8)
            seasonal_drinks = summer_drinks;
            seasonal_title.textContent = "Summer";
        } else { // October to February
            seasonal_drinks = winter_drinks;
            seasonal_title.textContent = "Winter";
        }

        seasonal_drinks.forEach( (drink, i) => {
            const drinkElement = document.createElement('div');
            drinkElement.innerHTML = `
                <h4><a href="#" data-toggle="modal" data-target="#exampleModal" data-id="${drink.id}">${drink.name}</a></h4>
                <p class="mb-0">${drink.ingredients}</p>
                <p class="my-0 glass">${drink.glass}</p>
                <br>
            `;
            seasonal_drink_list.appendChild(drinkElement);
        });

        const modal = new bootstrap.Modal(document.getElementById('exampleModal'));
        document.querySelectorAll('a[data-bs-toggle="modal"]').forEach(button => {
            button.addEventListener('click', function (event) {
                const drinkId = event.currentTarget.getAttribute('data-id');
                const drink = drinks.find(d => d.id === drinkId);
                const modalTitle = document.querySelector('#exampleModal .modal-title');
                const modalBody = document.querySelector('#exampleModal .modal-body');
                modalTitle.textContent = drink.name;
                modalBody.innerHTML = drink.description;
                modal.show();
            });
        });
    });