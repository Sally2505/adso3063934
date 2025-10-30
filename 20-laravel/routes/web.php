<?php

use Illuminate\Support\Facades\Route;
use App\Models\User;
use Carbon\Carbon;

Route::get('/', function () {
    //return "This is a route: 😎";
    return view('welcome');
});

Route::get('hello', function() {
    return "<h1>Hello folks, Have a nice day 🥰</h1>";
});

Route::get('hello/{name}', function() {
    return "<h1>Hello: ".request()->name."</h1>";
});

Route::get('show/pets', function() {
    $pets = App\Models\Pet::all();
    dd($pets->toArray()); //Dump and Die
});

use App\Models\Pet;

Route::get('show/pets/{id}', function ($id) {
    $pet = Pet::find($id); 
    dd($pet->toArray());   
});

Route::get('/challenge/users', function () {
    $users = User::limit(20)->get();

    $code = "<table style='border-collapse: collapse; margin: 2rem auto; font-family: Arial'>
                <tr>
                    <th style='background: gray; color: white; padding: 0.4rem'>Id</th>
                    <th style='background: gray; color: white; padding: 0.4rem'>Photo</th>
                    <th style='background: gray; color: white; padding: 0.4rem'>Fullname</th>
                    <th style='background: gray; color: white; padding: 0.4rem'>Age</th>
                    <th style='background: gray; color: white; padding: 0.4rem'>Created At</th>
                </tr>";

    foreach ($users as $user) {
        $photoPath = asset('images/' . $user->photo); // campo 'photo' y carpeta 'images'

        $code .= "<tr>";
        $code .= "<td style='border: 1px solid gray; padding: 0.4rem; text-align: center'>" . $user->id . "</td>";

        // Mostrar foto o imagen por defecto si no existe
        if (!empty($user->photo) && file_exists(public_path('images/' . $user->photo))) {
            $code .= "<td style='border: 1px solid gray; padding: 0.4rem; text-align: center'>
                        <img src='{$photoPath}' alt='User Photo' width='60' height='60' style='border-radius: 50%; object-fit: cover'>
                      </td>";
        } else {
            $code .= "<td style='border: 1px solid gray; padding: 0.4rem; text-align: center'>
                        <img src='" . asset('images/default.png') . "' alt='Default Photo' width='60' height='60' style='border-radius: 50%; object-fit: cover'>
                      </td>";
        }

        $code .= "<td style='border: 1px solid gray; padding: 0.4rem'>" . e($user->fullname) . "</td>";
        $code .= "<td style='border: 1px solid gray; padding: 0.4rem'>" . Carbon::parse($user->birthdate)->age . " years old</td>";
        $code .= "<td style='border: 1px solid gray; padding: 0.4rem'>" . $user->created_at->diffForHumans() . "</td>";
        $code .= "</tr>";
    }

    return $code . "</table>";
});

Route::get('view/pets', function(){
    $pets = App\Models\Pet::all();
    return view('view-pets')->with('pets', $pets);
});





