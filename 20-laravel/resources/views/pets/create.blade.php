@extends('layouts.dashboard')

@section('title', 'Create Pet: Larapets')

@section('content')

<h1 class="text-4xl font-bold text-black flex gap-2 items-center justify-center pb-4 border-b-2 mb-10">

    <span class="p-3 rounded-2xl shadow-sm flex items-center justify-center">
        <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" fill="CurrentColor" viewBox="0 0 256 256">
            <path
                d="M212,80a28,28,0,1,0,28,28A28,28,0,0,0,212,80Zm0,40a12,12,0,1,1,12-12A12,12,0,0,1,212,120ZM72,108a28,28,0,1,0-28,28A28,28,0,0,0,72,108ZM44,120a12,12,0,1,1,12-12A12,12,0,0,1,44,120ZM92,88A28,28,0,1,0,64,60,28,28,0,0,0,92,88Zm0-40A12,12,0,1,1,80,60,12,12,0,0,1,92,48Zm72,40a28,28,0,1,0-28-28A28,28,0,0,0,164,88Zm0-40a12,12,0,1,1-12,12A12,12,0,0,1,164,48Zm23.12,100.86a35.3,35.3,0,0,1-16.87-21.14,44,44,0,0,0-84.5,0A35.25,35.25,0,0,1,69,148.82,40,40,0,0,0,88,224a39.48,39.48,0,0,0,15.52-3.13,64.09,64.09,0,0,1,48.87,0,40,40,0,0,0,34.73-72ZM168,208a24,24,0,0,1-9.45-1.93,80.14,80.14,0,0,0-61.19,0,24,24,0,0,1-20.71-43.26,51.22,51.22,0,0,0,24.46-30.67,28,28,0,0,1,53.78,0,51.27,51.27,0,0,0,24.53,30.71A24,24,0,0,1,168,208Z">
            </path>
        </svg>
    </span>

    <span class="tracking-wide text-center">Register Pet</span>


</h1>
{{-- Breadcrumbs --}}
<div class="breadcrumbs text-sm text-white mb-6">
    <ul>
        <li>
            <a href="{{ url('dashboard') }}">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" class="h-4 w-4 stroke-current">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                        d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z"></path>
                </svg>
                Dashboard
            </a>
        </li>
        <li>
            <a href="{{ url('pets') }}">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" class="h-4 w-4 stroke-current">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                        d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z"></path>
                </svg>
                Pet Module
            </a>
        </li>
        <li>
            <span class="inline-flex items-center gap-2">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" class="h-4 w-4 stroke-current">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                        d="M9 13h6m-3-3v6m5 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z">
                    </path>
                </svg>
                Register Pet
            </span>
        </li>
    </ul>
</div>

