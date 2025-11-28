<?php


use Illuminate\Support\Facades\Route;
use App\Http\Controllers\UserController;

Route::get('/', function () {
    return view('welcome');
});

Route::get('/dashboard', function () {
    return view('dashboard');
})->middleware(['auth', 'verified'])->name('dashboard');

Route::middleware('auth')->group(function () {

    Route::resources([
        'users' => UserController::class,
        // 'pets' => PetController::class,
        // 'adoptions' => AdoptionController::class,
    ]);

    Route::get('hello', function () {
        return "<h1>Hello folks, Have a nice day 😍</h1>";
    });

    Route::get('hello/{name}', function () {
        return "<h1>Hello: " . request()->name . "</h1>";
    });

    Route::get('show/pets', function () {
        $pets = App\Models\Pet::all();
        dd($pets->toArray());
    });

    Route::get('show/pet/{id}', function () {
        $pet = App\Models\Pet::find(request()->id);
        dd($pet->toArray());
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
            $code .= "<td $stylesTD>" . $user->id . "</td>";
            $code .= "<td $stylesTD><img src='" . asset('images/' . $user->photo) . "' width='40px'></td>";
            $code .= "<td $stylesTD>" . $user->fullname . "</td>";
            $code .= "<td $stylesTD>" . Carbon\Carbon::parse($user->birthdate)->age . " years old</td>";
            $code .= "<td $stylesTD>" . $user->created_at->diffForHumans() . "</td>";
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

    //Search 
    Route::post('search/users', [UserController::class, 'search']);


    Route::get('export/users/pdf', [UserController::class, 'pdf']);
    Route::get('export/users/excel', [UserController::class, 'excel']);

    // Import
    Route::get('import/users/excel', [UserController::class, 'import']);
    

});

require __DIR__ . '/auth.php';
