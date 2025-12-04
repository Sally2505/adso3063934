<!DOCTYPE html>

<html lang="en">
<head>
<meta charset="UTF-8">
<title>All Pets Report</title>
<style>
table {
border: 2px solid #aaa;
border-collapse: collapse
}
table th, table td {
font-family: sans-serif;
font-size: 10px;
border: 2px solid #ccc;
padding: 4px;
}
table tr:nth-child(odd) {
background-color: #eee;
}
table th {
background-color: #666;
color: #fff;
text-align: center;
}
</style>
</head>
<body>
<h1>Reporte de Mascotas (Pets)</h1>
<table>
<thead>
<tr>
<th>ID</th>
<th>Name</th>
<th>Kind</th>
<th>Breed</th>
<th>Age</th>
<th>Active</th>
<th>Image</th>
</tr>
</thead>
<tbody>
@foreach ($pets as $pet)
<tr>
<td>{{ $pet->id }}</td>
<td>{{ $pet->name }}</td>
<td>{{ $pet->kind }}</td>
<td>{{ $pet->breed }}</td>
<td>{{ $pet->age }}</td>
<td>{{ $pet->active ? 'Yes' : 'No' }}</td>
<td>
@php
// 1. Lógica para el placeholder: usar 'no-image.png' si $pet->image está vacío
$imagePath = $pet->image ? $pet->image : 'no-image.png';

                    // 2. Lógica para la extensión: se basa en el archivo que realmente se va a cargar ($imagePath)
                    $extension = substr($imagePath, -4);
                @endphp
                
                @if ($extension != 'webp' && $extension != '.svg')
                    {{-- Usamos $imagePath, que ahora contiene el nombre de archivo real o el placeholder --}}
                    <img src="{{ public_path().'/images/'.$imagePath }}" width="96px">
                @else
                    Webp|SVG
                @endif
            </td>
        </tr>
        @endforeach
    </tbody>
</table>


</body>
</html>