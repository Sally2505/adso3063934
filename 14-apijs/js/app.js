// all views(main)
const views = document.querySelectorAll("main");

// currentView
if (localStorage.getItem("currentView") != null) {
    showView();
} else {
    localStorage.setItem("currentView", 0);
    showView();
}

// buttons & anchors
const btnLogout = document.querySelector(".btnLogout");
const btnAdd = document.querySelector(".btnAdd");
const btnBack = document.querySelectorAll(".btnBack");
const btnShow = document.querySelectorAll(".btnShow");
const btnEdit = document.querySelectorAll(".btnEdit");
const btnCancel = document.querySelectorAll(".btnCancel");
const petList = document.querySelector("#petList");
const addPetForm = document.querySelector('#add form');
const mainShow = document.getElementById("show");
const mainEdit = document.getElementById("edit");
const editForm = mainEdit.querySelector("form");


// loginform(POST)
const loginForm = document.querySelector("#loginForm");
loginForm.addEventListener("submit", async function (e) {
    e.preventDefault();
    try {
        const email = document.getElementById("email").value;
        const password = document.getElementById("password").value;
        const response = await fetch("http://127.0.0.1:8000/api/auth/login", {
            method: "POST",
            headers: {
                "Content-type": "application/json",
                Accept: "application/json",
            },
            body: JSON.stringify({
                email: email,
                password: password,
            }),
        });

        const data = await response.json();
        if (response.ok) {
            Swal.fire({
                title: "Success!",
                text: data.message,
                icon: "success",
                showConfirmButton: false,
                timer: 1500,
            });
            currentView = 1;
            showView();
            localStorage.setItem("authToken", data.token);
            localStorage.setItem("currentView", 1);
            showView();
        } else {
            Swal.fire({
                title: "Error",
                text: data.message,
                icon: "error",
            });
        }
    } catch (error) {
        console.error(error.message);
    }
});

// Llamada a la función para obtener las mascotas al cargar la vista de lista
async function getPets() {
    try {
        const token = localStorage.getItem("authToken");

        const response = await fetch("http://127.0.0.1:8000/api/pets/list", {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
        });

        const data = await response.json();
        console.log(data);

        if (response.ok) {
            renderPets(data.pets);
        } else {
            console.log(data.message);
        }
    } catch (error) {
        console.log(error);
    }
}

// Función para renderizar la lista de mascotas en el DOM
function renderPets(pets) {
    petList.innerHTML = ""; // limpia antes de pintar

    pets.forEach((pet) => {
        let imageSrc = pet.image ? `imgs/${pet.image}` : "imgs/no-image.png";
        petList.innerHTML += `
                <div class="row">
                    <img src="${imageSrc}" alt="pet" />
                    <div class="data">
                        <h3>${pet.name}</h3>
                        <h4>${pet.kind}</h4>
                    </div>
                    <nav class="actions">
                        <a href="javascript:;" class="btnShow" data-id="${pet.id}"></a>
                        <a href="javascript:;" class="btnEdit" data-id="${pet.id}"></a>
                        <a href="javascript:;" class="btnDelete" data-id="${pet.id}"></a>
                    </nav>
                </div>
            `;
    });
}

// Delegación de eventos para los botones de acción
petList.addEventListener("click", function (e) {
    if (e.target.classList.contains("btnShow")) {
        const id = e.target.getAttribute("data-id");
        showPet(id);
    }
    if (e.target.classList.contains("btnEdit")) {
        const id = e.target.getAttribute("data-id");
        editPet(id);
    }
    if (e.target.classList.contains("btnDelete")) {
        const id = e.target.getAttribute("data-id");
        deletePet(id);
    }
});


// Función para mostrar los detalles de una mascota (solo lectura)
async function showPet(id) {
    const token = localStorage.getItem("authToken");
    try {
        const response = await fetch(`http://127.0.0.1:8000/api/pets/show/${id}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
        });
        const data = await response.json();
        if (response.ok) {
            // Llena los campos de la vista show (solo lectura)
            const showMain = document.getElementById("show");
            const infoRows = showMain.querySelectorAll(".info-row p");
            // Orden: Name, Kind, Age, Weight, Breed, Location
            infoRows[0].textContent = data.pet.name;
            infoRows[1].textContent = data.pet.kind;
            infoRows[2].textContent = data.pet.age;
            infoRows[3].textContent = data.pet.weight;
            infoRows[4].textContent = data.pet.breed;
            infoRows[5].textContent = data.pet.location;
            // Imagen
            let imageSrc = data.pet.image ? `imgs/${data.pet.image}` : "imgs/no-image.png";
            showMain.querySelector(".pet-img").src = imageSrc;
            // Descripción
            showMain.querySelector(".description").textContent = data.pet.description;

            // Cambia la vista
            document.getElementById("dashboard").style.display = "none";
            showMain.style.display = "block";
            mainEdit.style.display = "none";
            document.getElementById("add").style.display = "none";
        } else {
            Swal.fire("Error", data.message || "No se pudo cargar la mascota", "error");
        }
    } catch (error) {
        Swal.fire("Error", "Error de conexión", "error");
    }
}


// Prepara el formulario de edición con los datos de la mascota
async function editPet(id) {
    const token = localStorage.getItem("authToken");
    try {
        const response = await fetch(`http://127.0.0.1:8000/api/pets/show/${id}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
        });
        const data = await response.json();
        if (response.ok) {
            editForm.name.value = data.pet.name;
            editForm.kind.value = data.pet.kind;
            editForm.weight.value = data.pet.weight;
            editForm.age.value = data.pet.age;
            editForm.bread.value = data.pet.breed;
            editForm.location.value = data.pet.location;
            editForm.description.value = data.pet.description;
            editForm.setAttribute("data-id", id);
            // Cambia la vista
            document.getElementById("dashboard").style.display = "none";
            mainEdit.style.display = "block";
            document.getElementById("show").style.display = "none";
            document.getElementById("add").style.display = "none";
        } else {
            Swal.fire("Error", data.message || "No se pudo cargar la mascota", "error");
        }
    } catch (error) {
        Swal.fire("Error", "Error de conexión", "error");
    }
}