<div class="card text-black/70 md:w-[720px] w-full mx-auto">
    {{-- La forma debe usar enctype="multipart/form-data" para subir archivos (imagen) --}}
    <form method="POST" action="{{ url('pets') }}" enctype="multipart/form-data" class="w-full">
        @csrf

        <div class="bg-[#0006] p-6 rounded-sm">

            {{-- Sección de la foto --}}
            <div class="w-full">
                <div
                    class="avatar flex flex-col gap-2 items-center justify-center cursor-pointer hover:scale-110 transition ease-in">
                    <div id="upload" class="w-48 rounded-full">
                        <img id="preview" src="{{ asset('images/no-image.png') }}" />
                    </div>
                    <small class="pb-0 text-white border-b flex gap-1 items-center justify-center">
                        upload photo
                    </small>
                </div>

                {{-- Nombre del input cambiado a 'image' --}}
                <input type="file" id="image" name="image" class="hidden" accept="image/*">

                {{-- ** CORRECCIÓN CLAVE 1: Mostrar error de validación para la imagen ** --}}
                <div class="flex justify-center">
                    @error('image')
                    <small class="badge badge-error mt-1">{{ $message }}</small>
                    @enderror
                </div>

            </div>

            <div class="grid grid-cols-1 md:grid-cols-2 gap-4 text-left mt-6">

                {{-- Name (Reemplaza a Full Name) --}}
                <div>
                    <label class="label text-white font-medium text-sm">Name</label>
                    <input type="text" name="name"
                        class="input input-bordered w-full rounded-lg text-sm focus:ring-2 focus:ring-pink-400 focus:border-pink-400"
                        placeholder="Michi" value="{{ old('name') }}" />
                    @error('name')
                    <small class="badge badge-error mt-1">{{ $message }}</small>
                    @enderror
                </div>

                {{-- Kind (Especie - Reemplaza a Document) --}}
                <div>
                    <label class="label text-white font-medium text-sm">Kind</label>
                    <input type="text" name="kind"
                        class="input input-bordered w-full rounded-lg text-sm focus:ring-2 focus:ring-pink-400 focus:border-pink-400"
                        placeholder="Cat / Dog / Bird" value="{{ old('kind') }}" />
                    @error('kind')
                    <small class="badge badge-error mt-1">{{ $message }}</small>
                    @enderror
                </div>

                {{-- Breed (Raza - Reemplaza a Gender) --}}
                <div>
                    <label class="label text-white font-medium text-sm">Breed</label>
                    <input type="text" name="breed"
                        class="input input-bordered w-full rounded-lg text-sm focus:ring-2 focus:ring-pink-400 focus:border-pink-400"
                        placeholder="Siamese / German Shepherd" value="{{ old('breed') }}" />
                    @error('breed')
                    <small class="badge badge-error mt-1">{{ $message }}</small>
                    @enderror
                </div>

                {{-- Age (Edad - Reemplaza a Birthdate) --}}
                <div>
                    <label class="label text-white font-medium text-sm">Age (years)</label>
                    <input type="number" name="age"
                        class="input input-bordered w-full rounded-lg text-sm focus:ring-2 focus:ring-pink-400 focus:border-pink-400"
                        placeholder="3" value="{{ old('age') }}" min="0" />
                    @error('age')
                    <small class="badge badge-error mt-1">{{ $message }}</small>
                    @enderror
                </div>

                {{-- Weight (Peso - Reemplaza a Phone) --}}
                <div>
                    <label class="label text-white font-medium text-sm">Weight (kg)</label>
                    <input type="number" name="weight" step="0.01"
                        class="input input-bordered w-full rounded-lg text-sm focus:ring-2 focus:ring-pink-400 focus:border-pink-400"
                        placeholder="5.5" value="{{ old('weight') }}" min="0" />
                    @error('weight')
                    <small class="badge badge-error mt-1">{{ $message }}</small>
                    @enderror
                </div>

                {{-- Active (Estado - Nuevo campo útil para mascotas) --}}
                <div>
                    <label class="label text-white font-medium text-sm mb-1">Active</label>
                    <select name="active"
                        class="select select-bordered w-full rounded-lg text-sm bg-white/80 border-gray-300 focus:ring-2 focus:ring-pink-400 focus:border-pink-400">
                        <option value="1" @if(old('active')=='1' ) selected @endif>Yes</option>
                        <option value="0" @if(old('active')=='0' ) selected @endif>No</option>
                    </select>
                    @error('active')
                    <small class="badge badge-error mt-1">{{ $message }}</small>
                    @enderror
                </div>

                {{-- Campos eliminados: Email, Password, Password Confirmation --}}
            </div>

            {{-- Description (Descripción - Campo de texto grande) --}}
            <div class="mt-4 md:col-span-2">
                <label class="label text-white font-medium text-sm">Description</label>
                <textarea name="description" rows="3"
                    class="textarea textarea-bordered w-full rounded-lg text-sm focus:ring-2 focus:ring-pink-400 focus:border-pink-400"
                    placeholder="A very playful and friendly cat, but doesn't like water.">{{ old('description') }}</textarea>
                @error('description')
                <small class="badge badge-error mt-1">{{ $message }}</small>
                @enderror
            </div>


            {{-- Botón centrado --}}
            <div class="flex justify-center mt-6">
                <button type="submit"
                    class="btn btn-outline btn-secondary px-6 py-1 text-sm font-semibold rounded-lg shadow-sm hover:bg-pink-500 hover:text-white transition-all duration-200">
                    Register Pet
                </button>
            </div>
        </div>

    </form>


</div>
@section('js')
<script>
    // ** CORRECCIÓN CLAVE 2: Asegurar el uso de jQuery (el símbolo $)**
// Si estás usando jQuery, debe estar cargado en 'layouts.dashboard'.
// Además, el selector de ID debe ser correcto.
$(document).ready(function(){
$('#upload').click(function (e) {
e.preventDefault();
$('#image').click();
})
$('#image').change(function (e) {
e.preventDefault();
// Cargar y previsualizar la imagen seleccionada
if(this.files && this.files[0]) {
$('#preview').attr('src', window.URL.createObjectURL(this.files[0]));
}
})
})
</script>

@endsection
@endsection