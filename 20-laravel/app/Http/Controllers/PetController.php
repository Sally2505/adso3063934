<?php

namespace App\Http\Controllers;

use App\Models\Pet;
use Illuminate\Http\Request;
use Barryvdh\DomPDF\Facade\Pdf;
use Maatwebsite\Excel\Facades\Excel;
use App\Exports\PetsExport;

class PetController extends Controller
{
    public function index()
    {
        $pets = Pet::orderBy('id', 'desc')->paginate(20);
        return view('pets.index')->with('pets', $pets);
    }

    public function create()
    {
        return view('pets.create');
    }

    public function store(Request $request)
    {
        $request->validate([
            'name'        => 'required|string|max:255',
            'image'       => 'required|image',
            'kind'        => 'required|string|max:255',
            'weight'      => 'required|numeric',
            'age'         => 'required|integer',
            'breed'       => 'required|string|max:255',
            'location'    => 'required|string|max:255',
            'description' => 'nullable|string',
            'active'      => 'required|boolean',
            'status'      => 'required|boolean'
        ]);

        // Imagen
        $imageName = time() . '.' . $request->image->extension();
        $request->image->move(public_path('images'), $imageName);

        // GUARDAR
        $pet = new Pet();
        $pet->name        = $request->name;
        $pet->image       = $imageName;
        $pet->kind        = $request->kind;
        $pet->weight      = $request->weight;
        $pet->age         = $request->age;
        $pet->breed       = $request->breed;
        $pet->location    = $request->location;
        $pet->description = $request->description;
        $pet->active      = $request->active;
        $pet->status      = $request->status;

        $pet->save();

        return redirect('pets')->with('message', 'Pet registered successfully!');
    }

    public function edit(Pet $pet)
    {
        return view('pets.edit')->with('pet', $pet);
    }

    public function update(Request $request, Pet $pet)
    {
        $request->validate([
            'name'        => 'required|string|max:255',
            'kind'        => 'required|string|max:255',
            'weight'      => 'required|numeric',
            'age'         => 'required|integer',
            'breed'       => 'required|string|max:255',
            // location removed
            'description' => 'nullable|string',
            'active'      => 'required|boolean',
            // status removed
        ]);

        // Imagen nueva (opcional)
        $imageName = $pet->image;

        if ($request->hasFile('image')) {

            // sube nueva
            $imageName = time() . '.' . $request->image->extension();
            $request->image->move(public_path('images'), $imageName);

            // borra antigua
            if ($pet->image && $pet->image != "no-image.png") {
                $oldPath = public_path("images/" . $pet->image);
                if (file_exists($oldPath)) unlink($oldPath);
            }
        }

        // actualizar
        $pet->name        = $request->name;
        $pet->image       = $imageName;
        $pet->kind        = $request->kind;
        $pet->weight      = $request->weight;
        $pet->age         = $request->age;
        $pet->breed       = $request->breed;
        // $pet->location removed
        $pet->description = $request->description;
        $pet->active      = $request->active;
        // $pet->status removed

        $pet->save();

        return redirect('pets')->with('message', 'Pet updated successfully!');
    }

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