// Función para eliminar una mascota
async function deletePet(id) {
    Swal.fire({
        title: '¿Estás seguro?',
        text: "¡No podrás revertir tu decisión!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Sí, eliminar',
        cancelButtonText: 'Cancelar'
    }).then(async (result) => {
        if (result.isConfirmed) {
            const token = localStorage.getItem("authToken");
            try {
                const response = await fetch(`http://127.0.0.1:8000/api/pets/delete/${id}`, {
                    method: "DELETE",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`,
                    },
                });
                const data = await response.json();
                if (response.ok) {
                    Swal.fire('¡Eliminado con éxito!', 'La mascota ha sido eliminada.', 'success');
                    getPets();
                } else {
                    Swal.fire('Error', data.message || 'Error al eliminar la mascota seleccionada', 'error');
                }
            } catch (error) {
                Swal.fire('Error', 'Error de conexión', 'error');
            }
        }
    });
}

// Función para agregar una nueva mascota
async function addPet(e) {
    e.preventDefault();
    const formData = {
        name: addPetForm.name.value,
        kind: addPetForm.kind.value,
        weight: addPetForm.weight.value,
        age: addPetForm.age.value,
        breed: addPetForm.bread.value,
        location: addPetForm.location.value,
        description: addPetForm.description.value
    };
    const token = localStorage.getItem('authToken');
    try {
        const response = await fetch('http://127.0.0.1:8000/api/pets/store', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify(formData)
        });
        const data = await response.json();
        if (response.ok) {
            Swal.fire('¡Mascota agregada!', 'La mascota fue registrada correctamente.', 'success');
            addPetForm.reset();
            getPets();
            document.getElementById('add').style.display = 'none';
            document.getElementById('dashboard').style.display = 'block';
        } else {
            Swal.fire('Error', data.message || 'No se pudo agregar la mascota', 'error');
        }
    } catch (error) {
        Swal.fire('Error', 'Error de conexión', 'error');
    }
}

// Función para guardar cambios de edición
async function submitEditPet(e) {
    e.preventDefault();
    const id = editForm.getAttribute("data-id");
    const token = localStorage.getItem("authToken");
    const formData = {
        name: editForm.name.value,
        kind: editForm.kind.value,
        weight: editForm.weight.value,
        age: editForm.age.value,
        breed: editForm.bread.value,
        location: editForm.location.value,
        description: editForm.description.value
    };
    try {
        const response = await fetch(`http://127.0.0.1:8000/api/pets/edit/${id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify(formData)
        });
        const data = await response.json();
        if (response.ok) {
            Swal.fire("¡Mascota editada!", "Los cambios fueron guardados con éxito.", "success");
            getPets();
            mainEdit.style.display = "none";
            document.getElementById("dashboard").style.display = "block";
        } else {
            Swal.fire("Error", data.message || "Lo sentmos, la mascota no ha podido ser editada", "error");
        }
    } catch (error) {
        Swal.fire("Error", "Error de conexión", "error");
    }
}

// Event listeners para navegación y formularios
btnLogout.addEventListener("click", () => {
    localStorage.removeItem("authToken");
    localStorage.setItem("currentView", 0);
    showView();
});

btnAdd.addEventListener("click", () => {
    localStorage.setItem("currentView", 2);
    showView();
});

btnBack.forEach((element) => {
    element.addEventListener("click", () => {
        localStorage.setItem("currentView", 1);
        showView();
    });
});

btnCancel.forEach((element) => {
    element.addEventListener("click", () => {
        localStorage.setItem("currentView", 1);
        showView();
    });
});

addPetForm.addEventListener('submit', addPet);
editForm.addEventListener('submit', submitEditPet);

// Función para mostrar la vista actual
function showView() {
    views.forEach((element) => {
        element.classList.remove("animateView");
        element.style.display = "none";
    });

    const current = localStorage.getItem("currentView");

    views[current].classList.add("animateView");
    views[current].style.display = "block";

    if (current == 1) {
        getPets();
    }
}