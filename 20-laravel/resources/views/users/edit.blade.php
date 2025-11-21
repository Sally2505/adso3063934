@extends('layouts.dashboard')

@section('title', 'Update User: Larapets')

@section('content')
<h1 class="text-3xl md:text-4xl font-extrabold text-[#5EC9A5] flex items-center gap-3 justify-center pb-6 mb-10">

    <span class="p-3 bg-[#A8F1D0] rounded-2xl shadow-sm flex items-center justify-center">
        <svg xmlns="http://www.w3.org/2000/svg" class="size-12" fill="currentColor" viewBox="0 0 256 256">
            <path
                d="M227.31,73.37,182.63,28.68a16,16,0,0,0-22.63,0L36.69,152A15.86,15.86,0,0,0,32,163.31V208a16,16,0,0,0,16,16H92.69A15.86,15.86,0,0,0,104,219.31L227.31,96a16,16,0,0,0-22.63ZM92.69,208H48V163.31l88-88L180.69,120Z">
            </path>
        </svg>
    </span>
    Update User
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
            <a href="{{ url('users') }}>
                <svg xmlns=" http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                class="h-4 w-4 stroke-current">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                    d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z"></path>
                </svg>
                User Module
            </a>
        </li>
        <li>
            <span class="inline-flex items-center gap-2">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" class="h-4 w-4 stroke-current">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                        d="M9 13h6m-3-3v6m5 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z">
                    </path>
                </svg>
                Update User
            </span>
        </li>
    </ul>
</div>
<div class="card text-white md:w-[720px] w-[320px]">
    <form method="POST" action="{{ url('users/.$user->id') }}" class="w-full md:w-[320px]">
        @csrf
        @method('PUT')

        <div class="w-full md:w-[320px]">
            <div
                class="avatar flex flex-col gap-2 items-center justify-center cursor-pointer hover:scale-110 transition ease-in">
                <div id="upload" class="w-48 rounded-full">
                    <img id="preview" src="{{ asset('images/'.$user->photo) }}" />
                </div>
                <small class="pb-0 border-white border-b flex gap-1 items-center justify-center">
                    upload photo
                </small>
            </div>
            <input type="file" id="photo" name="photo" class="hidden" accept="image/*">
            <input type="hidden" name="originphoto" value="{{ $user->photo }}">
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-4 text-left">
            {{-- Document --}}
            <div>
                <label class="label text-white font-medium text-sm">Document</label>
                <input type="text" name="document"
                    class="input input-bordered w-full rounded-lg text-sm focus:ring-2 focus:ring-pink-400 focus:border-pink-400"
                    placeholder="75123123" value="{{ old('document', $user->document) }}" />
                @error('document')
                <small class="badge badge-error mt-1">{{ $message }}</small>
                @enderror
            </div>

            {{-- Full Name --}}
            <div>
                <label class="label text-white font-medium text-sm">Full Name</label>
                <input type="text" name="fullname"
                    class="input input-bordered w-full rounded-lg text-sm focus:ring-2 focus:ring-pink-400 focus:border-pink-400"
                    placeholder="Jeremias Springfield" value="{{ old('fullname', $user->fullname) }}" />
                @error('fullname')
                <small class="badge badge-error mt-1">{{ $message }}</small>
                @enderror
            </div>

            {{-- Gender --}}
            <div>
                <label class="label text-white font-medium text-sm mb-1">Gender</label>
                <select name="gender"
                    class="select select-bordered w-full rounded-lg text-sm bg-white/80 border-white-300 focus:ring-2 focus:ring-pink-400 focus:border-pink-400">
                    <option value="">Select</option>
                    <option value="Female" @if(old('gender', $user->gender)=='Female' ) selected @endif>Female</option>
                    <option value="Male" @if(old('gender', $user->gender)=='Male') selected @endif>Male</option>
                </select>
                @error('gender')
                <small class="badge badge-error mt-1">{{ $message }}</small>
                @enderror
            </div>

            {{-- Birthdate --}}
            <div>
                <label class="label text-white font-medium text-sm">Birthdate</label>
                <input type="date" name="birthdate"
                    class="input input-bordered w-full rounded-lg text-sm focus:ring-2 focus:ring-pink-400 focus:border-pink-400"
                    value="{{ old('birthdate', $user->birthdate) }}" />
                @error('birthdate')
                <small class="badge badge-error mt-1">{{ $message }}</small>
                @enderror
            </div>

            {{-- Phone --}}
            <div>
                <label class="label text-white font-medium text-sm">Phone</label>
                <input type="text" name="phone"
                    class="input input-bordered w-full rounded-lg text-sm focus:ring-2 focus:ring-pink-400 focus:border-pink-400"
                    placeholder="3108326537" value="{{ old('phone', $user->phone) }}" />
                @error('phone')
                <small class="badge badge-error mt-1">{{ $message }}</small>
                @enderror
            </div>

            {{-- Email --}}
            <div>
                <label class="label text-white font-medium text-sm">Email</label>
                <input type="email" name="email"
                    class="input input-bordered w-full rounded-lg text-sm focus:ring-2 focus:ring-pink-400 focus:border-pink-400"
                    placeholder="example@email.com" value="{{ old('email', $user->email) }}" />
                @error('email')
                <small class="badge badge-error mt-1">{{ $message }}</small>
                @enderror
            </div>
        </div>

        {{-- Botón centrado --}}
        <div class="flex justify-center mt-6">
            <button
                class="btn btn-outline btn-secondary px-6 py-1 text-sm font-semibold rounded-lg shadow-sm hover:bg-pink-500 hover:text-white transition-all duration-200">
                Register
            </button>
        </div>

        {{-- Enlace inferior --}}
        <div class="text-center mt-3 text-white-700">
            <p class="text-xs">
                <a class="link link-default hover:text-pink-600" href="{{ route('login') }}">
                    Already Registered?
                </a>
            </p>
        </div>
    </form>
</div>
@section('js')
<script>
    $(document).ready(function (){
            $('#upload').click(function (e) {
                e.preventDefault()
                $('#photo').click()
            })
            $('#preview').attr('src', window-URL.createObjectURL($(this).prop('files')[0]))
        })
</script>
@endsection
@endsection