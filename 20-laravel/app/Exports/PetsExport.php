<?php

namespace App\Exports;

use App\Models\Pet; // Usamos el modelo Pet
use Illuminate\Contracts\View\View;
use Maatwebsite\Excel\Concerns\FromView;
use Maatwebsite\Excel\Concerns\WithColumnWidths;
use Maatwebsite\Excel\Concerns\WithStyles;
use PhpOffice\PhpSpreadsheet\Worksheet\Worksheet;

class PetsExport implements FromView, WithColumnWidths, WithStyles
{
    /**
    * Retorna la vista Blade que contiene los datos de la tabla.
    * Los datos se obtienen del modelo Pet.
    */
    public function view(): View
    {
        return view('pets.excel', [ // Usamos la vista 'pets.excel'
            'pets' => Pet::all() // Obtenemos todas las mascotas
        ]);
    }

    /**
    * Define el ancho de las columnas en la hoja de cálculo.
    * Ajustado a los campos de la tabla 'pets'.
    */
    public function columnWidths(): array
    {
        return [
            'A' => 5,  // ID
            'B' => 30, // Name
            'C' => 20, // Kind (Especie)
            'D' => 25, // Breed (Raza)
            'E' => 10, // Age
            'F' => 15, // Weight
            'G' => 40, // Description
        ];
    }

    /**
    * Aplica estilos a la hoja de cálculo (ej. fila de encabezados).
    */
    public function styles(Worksheet $sheet)
    {
        return [
            // Estilo para la primera fila (encabezados)
            1 => ['font' => ['bold' => true, 'size' => 16, 'color' => ['argb' => 'FF5C0000']]], 
            // Estilo para el resto del contenido si es necesario
        ];
    }
}