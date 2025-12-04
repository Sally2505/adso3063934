<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>All Pets</title> {{-- Título cambiado a 'All Pets' --}}
</head>

<body>
    <table>
        <thead>
            <tr>
                <th>ID</th>
                <th>Name</th> {{-- Full Name -> Name --}}
                <th>Kind</th> {{-- Email -> Kind (Especie) --}}
                <th>Breed</th> {{-- Phone -> Breed (Raza) --}}
                <th>Age</th> {{-- Role -> Age (Edad) --}}
                <th>Photo</th>
            </tr>
        </thead>
        <tbody>
            {{-- Cambiamos la variable de iteración de $users a $pets --}}
            @foreach ($pets as $pet)
            <tr>
                <td>{{ $pet->id }}</td>
                <td>{{ $pet->name }}</td>
                <td>{{ $pet->kind }}</td>
                <td>{{ $pet->breed }}</td>
                <td>{{ $pet->age }}</td>
                <td>
                    {{-- Cambiamos $user->photo a $pet->image --}}
                    <img src="{{ public_path().'/images/'.$pet->image }}" width="50px">
                </td>
            </tr>
            @endforeach
        </tbody>
    </table>
</body>

</html>