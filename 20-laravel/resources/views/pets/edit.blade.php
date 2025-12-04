@extends('layouts.dashboard')

@section('title', 'Update Pet: Larapets')

@section('content')
<h1 class="text-4xl font-bold text-black flex gap-2 items-center justify-center pb-4 border-b-2 mb-10">

    <span class="p-3 rounded-2xl shadow-sm flex items-center justify-center">
        <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" fill="CurrentColor" viewBox="0 0 256 256">
            <path
                d="M212,80a28,28,0,1,0,28,28A28,28,0,0,0,212,80Zm0,40a12,12,0,1,1,12-12A12,12,0,0,1,212,120ZM72,108a28,28,0,1,0-28,28A28,28,0,0,0,72,108ZM44,120a12,12,0,1,1,12-12A12,12,0,0,1,44,120ZM92,88A28,28,0,1,0,64,60,28,28,0,0,0,92,88Zm0-40A12,12,0,1,1,80,60,12,12,0,0,1,92,48Zm72,40a28,28,0,1,0-28-28A28,28,0,0,0,164,88Zm0-40a12,12,0,1,1-12,12A12,12,0,0,1,164,48Zm23.12,100.86a35.3,35.3,0,0,1-16.87-21.14,44,44,0,0,0-84.5,0A35.25,35.25,0,0,1,69,148.82,40,40,0,0,0,88,224a39.48,39.48,0,0,0,15.52-3.13,64.09,64.09,0,0,1,48.87,0,40,40,0,0,0,34.73-72ZM168,208a24,24,0,0,1-9.45-1.93,80.14,80.14,0,0,0-61.19,0,24,24,0,0,1-20.71-43.26,51.22,51.22,0,0,0,24.46-30.67,28,28,0,0,1,53.78,0,51.27,51.27,0,0,0,24.53,30.71A24,24,0,0,1,168,208Z">
            </path>
        </svg>
    </span>

    <span class="tracking-wide text-center">Update Pet</span>
</h1>
{{-- Breadcrumbs (Se mantienen sin cambios) --}}
<div class="breadcrumbs text-sm text-white mb-6">
    <ul>
        <li><a href="{{ url('dashboard') }}">Dashboard</a></li>
        <li><a href="{{ url('pets') }}">Pet Module</a></li>
        <li><span class="inline-flex items-center gap-2">Update Pet</span></li>
    </ul>
</div>

