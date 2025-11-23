@extends('layouts.dashboard')

@section('title', 'Show user: Larapets')

@section('content')
<h1 class="text-4xl font-bold text-white flex gap-2 items-center justify-center pb-4 mb-10">

    <span class="p-3 rounded-2xl flex items-center justify-center">
        <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" class="md:w-[34px] md:h-[34px]"
            fill="currentColor" viewBox="0 0 256 256">
            <path
                d="M128,176a32,32,0,1,0-32-32A32,32,0,0,0,128,176ZM72,120a8,8,0,0,0-8-8A24,24,0,1,1,87.24,82a8,8,0,1,0,15.5-4A40,40,0,1,0,37,117.51,67.94,67.94,0,0,0,9.6,139.19a8,8,0,1,0,12.8,9.61A51.6,51.6,0,0,1,64,128,8,8,0,0,0,72,120Zm118.92,92a8,8,0,1,1-13.84,8,57,57,0,0,0-98.16,0,8,8,0,1,1-13.84-8,72.06,72.06,0,0,1,33.74-29.92,48,48,0,1,1,58.36,0A72.06,72.06,0,0,1,190.92,212Z">
            </path>
        </svg>
    </span>
    Show User
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
                Show User
            </span>
        </li>
    </ul>
</div>

{{-- Card --}}
<div class="bg-[#0006] p-10 rounded-sm">
    {{-- Photo --}}
    <div
        class="avatar flex flex-col gap-2 items-center justify-center cursor-pointer hover:scale-110 transition ease-in">
        <div class="w-60 rounded-full">
            <img src="{{ asset('images/'.$user->photo) }}" />
        </div>
    </div>
    {{-- Data --}}
    <div class="flex gap-2 flex-col md:flex-row">
        <ul class="list bg-[#0006] mt-4 text-white rounded-box shadow-md">
            <li class="p-4 pb-2 text-xs opacity-60 tracking-wide">Most played songs this week</li>
            <li class="list-row">
                <span class="bold"><strong>Document:</strong></span> <span>{{ $user->document }}</span>
            </li>
            <li class="list-row">
                <span class="bold"><strong>Fullname:</strong></span> <span>{{ $user->fullname }}</span>
            </li>
            <li class="list-row">
                <span class="bold"><strong>Gender:</strong></span> <span>{{ $user->gender }}</span>
            </li>
            <li class="list-row">
                <span class="bold"><strong>Birthdate:</strong></span> <span>{{ $user->birthdate }}</span>
            </li>
            <li class="list-row">
                <span class="bold"><strong>Phone:</strong></span> <span>{{ $user->phone }}</span>
            </li>
        </ul>
        <ul class="list bg-[#0006] mt-4 text-white rounded-box shadow-md">
            <li class="p-4 pb-2 text-xs opacity-60 tracking-wide">Most played songs this week</li>
            <li class="list-row">
                <span class="bold"><strong>Email:</strong></span> <span>{{ $user->email }}</span>
            </li>
            <li class="list-row">
                <span class="bold"><strong>Active:</strong></span> <span>{{ $user->active }}</span>
            </li>
            <li class="list-row">
                <span class="bold"><strong>Rol:</strong></span> <span>{{ $user->rol }}</span>
            </li>
            <li class="list-row">
                <span class="bold"><strong>Created at:</strong></span> <span>{{ $user->createdAt }}</span>
            </li>
            <li class="list-row">
                <span class="bold"><strong>Updated at:</strong></span> <span>{{ $user->updateAt }}</span>
            </li>
        </ul>
    </div>

</div>
@endsection