<?php

namespace App\Http\Controllers;

use App\Models\Pet;
use Illuminate\Http\Request;
use Barryvdh\DomPDF\Facade\Pdf;
use Maatwebsite\Excel\Facades\Excel;
use App\Exports\PetsExport;

class PetController extends Controller
{
    // LISTADO
    public function index()
    {
        $pets = Pet::orderBy('id', 'desc')->paginate(20);
        return view('pets.index')->with('pets', $pets);
    }

    // FORMULARIO CREAR
    public function create()
    {
        return view('pets.create');
    }

    // GUARDAR
    public function store(Request $request)
    {
        $request->validate([
            'name'        => 'required|string|max:255',
            'image'       => 'nullable|image',
            'kind'        => 'required|string|max:255',
            'weight'      => 'required|numeric',
            'age'         => 'required|integer',
            'breed'       => 'required|string|max:255',
            'description' => 'nullable|string',
            'active'      => 'required|boolean',
        ]);

        // Imagen
        $imageName = "no-image.png";

        if ($request->hasFile('image')) {
            $imageName = time() . '.' . $request->image->extension();
            $request->image->move(public_path('images'), $imageName);
        }

        $pet = new Pet();
        $pet->name        = $request->name;
        $pet->image       = $imageName;
        $pet->kind        = $request->kind;
        $pet->weight      = $request->weight;
        $pet->age         = $request->age;
        $pet->breed       = $request->breed;
        $pet->location    = "";
        $pet->description = $request->description;
        $pet->active      = $request->active;
        $pet->status      = 1;

        $pet->save();

        return redirect('pets')->with('message', 'Pet registered successfully!');
    }

    // MOSTRAR UNO (SHOW)
    public function show(Pet $pet)
    {
        return view('pets.show')->with('pet', $pet);
    }

    // FORMULARIO EDITAR
    public function edit(Pet $pet)
    {
        return view('pets.edit')->with('pet', $pet);
    }

    // ACTUALIZAR
    public function update(Request $request, Pet $pet)
    {
        $request->validate([
            'name'        => 'required|string|max:255',
            'kind'        => 'required|string|max:255',
            'weight'      => 'required|numeric',
            'age'         => 'required|integer',
            'breed'       => 'required|string|max:255',
            'description' => 'nullable|string',
            'active'      => 'required|boolean',
        ]);

        // Nueva imagen (opcional)
        $imageName = $pet->image;

        if ($request->hasFile('image')) {
            $imageName = time() . '.' . $request->image->extension();
            $request->image->move(public_path('images'), $imageName);

            // Borrar la antigua
            if ($pet->image && $pet->image != "no-image.png") {
                $oldPath = public_path("images/" . $pet->image);
                if (file_exists($oldPath)) {
                    unlink($oldPath);
                }
            }
        }

        // Guardar
        $pet->name        = $request->name;
        $pet->image       = $imageName;
        $pet->kind        = $request->kind;
        $pet->weight      = $request->weight;
        $pet->age         = $request->age;
        $pet->breed       = $request->breed;
        $pet->description = $request->description;
        $pet->active      = $request->active;

        $pet->save();

        return redirect('pets')->with('message', 'Pet updated successfully!');
    }

    // ELIMINAR
    public function destroy(Pet $pet)
    {
        if ($pet->image != 'no-image.png') {
            $path = public_path('images/' . $pet->image);
            if (file_exists($path)) unlink($path);
        }

        $pet->delete();

        return redirect('pets')->with('message', 'Pet deleted!');
    }

    // EXPORT PDF
    public function pdf()
    {
        $pets = Pet::all();
        $pdf = PDF::loadView('pets.pdf', compact('pets'))->setPaper('A4', 'landscape');
        return $pdf->download('pets.pdf');
    }

    // EXPORT EXCEL
    public function excel()
    {
        return Excel::download(new PetsExport, 'pets.xlsx');
    }

    // BUSCAR
    public function search(Request $request)
    {
        $query = $request->q;

        $pets = Pet::where('name', 'like', "%$query%")
            ->orWhere('kind', 'like', "%$query%")
            ->orderBy('id', 'desc')
            ->get();

        return view('pets.search', compact('pets'));
    }
}