{{-- **CARD ÚNICO CON FORMULARIO INTEGRADO** --}}
<div class="card text-black/70 md:w-[720px] w-full mx-auto">
    {{-- Se usa la clase de fondo que tenías en el card de vista --}}
    <div class="bg-[#0006] p-6 rounded-sm"> 
        <form method="POST" action="{{ url('pets/'. $pet->id) }}" enctype="multipart/form-data" class="w-full">
            @csrf
            @method('PUT')

            {{-- Sección de la foto (Única) --}}
            <div class="w-full">
                <div
                    class="avatar flex flex-col gap-2 items-center justify-center cursor-pointer hover:scale-110 transition ease-in">
                    <div id="upload" class="w-48 rounded-full">
                        {{-- La imagen se mantiene centrada y única --}}
                        <img id="preview" src="{{ asset('images/'.$pet->image) }}" />
                    </div>
                    <small class="pb-0 border-white border-b flex gap-1 items-center justify-center">
                        upload photo
                    </small>
                </div>
                <input type="file" id="photo" name="image" class="hidden" accept="image/*">
                <input type="hidden" name="originimage" value="{{ $pet->image }}">
            </div>

            {{-- Grid de campos (se mantiene el estilo de 2 columnas) --}}
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4 text-left mt-6">
                
                {{-- name --}}
                <div>
                    <label class="label text-white font-medium text-sm">Name</label>
                    <input type="text" name="name"
                        class="input input-bordered w-full rounded-lg text-sm focus:ring-2 focus:ring-pink-400 focus:border-pink-400"
                        placeholder="Michi" value="{{ old('name', $pet->name) }}" />
                    @error('name')
                    <small class="badge badge-error mt-1">{{ $message }}</small>
                    @enderror
                </div>

                {{-- kind --}}
                <div>
                    <label class="label text-white font-medium text-sm">Kind</label>
                    <input type="text" name="kind"
                        class="input input-bordered w-full rounded-lg text-sm focus:ring-2 focus:ring-pink-400 focus:border-pink-400"
                        placeholder="Cat" value="{{ old('kind', $pet->kind) }}" />
                    @error('kind')
                    <small class="badge badge-error mt-1">{{ $message }}</small>
                    @enderror
                </div>

                {{-- weight --}}
                <div>
                    <label class="label text-white font-medium text-sm">Weight (kg)</label>
                    <input type="number" name="weight" step="0.01"
                        class="input input-bordered w-full rounded-lg text-sm focus:ring-2 focus:ring-pink-400 focus:border-pink-400"
                        placeholder="5.5" value="{{ old('weight', $pet->weight) }}" />
                    @error('weight')
                    <small class="badge badge-error mt-1">{{ $message }}</small>
                    @enderror
                </div>

                {{-- breed --}}
                <div>
                    <label class="label text-white font-medium text-sm">Breed</label>
                    <input type="text" name="breed"
                        class="input input-bordered w-full rounded-lg text-sm focus:ring-2 focus:ring-pink-400 focus:border-pink-400"
                        placeholder="Siamese" value="{{ old('breed', $pet->breed) }}" />
                    @error('breed')
                    <small class="badge badge-error mt-1">{{ $message }}</small>
                    @enderror
                </div>

                {{-- age --}}
                <div>
                    <label class="label text-white font-medium text-sm">Age (int)</label>
                    <input type="number" name="age"
                        class="input input-bordered w-full rounded-lg text-sm focus:ring-2 focus:ring-pink-400 focus:border-pink-400"
                        placeholder="3" value="{{ old('age', $pet->age) }}" />
                    @error('age')
                    <small class="badge badge-error mt-1">{{ $message }}</small>
                    @enderror
                </div>

                {{-- active --}}
                <div>
                    <label class="label text-white font-medium text-sm mb-1">Active</label>
                    <select name="active"
                        class="select select-bordered w-full rounded-lg text-sm bg-white/80 border-white-300 focus:ring-2 focus:ring-pink-400 focus:border-pink-400">
                        <option value="1" @if(old('active', $pet->active)==1 ) selected @endif>Yes</option>
                        <option value="0" @if(old('active', $pet->active)==0 ) selected @endif>No</option>
                    </select>
                    @error('active')
                    <small class="badge badge-error mt-1">{{ $message }}</small>
                    @enderror
                </div>
            </div>

            {{-- description (campo text) --}}
            <div class="mt-4">
                <label class="label text-white font-medium text-sm">Description</label>
                <textarea name="description" rows="3"
                    class="textarea textarea-bordered w-full rounded-lg text-sm focus:ring-2 focus:ring-pink-400 focus:border-pink-400"
                    placeholder="A very playful and friendly cat, but doesn't like water.">{{ old('description', $pet->description) }}</textarea>
                @error('description')
                <small class="badge badge-error mt-1">{{ $message }}</small>
                @enderror
            </div>

            {{-- Botón centrado --}}
            <div class="flex justify-center mt-6">
                <button type="submit"
                    class="btn btn-outline btn-secondary px-6 py-1 text-sm font-semibold rounded-lg shadow-sm hover:bg-pink-500 hover:text-white transition-all duration-200">
                    Update Pet
                </button>
            </div>
        </form>
    </div>
</div>

@section('js')
<script>
    $(document).ready(function (){
        // Al hacer clic en el avatar/imagen, se dispara el selector de archivos
        $('#upload').click(function (e) {
            e.preventDefault();
            $('#photo').click();
        });

        // Cuando el selector de archivos cambia (se selecciona una nueva imagen)
        $('#photo').change(function () {
            if (this.files && this.files[0]) {
                const file = this.files[0];
                const reader = new FileReader();

                reader.onload = function(e) {
                    // Actualiza la única imagen de previsualización
                    $('#preview').attr('src', e.target.result);
                }

                reader.readAsDataURL(file);
            }
        });
        
        // **Nota:** Se eliminó la lógica de actualización en tiempo real de los demás campos 
        // ya que el formulario está integrado, el usuario edita el valor directamente.
    });
</script>
@endsection
@endsection