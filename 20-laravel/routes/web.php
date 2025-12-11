<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\UserController;
use App\Http\Controllers\PetController;
use App\Http\Controllers\AdoptionController;
use App\Http\Controllers\CustomerController;

Route::get('/', function () {
    return view('welcome');
});

Route::get('/dashboard', function () {
    return view('dashboard');
})->middleware(['auth', 'verified'])->name('dashboard');

Route::middleware('auth')->group(function () {

    // Rutas CRUD automáticas
    Route::resources([
        'users' => UserController::class,
        'pets' => PetController::class,
    ]);

    // Extras
    Route::get('hello', function () {
        return "<h1>Hello folks, Have a nice day 😍</h1>";
    });

    Route::get('hello/{name}', function () {
        return "<h1>Hello: " . request()->name . "</h1>";
    });

    // Utilities
    Route::get('show/pets', function () {
        $pets = App\Models\Pet::all();
    });

    Route::get('show/pet/{id}', function () {
        $pet = App\Models\Pet::find(request()->id);
    });

    Route::get('challenge', function () {
        $users = App\Models\User::take(20)->get();
        $stylesTH = "style='background: gray; color: white; padding: 0.4rem'";
        $stylesTD = "style='border: 1px solid gray; padding: 0.4rem'";

        $code = "<table style='border-collapse: collapse; margin: 2rem auto; font-family: Arial'>
                    <tr>
                        <th $stylesTH>Id</th>
                        <th $stylesTH>Photo</th>
                        <th $stylesTH>Fullname</th>
                        <th $stylesTH>Age</th>
                        <th $stylesTH>Created At</th>
                    </tr>";

        foreach ($users as $user) {
            $code .= ($user->id % 2 == 0) ? "<tr style='background: #ddd'>" : "<tr>";
            $code .= "<td $stylesTD>{$user->id}</td>";
            $code .= "<td $stylesTD><img src='" . asset('images/' . $user->photo) . "' width='40px'></td>";
            $code .= "<td $stylesTD>{$user->fullname}</td>";
            $code .= "<td $stylesTD>" . Carbon\Carbon::parse($user->birthdate)->age . " years old</td>";
            $code .= "<td $stylesTD>{$user->created_at->diffForHumans()}</td>";
            $code .= "</tr>";
        }

        return $code . "</table>";
    });

    Route::get('view/pets', function () {
        $pets = App\Models\Pet::all();
        return view('view-pets')->with('pets', $pets);
    });

    Route::get('view/pet/{id}', function () {
        $pet = App\Models\Pet::find(request()->id);
        return view('view-pet')->with('pet', $pet);
    });

    // Search users
    Route::post('search/users', [UserController::class, 'search']);

    // Export users
    Route::get('export/users/pdf', [UserController::class, 'pdf']);
    Route::get('export/users/excel', [UserController::class, 'excel']);

    // Import users
    Route::get('import/users/excel', [UserController::class, 'import']);

    Route::get('export/pet/excel', [PetController::class, 'excel']); // Nueva ruta
    Route::get('export/pet/pdf', [PetController::class, 'pdf']);   // Nueva ruta

    Route::post('search/pets', [PetController::class, 'search']);

    //Adoptions
    Route::get('adoptions', [AdoptionController::class, 'index']);
    Route::get('adoptions/{id}', [AdoptionController::class, 'show']);

    // SEARCH - SOLO 1 CORRECTA
    Route::post('search/adoptions', [AdoptionController::class, 'search'])->name('adoptions.search');

    // EXPORTS
    Route::get('export/adoptions/pdf', [AdoptionController::class, 'pdf']);
    Route::get('export/adoptions/excel', [AdoptionController::class, 'excel']);



    //Customer
    Route::get('myprofile/', [CustomerController::class, 'myprofile']);
    Route::put('myprofile/{id}', [CustomerController::class, 'updatemyprofile']);

    Route::get('myadoptions/', [CustomerController::class, 'myadoptions']);
    Route::get('myadoptions/{id}', [CustomerController::class, 'showadoption'])
        ->name('customer.adoptions.show');

    Route::get('makeadoptions/', [CustomerController::class, 'listpets']);
    // Mostrar confirmación
    Route::get('makeadoption/{id}', [CustomerController::class, 'confirmadoption'])
        ->name('customer.adoptions.confirm');

    // Ejecutar la adopción (acción real)
    Route::post('makeadoption', [CustomerController::class, 'makeadoption'])
        ->name('customer.adoptions.make');

    // SEARCH PETS TO ADOPT
    Route::post('makeadoptions/search', [CustomerController::class, 'search'])
    ->name('customer.adoptions.search');



});

// AUTH
require __DIR__ . '/auth.php';
