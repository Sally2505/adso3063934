@extends('layouts.dashboard')

@section('title', 'Add User: Larapets')

@section('content')
<h1 class="text-3xl md:text-4xl font-extrabold text-[#5EC9A5] flex items-center gap-3 justify-center pb-6 mb-10">

    <span class="p-3 bg-[#A8F1D0] rounded-2xl shadow-sm flex items-center justify-center">
        <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" class="md:w-[34px] md:h-[34px]"
            fill="currentColor" viewBox="0 0 256 256">
            <path
                d="M128,176a32,32,0,1,0-32-32A32,32,0,0,0,128,176ZM72,120a8,8,0,0,0-8-8A24,24,0,1,1,87.24,82a8,8,0,1,0,15.5-4A40,40,0,1,0,37,117.51,67.94,67.94,0,0,0,9.6,139.19a8,8,0,1,0,12.8,9.61A51.6,51.6,0,0,1,64,128,8,8,0,0,0,72,120Zm118.92,92a8,8,0,1,1-13.84,8,57,57,0,0,0-98.16,0,8,8,0,1,1-13.84-8,72.06,72.06,0,0,1,33.74-29.92,48,48,0,1,1,58.36,0A72.06,72.06,0,0,1,190.92,212Z">
            </path>
        </svg>
    </span>
    Add Users
</h1>
{{-- Breadcrumbs --}}
<div class="breadcrumbs text-sm text-white">
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
                Add User
            </span>
        </li>
    </ul>
</div>
<div class="card text-white md:w-[720px] w-[320px]">
    <form method="POST" action="{{ url('users') }}" class="w-full md:w-[320px]">
        @csrf
        <div class="w-full md:w-[320px]">
            <div
                class="avatar flex flex-col gap-2 items-center justify-center cursor-pointer hover:scale-110 transition ease-in">
                <div id="upload" class="w-48 rounded-full">
                    <img id="preview" src="{{ asset('images/no-photo.png') }}" />
                </div>
                <svg xmlns="http://www.w3.org/2000/svg" class="size-4" fill="currentColor" viewBox="0 0 256 256">
                    <path
                        d="M168,136a8,8,0,0,1-8,8H136v24a8,8,0,0,1-16,0V144H96a8,8,0,0,1,0-16h24V104a8,8,0,0,1,16,0v24h24A8,8,0,0,1,168,136Zm64-56V192a24,24,0,0,1-24,24H48a24,24,0,0,1-24-24V80A24,24,0,0,1,48,56H75.72L87,39.12A16,16,0,0,1,100.28,32h55.44A16,16,0,0,1,169,39.12L180.28,56H208A24,24,0,0,1,232,80Zm-16,0a8,8,0,0,0-8-8H176a8,8,0,0,1-6.66-3.56L155.72,48H100.28L86.66,68.44A8,8,0,0,1,80,72H48a8,8,0,0,0-8,8V192a8,8,0,0,0,8,8H208a8,8,0,0,0,8-8Z">
                    </path>
                </svg>
                <small class="pb-0 border-white border-b flex gap-1 items-center justify-center">
                    upload photo
                </small>
            </div>
            <input type="file" id="photo" name="photo" class="hidden" accept="image/*">
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-4 text-left">
            {{-- Document --}}
            <div>
                <label class="label text-gray-700 font-medium text-sm">Document</label>
                <input type="text" name="document"
                    class="input input-bordered w-full rounded-lg text-sm focus:ring-2 focus:ring-amber-400 focus:border-amber-400"
                    placeholder="75123123" value="{{ old('document') }}" />
                @error('document')
                <small class="badge badge-error mt-1">{{ $message }}</small>
                @enderror
            </div>

            {{-- Full Name --}}
            <div>
                <label class="label text-gray-700 font-medium text-sm">Full Name</label>
                <input type="text" name="fullname"
                    class="input input-bordered w-full rounded-lg text-sm focus:ring-2 focus:ring-amber-400 focus:border-amber-400"
                    placeholder="Jeremias Springfield" value="{{ old('fullname') }}" />
                @error('fullname')
                <small class="badge badge-error mt-1">{{ $message }}</small>
                @enderror
            </div>

            {{-- Gender --}}
            <div>
                <label class="label text-gray-700 font-medium text-sm mb-1">Gender</label>
                <select name="gender"
                    class="select select-bordered w-full rounded-lg text-sm bg-white/80 border-gray-300 focus:ring-2 focus:ring-amber-400 focus:border-amber-400">
                    <option value="">Select</option>
                    <option value="Female" @if(old('gender')=='Female' ) selected @endif>Female</option>
                    <option value="Male" @if(old('gender')=='Male' ) selected @endif>Male</option>
                </select>
                @error('gender')
                <small class="badge badge-error mt-1">{{ $message }}</small>
                @enderror
            </div>

            {{-- Birthdate --}}
            <div>
                <label class="label text-gray-700 font-medium text-sm">Birthdate</label>
                <input type="date" name="birthdate"
                    class="input input-bordered w-full rounded-lg text-sm focus:ring-2 focus:ring-amber-400 focus:border-amber-400"
                    value="{{ old('birthdate') }}" />
                @error('birthdate')
                <small class="badge badge-error mt-1">{{ $message }}</small>
                @enderror
            </div>

            {{-- Phone --}}
            <div>
                <label class="label text-gray-700 font-medium text-sm">Phone</label>
                <input type="text" name="phone"
                    class="input input-bordered w-full rounded-lg text-sm focus:ring-2 focus:ring-amber-400 focus:border-amber-400"
                    placeholder="3108326537" value="{{ old('phone') }}" />
                @error('phone')
                <small class="badge badge-error mt-1">{{ $message }}</small>
                @enderror
            </div>

            {{-- Email --}}
            <div>
                <label class="label text-gray-700 font-medium text-sm">Email</label>
                <input type="email" name="email"
                    class="input input-bordered w-full rounded-lg text-sm focus:ring-2 focus:ring-amber-400 focus:border-amber-400"
                    placeholder="example@email.com" value="{{ old('email') }}" />
                @error('email')
                <small class="badge badge-error mt-1">{{ $message }}</small>
                @enderror
            </div>

            {{-- Password --}}
            <div>
                <label class="label text-gray-700 font-medium text-sm">Password</label>
                <input type="password" name="password"
                    class="input input-bordered w-full rounded-lg text-sm focus:ring-2 focus:ring-amber-400 focus:border-amber-400"
                    placeholder="Password" />
                @error('password')
                <small class="badge badge-error mt-1">{{ $message }}</small>
                @enderror
            </div>

            {{-- Password Confirmation --}}
            <div>
                <label class="label text-gray-700 font-medium text-sm">Password Confirmation</label>
                <input type="password" name="password_confirmation"
                    class="input input-bordered w-full rounded-lg text-sm focus:ring-2 focus:ring-amber-400 focus:border-amber-400"
                    placeholder="Confirm password" />
                @error('password_confirmation')
                <small class="badge badge-error mt-1">{{ $message }}</small>
                @enderror
            </div>
        </div>

        {{-- Botón centrado --}}
        <div class="flex justify-center mt-6">
            <button
                class="btn btn-outline btn-info px-6 py-1 text-sm font-semibold rounded-lg shadow-sm hover:bg-amber-500 hover:text-white transition-all duration-200">
                Register
            </button>
        </div>

        {{-- Enlace inferior --}}
        <div class="text-center mt-3 text-gray-700">
            <p class="text-xs">
                <a class="link link-default hover:text-amber-600" href="{{ route('login') }}">
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